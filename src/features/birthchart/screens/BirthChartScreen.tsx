/**
 * BirthChartScreen — Premium animated SVG natal wheel
 *
 * Architecture:
 *   - ZodiacWheel: pure SVG component, fully drawn in polar coordinates
 *   - Rings (outermost → center): Zodiac sign band → House divisions → Aspect lines → Planet glyphs → Core
 *   - Animated entrance via react-native-reanimated (spin + fade in)
 *   - Tapping a planet badge highlights its spoke and opens the detail card below
 */

import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Line,
  Text as SvgText,
  G,
  Path,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient as SvgLinearGradient,
} from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserStore } from '../../../store/useUserStore';
import { CosmicBackground, GlassCard } from '../../../shared/components';
import { Colors, TextStyles, Spacing, BorderRadius, FontSize, FontWeight } from '../../../shared/theme';
import { PLANETS, HOUSES, ASPECTS, Planet } from '../../../shared/constants/planets';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCREEN_WIDTH = Dimensions.get('window').width;
const WHEEL_SIZE = Math.min(SCREEN_WIDTH - Spacing.xl * 2 - 32, 340);
const CX = WHEEL_SIZE / 2;
const CY = WHEEL_SIZE / 2;

// Radii of each ring
const R_OUTER = CX - 8;          // outer zodiac band edge
const R_ZODIAC_INNER = R_OUTER - 28; // inner zodiac band edge / house outer
const R_HOUSE_INNER = R_ZODIAC_INNER - 22; // house ring inner / aspect outer
const R_PLANET = R_HOUSE_INNER - 14; // planet glyph radius
const R_CORE = 24;               // glowing center

// Zodiac signs in order (0° Aries → ascending)
const ZODIAC_SIGNS = [
  { symbol: '♈', name: 'Aries',       color: '#EF4444' },
  { symbol: '♉', name: 'Taurus',      color: '#10B981' },
  { symbol: '♊', name: 'Gemini',      color: '#F59E0B' },
  { symbol: '♋', name: 'Cancer',      color: '#E2E8F0' },
  { symbol: '♌', name: 'Leo',         color: '#F59E0B' },
  { symbol: '♍', name: 'Virgo',       color: '#10B981' },
  { symbol: '♎', name: 'Libra',       color: '#EC4899' },
  { symbol: '♏', name: 'Scorpio',     color: '#DC2626' },
  { symbol: '♐', name: 'Sagittarius', color: '#8B5CF6' },
  { symbol: '♑', name: 'Capricorn',   color: '#6B7280' },
  { symbol: '♒', name: 'Aquarius',    color: '#3B82F6' },
  { symbol: '♓', name: 'Pisces',      color: '#2563EB' },
];

// Mock planet positions (degrees from 0° Aries, counter-clockwise in SVG = clockwise in astrology)
const PLANET_POSITIONS: Record<string, { degree: number; house: number }> = {
  sun:     { degree: 45,  house: 2 },
  moon:    { degree: 155, house: 6 },
  mercury: { degree: 28,  house: 1 },
  venus:   { degree: 68,  house: 3 },
  mars:    { degree: 210, house: 8 },
  jupiter: { degree: 285, house: 10 },
  saturn:  { degree: 320, house: 11 },
  uranus:  { degree: 130, house: 5 },
  neptune: { degree: 240, house: 9 },
  pluto:   { degree: 175, house: 7 },
};

// Mock aspect pairs [planetA, planetB, aspectType]
const MOCK_ASPECTS: Array<[string, string, string]> = [
  ['sun', 'moon', 'trine'],
  ['sun', 'jupiter', 'sextile'],
  ['moon', 'saturn', 'square'],
  ['venus', 'mars', 'conjunction'],
  ['mercury', 'uranus', 'trine'],
  ['jupiter', 'neptune', 'opposition'],
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert astrological degree to SVG angle (0° = top, clockwise) */
function degToRad(deg: number) {
  // Astrological: 0° Aries = left (9 o'clock), counterclockwise
  // SVG: 0° = right (3 o'clock), clockwise
  // Shift: subtract 90° to start from top, then negate for CCW→CW
  return ((deg - 90) * Math.PI) / 180;
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = degToRad(angleDeg);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function getAspectColor(type: string): string {
  switch (type) {
    case 'trine':       return '#3B82F6';
    case 'sextile':     return '#10B981';
    case 'square':      return '#EF4444';
    case 'conjunction': return '#D4AF37';
    case 'opposition':  return '#F97316';
    default:            return 'rgba(255,255,255,0.2)';
  }
}

// ─── ZodiacWheel SVG ─────────────────────────────────────────────────────────

interface WheelProps {
  selectedPlanet: string | null;
  onPlanetPress: (id: string) => void;
}

const ZodiacWheel: React.FC<WheelProps> = ({ selectedPlanet, onPlanetPress }) => {
  return (
    <Svg width={WHEEL_SIZE} height={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
      <Defs>
        {/* Radial gradient for core glow */}
        <RadialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={Colors.accent.purple} stopOpacity="0.9" />
          <Stop offset="60%" stopColor={Colors.accent.indigo} stopOpacity="0.6" />
          <Stop offset="100%" stopColor={Colors.accent.purple} stopOpacity="0" />
        </RadialGradient>
        {/* Outer ring gradient */}
        <RadialGradient id="outerRing" cx="50%" cy="50%" r="50%">
          <Stop offset="80%" stopColor="rgba(212,175,55,0)" stopOpacity="0" />
          <Stop offset="100%" stopColor={Colors.accent.gold} stopOpacity="0.15" />
        </RadialGradient>
      </Defs>

      {/* ── Background fill of outer ring ── */}
      <Circle cx={CX} cy={CY} r={R_OUTER} fill="rgba(0,0,0,0.4)" />
      <Circle cx={CX} cy={CY} r={R_OUTER} fill="url(#outerRing)" />

      {/* ── Zodiac sign band ── */}
      {ZODIAC_SIGNS.map((sign, i) => {
        const startDeg = i * 30;
        const midDeg = startDeg + 15;
        const midPos = polarToXY(CX, CY, (R_OUTER + R_ZODIAC_INNER) / 2, midDeg);
        // Draw divider spoke for each sign
        const outerPt = polarToXY(CX, CY, R_OUTER, startDeg);
        const innerPt = polarToXY(CX, CY, R_ZODIAC_INNER, startDeg);
        return (
          <G key={sign.name}>
            {/* Divider line */}
            <Line
              x1={outerPt.x} y1={outerPt.y}
              x2={innerPt.x} y2={innerPt.y}
              stroke={Colors.glass.border}
              strokeWidth={1}
            />
            {/* Sign glyph */}
            <SvgText
              x={midPos.x}
              y={midPos.y + 5}
              textAnchor="middle"
              fill={sign.color}
              fontSize={12}
              fontWeight="700"
              opacity={0.9}
            >
              {sign.symbol}
            </SvgText>
          </G>
        );
      })}

      {/* ── Outer ring border ── */}
      <Circle cx={CX} cy={CY} r={R_OUTER} stroke={Colors.accent.gold} strokeWidth={1.5} fill="none" strokeOpacity={0.6} />
      <Circle cx={CX} cy={CY} r={R_ZODIAC_INNER} stroke={Colors.glass.border} strokeWidth={1} fill="none" />

      {/* ── House division ring ── */}
      <Circle cx={CX} cy={CY} r={R_ZODIAC_INNER} fill="rgba(255,255,255,0.02)" />
      {HOUSES.map((house, i) => {
        const startDeg = i * 30;
        const midDeg = startDeg + 15;
        const midPos = polarToXY(CX, CY, (R_ZODIAC_INNER + R_HOUSE_INNER) / 2, midDeg);
        const outerPt = polarToXY(CX, CY, R_ZODIAC_INNER, startDeg);
        const innerPt = polarToXY(CX, CY, R_HOUSE_INNER, startDeg);
        return (
          <G key={house.number}>
            <Line
              x1={outerPt.x} y1={outerPt.y}
              x2={innerPt.x} y2={innerPt.y}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
            />
            <SvgText
              x={midPos.x}
              y={midPos.y + 4}
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize={8}
              fontWeight="600"
            >
              {house.number}
            </SvgText>
          </G>
        );
      })}
      <Circle cx={CX} cy={CY} r={R_HOUSE_INNER} stroke={Colors.glass.borderLight} strokeWidth={1} fill="rgba(0,0,0,0.3)" />

      {/* ── Aspect lines ── */}
      {MOCK_ASPECTS.map(([aId, bId, type], idx) => {
        const posA = PLANET_POSITIONS[aId];
        const posB = PLANET_POSITIONS[bId];
        if (!posA || !posB) return null;
        const ptA = polarToXY(CX, CY, R_PLANET - 6, posA.degree);
        const ptB = polarToXY(CX, CY, R_PLANET - 6, posB.degree);
        const color = getAspectColor(type);
        const isHighlighted = selectedPlanet === aId || selectedPlanet === bId;
        return (
          <Line
            key={idx}
            x1={ptA.x} y1={ptA.y}
            x2={ptB.x} y2={ptB.y}
            stroke={color}
            strokeWidth={isHighlighted ? 1.5 : 0.8}
            strokeOpacity={isHighlighted ? 0.85 : 0.3}
            strokeDasharray={type === 'square' || type === 'opposition' ? '4,3' : undefined}
          />
        );
      })}

      {/* ── Planet glyphs ── */}
      {PLANETS.slice(0, 10).map((planet) => {
        const pos = PLANET_POSITIONS[planet.id];
        if (!pos) return null;
        const pt = polarToXY(CX, CY, R_PLANET, pos.degree);
        const isSelected = selectedPlanet === planet.id;
        return (
          <G key={planet.id} onPress={() => onPlanetPress(planet.id)}>
            {/* Selection halo */}
            {isSelected && (
              <Circle cx={pt.x} cy={pt.y} r={13} fill={planet.color} fillOpacity={0.25} />
            )}
            {/* Planet dot */}
            <Circle
              cx={pt.x}
              cy={pt.y}
              r={isSelected ? 9 : 7}
              fill={planet.color}
              fillOpacity={isSelected ? 1 : 0.85}
            />
            {/* Planet symbol */}
            <SvgText
              x={pt.x}
              y={pt.y + 4}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={isSelected ? 9 : 8}
              fontWeight="700"
            >
              {planet.symbol}
            </SvgText>
          </G>
        );
      })}

      {/* ── Axis lines (ASC/DSC + MC/IC) ── */}
      <Line x1={8} y1={CY} x2={WHEEL_SIZE - 8} y2={CY} stroke={Colors.accent.gold} strokeWidth={0.6} strokeOpacity={0.4} />
      <Line x1={CX} y1={8} x2={CX} y2={WHEEL_SIZE - 8} stroke={Colors.accent.gold} strokeWidth={0.6} strokeOpacity={0.4} />

      {/* ASC / DSC labels */}
      <SvgText x={14} y={CY - 5} fill={Colors.accent.gold} fontSize={8} fontWeight="700" fillOpacity={0.7}>ASC</SvgText>
      <SvgText x={WHEEL_SIZE - 30} y={CY - 5} fill={Colors.accent.gold} fontSize={8} fontWeight="700" fillOpacity={0.7}>DSC</SvgText>
      <SvgText x={CX - 10} y={16} fill={Colors.accent.gold} fontSize={8} fontWeight="700" fillOpacity={0.7}>MC</SvgText>
      <SvgText x={CX - 8} y={WHEEL_SIZE - 6} fill={Colors.accent.gold} fontSize={8} fontWeight="700" fillOpacity={0.7}>IC</SvgText>

      {/* ── Core glow ── */}
      <Circle cx={CX} cy={CY} r={R_CORE * 2} fill="url(#coreGlow)" />
      <Circle cx={CX} cy={CY} r={R_CORE} fill={Colors.background.deepSpace} />
      <Circle cx={CX} cy={CY} r={R_CORE} stroke={Colors.accent.purple} strokeWidth={1.5} fill="none" strokeOpacity={0.8} />
      <SvgText x={CX} y={CY + 5} textAnchor="middle" fill={Colors.accent.purpleLight} fontSize={13} fontWeight="700">
        ✦
      </SvgText>
    </Svg>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function BirthChartScreen() {
  const { profile } = useUserStore();
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>('sun');

  // Animated wheel entrance
  const wheelScale = useSharedValue(0.6);
  const wheelOpacity = useSharedValue(0);

  React.useEffect(() => {
    wheelOpacity.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.exp) });
    wheelScale.value = withSpring(1, { damping: 14, stiffness: 90 });
  }, []);

  const wheelAnimStyle = useAnimatedStyle(() => ({
    opacity: wheelOpacity.value,
    transform: [{ scale: wheelScale.value }],
  }));

  const handlePlanetPress = useCallback((id: string) => {
    setSelectedPlanet(prev => (prev === id ? null : id));
  }, []);

  const selectedPlanetData = selectedPlanet ? PLANETS.find(p => p.id === selectedPlanet) : null;
  const selectedPosition = selectedPlanet ? PLANET_POSITIONS[selectedPlanet] : null;

  // The Big Three from the user profile
  const bigThree = [
    { label: 'Sun', sign: profile?.sunSign ?? 'Aries',       emoji: '☀️', color: Colors.semantic.finance },
    { label: 'Moon', sign: profile?.moonSign ?? 'Leo',       emoji: '🌙', color: Colors.accent.blue },
    { label: 'Rising', sign: profile?.risingSign ?? 'Sagittarius', emoji: '⬆️', color: Colors.accent.purple },
  ];

  return (
    <CosmicBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[TextStyles.h1, styles.headerTitle]}>Birth Chart</Text>
          <Text style={styles.headerSub}>Your Natal Sky Map</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* ── Wheel Card ── */}
          <GlassCard style={styles.wheelCard} variant="elevated" padding={Spacing.xl}>
            {/* Card header */}
            <View style={styles.wheelCardHeader}>
              <Text style={styles.wheelCardEmoji}>☸️</Text>
              <View>
                <Text style={[TextStyles.h3, { color: Colors.text.primary }]}>Natal Wheel</Text>
                <Text style={styles.wheelCardSub}>
                  {profile?.birthDate ?? 'Set birth date in profile'}
                </Text>
              </View>
            </View>

            {/* Animated SVG Wheel */}
            <Animated.View style={[styles.wheelWrapper, wheelAnimStyle]}>
              <ZodiacWheel
                selectedPlanet={selectedPlanet}
                onPlanetPress={handlePlanetPress}
              />
            </Animated.View>

            {/* Tap hint */}
            <Text style={styles.tapHint}>✦ Tap any planet to reveal its influence</Text>
          </GlassCard>

          {/* ── The Big Three ── */}
          <Text style={styles.sectionTitle}>YOUR CELESTIAL CORE</Text>
          <View style={styles.bigThreeRow}>
            {bigThree.map((item) => (
              <GlassCard key={item.label} style={styles.bigThreeCard} padding={Spacing.md}>
                <Text style={styles.bigThreeEmoji}>{item.emoji}</Text>
                <Text style={[styles.bigThreeLabel, { color: item.color }]}>{item.label.toUpperCase()}</Text>
                <Text style={styles.bigThreeSign}>{item.sign}</Text>
              </GlassCard>
            ))}
          </View>

          {/* ── Selected Planet Detail Card ── */}
          {selectedPlanetData && selectedPosition && (
            <View>
              <Text style={styles.sectionTitle}>ACTIVE PLANET</Text>
              <LinearGradient
                colors={[selectedPlanetData.color + '22', 'rgba(0,0,0,0)']}
                style={styles.planetDetailCard}
              >
                <GlassCard style={{ width: '100%' }} padding={Spacing.xl}>
                  {/* Planet header */}
                  <View style={styles.planetDetailHeader}>
                    <View style={[styles.planetBadgeLarge, { backgroundColor: selectedPlanetData.color + '25', borderColor: selectedPlanetData.color + '60' }]}>
                      <Text style={styles.planetBadgeSymbol}>{selectedPlanetData.symbol}</Text>
                    </View>
                    <View style={styles.planetDetailMeta}>
                      <Text style={[styles.planetDetailName, { color: selectedPlanetData.color }]}>
                        {selectedPlanetData.emoji} {selectedPlanetData.name}
                      </Text>
                      <View style={styles.planetDetailPositionRow}>
                        <Text style={styles.planetDetailPosition}>
                          {selectedPosition.degree}° · House {selectedPosition.house}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Meaning */}
                  <Text style={styles.planetMeaning}>{selectedPlanetData.meaning}</Text>

                  {/* Keywords */}
                  <View style={styles.keywordsRow}>
                    {selectedPlanetData.keywords.map((kw) => (
                      <View key={kw} style={[styles.keyword, { borderColor: selectedPlanetData.color + '50' }]}>
                        <Text style={[styles.keywordText, { color: selectedPlanetData.color }]}>{kw}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Rulership */}
                  <View style={styles.ruleRow}>
                    <Text style={styles.ruleLabel}>Rules: </Text>
                    <Text style={[styles.ruleValue, { color: selectedPlanetData.color }]}>
                      {selectedPlanetData.rulership.join(', ')}
                    </Text>
                  </View>
                </GlassCard>
              </LinearGradient>
            </View>
          )}

          {/* ── Planet Grid — quick select ── */}
          <Text style={styles.sectionTitle}>ALL PLANETS</Text>
          <View style={styles.planetGrid}>
            {PLANETS.slice(0, 10).map((planet) => {
              const pos = PLANET_POSITIONS[planet.id];
              const isSelected = selectedPlanet === planet.id;
              return (
                <TouchableOpacity
                  key={planet.id}
                  style={[
                    styles.planetGridCard,
                    isSelected && { borderColor: planet.color, backgroundColor: planet.color + '18' },
                  ]}
                  onPress={() => handlePlanetPress(planet.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.planetGridEmoji}>{planet.emoji}</Text>
                  <Text style={[styles.planetGridName, isSelected && { color: planet.color }]}>
                    {planet.name}
                  </Text>
                  <Text style={styles.planetGridDeg}>{pos?.degree ?? 0}°</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Aspects Legend ── */}
          <Text style={styles.sectionTitle}>ASPECT LINES</Text>
          <GlassCard style={{ width: '100%' }} padding={Spacing.lg}>
            {ASPECTS.map((aspect) => (
              <View key={aspect.name} style={styles.aspectRow}>
                <View style={[styles.aspectLine, { backgroundColor: aspect.color }]} />
                <Text style={styles.aspectSymbol}>{aspect.symbol}</Text>
                <Text style={styles.aspectName}>{aspect.name}</Text>
                <View style={[styles.aspectNatureBadge, { borderColor: aspect.color + '60' }]}>
                  <Text style={[styles.aspectNatureText, { color: aspect.color }]}>{aspect.nature}</Text>
                </View>
                <Text style={styles.aspectDegree}>{aspect.degrees}°</Text>
              </View>
            ))}
          </GlassCard>

          {/* ── 12 Houses ── */}
          <Text style={styles.sectionTitle}>THE 12 HOUSES</Text>
          <View style={styles.houseGrid}>
            {HOUSES.map((house) => (
              <GlassCard key={house.number} style={styles.houseCard} padding={Spacing.md}>
                <Text style={styles.houseNumber}>H{house.number}</Text>
                <Text style={styles.houseName}>{house.name.replace(' House', '')}</Text>
                <Text style={styles.houseRuler}>{house.ruler}</Text>
                <Text style={styles.houseMeaning} numberOfLines={2}>{house.meaning}</Text>
              </GlassCard>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </CosmicBackground>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  headerTitle: { color: Colors.text.primary },
  headerSub: {
    color: Colors.text.muted,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    marginTop: 2,
    letterSpacing: 1,
  },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
    gap: Spacing.lg,
  },

  // ── Wheel card ──
  wheelCard: { width: '100%', alignItems: 'center' },
  wheelCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    width: '100%',
    marginBottom: Spacing.lg,
  },
  wheelCardEmoji: { fontSize: 32 },
  wheelCardSub: {
    color: Colors.text.muted,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  wheelWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapHint: {
    color: Colors.text.muted,
    fontSize: FontSize.xs,
    letterSpacing: 0.5,
    marginTop: Spacing.md,
    textAlign: 'center',
  },

  // ── Section title ──
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 2,
    color: Colors.text.muted,
    marginLeft: Spacing.xs,
  },

  // ── Big Three ──
  bigThreeRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  bigThreeCard: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  bigThreeEmoji: { fontSize: 28 },
  bigThreeLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 1.5,
  },
  bigThreeSign: {
    color: Colors.text.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
    textAlign: 'center',
  },

  // ── Selected planet card ──
  planetDetailCard: { borderRadius: BorderRadius['2xl'] },
  planetDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  planetBadgeLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planetBadgeSymbol: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: FontWeight.bold,
  },
  planetDetailMeta: { flex: 1 },
  planetDetailName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  planetDetailPositionRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  planetDetailPosition: {
    color: Colors.text.muted,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  planetMeaning: {
    color: Colors.text.secondary,
    fontSize: FontSize.md,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  keywordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  keyword: {
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
  },
  keywordText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.5,
  },
  ruleRow: { flexDirection: 'row', alignItems: 'center' },
  ruleLabel: { color: Colors.text.muted, fontSize: FontSize.sm },
  ruleValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold },

  // ── Planet grid ──
  planetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  planetGridCard: {
    width: (SCREEN_WIDTH - Spacing.xl * 2 - Spacing.sm * 4) / 5,
    backgroundColor: Colors.glass.background,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.glass.border,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: 4,
  },
  planetGridEmoji: { fontSize: 20 },
  planetGridName: {
    color: Colors.text.secondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    textAlign: 'center',
  },
  planetGridDeg: {
    color: Colors.text.muted,
    fontSize: FontSize.xs - 1,
  },

  // ── Aspects ──
  aspectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glass.borderLight,
  },
  aspectLine: {
    width: 20,
    height: 2,
    borderRadius: 1,
  },
  aspectSymbol: {
    color: Colors.text.secondary,
    fontSize: FontSize.md,
    width: 18,
    textAlign: 'center',
  },
  aspectName: {
    color: Colors.text.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    flex: 1,
  },
  aspectNatureBadge: {
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  aspectNatureText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    textTransform: 'capitalize',
  },
  aspectDegree: {
    color: Colors.text.muted,
    fontSize: FontSize.sm,
    width: 28,
    textAlign: 'right',
  },

  // ── Houses ──
  houseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  houseCard: {
    width: (SCREEN_WIDTH - Spacing.xl * 2 - Spacing.md * 2) / 3,
    gap: 4,
  },
  houseNumber: {
    color: Colors.accent.gold,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 1,
  },
  houseName: {
    color: Colors.text.primary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  houseRuler: {
    color: Colors.accent.purpleLight,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  houseMeaning: {
    color: Colors.text.muted,
    fontSize: 10,
    lineHeight: 14,
  },
});
