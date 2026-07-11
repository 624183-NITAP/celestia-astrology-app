import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { useUserStore } from '../../../store/useUserStore';
import { CosmicBackground, GlassCard } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';

export default function BirthChartScreen() {
  const { profile } = useUserStore();

  return (
    <CosmicBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={[TextStyles.h1, styles.headerTitle]}>Birth Chart</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Interactive Zodiac Wheel Simulator */}
          <GlassCard style={styles.wheelCard} variant="elevated" padding={Spacing.lg}>
            <Text style={[TextStyles.h3, styles.wheelTitle]}>Your Natal Sky</Text>
            <View style={styles.wheelWrapper}>
              <Svg width={240} height={240} viewBox="0 0 240 240">
                {/* Outer ring */}
                <Circle cx={120} cy={120} r={110} stroke={Colors.accent.gold} strokeWidth={2} fill="none" />
                <Circle cx={120} cy={120} r={95} stroke="rgba(255,255,255,0.15)" strokeWidth={1} fill="none" />
                <Circle cx={120} cy={120} r={60} stroke="rgba(255,255,255,0.1)" strokeWidth={1} fill="none" />

                {/* Simulated house divisions */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 120 + 60 * Math.cos(angle);
                  const y1 = 120 + 60 * Math.sin(angle);
                  const x2 = 120 + 110 * Math.cos(angle);
                  const y2 = 120 + 110 * Math.sin(angle);
                  return (
                    <Line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth={1}
                    />
                  );
                })}

                {/* Center Core */}
                <Circle cx={120} cy={120} r={10} fill={Colors.accent.purple} />
              </Svg>
            </View>
            <Text style={styles.wheelDesc}>A visualization of the celestial coordinates at your exact time and place of entry.</Text>
          </GlassCard>

          {/* Placement Placements */}
          <Text style={[TextStyles.h4, styles.sectionHeader]}>Major Alignments</Text>
          <View style={styles.alignmentList}>
            <GlassCard style={styles.placementCard} padding={Spacing.md}>
              <View style={styles.placementRow}>
                <Text style={styles.planetName}>☀️ Sun</Text>
                <Text style={styles.placementDetail}>{profile?.sunSign || 'Aries'}</Text>
              </View>
            </GlassCard>

            <GlassCard style={styles.placementCard} padding={Spacing.md}>
              <View style={styles.placementRow}>
                <Text style={styles.planetName}>🌙 Moon</Text>
                <Text style={styles.placementDetail}>{profile?.moonSign || 'Leo'}</Text>
              </View>
            </GlassCard>

            <GlassCard style={styles.placementCard} padding={Spacing.md}>
              <View style={styles.placementRow}>
                <Text style={styles.planetName}>⬆️ Rising</Text>
                <Text style={styles.placementDetail}>{profile?.risingSign || 'Sagittarius'}</Text>
              </View>
            </GlassCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    color: Colors.text.primary,
    fontWeight: '700',
  },
  scrollContainer: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  wheelCard: {
    alignItems: 'center',
    width: '100%',
  },
  wheelTitle: {
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  wheelWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  wheelDesc: {
    color: Colors.text.tertiary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 18,
  },
  sectionHeader: {
    color: Colors.text.primary,
    fontWeight: '600',
    marginTop: Spacing.sm,
    marginBottom: -Spacing.xs,
  },
  alignmentList: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  placementCard: {
    width: '100%',
  },
  placementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planetName: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  placementDetail: {
    color: Colors.accent.goldLight,
    fontSize: 16,
    fontWeight: '500',
  },
});
