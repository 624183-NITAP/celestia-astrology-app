import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useUserStore } from '../../../store/useUserStore';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { CosmicBackground, GlassCard, ProgressRing } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';
import { DAILY_HOROSCOPE, TODAY_ENERGY, PLANETARY_INFLUENCES } from '../../../shared/constants/mockData';
import { getGreeting, getGreetingEmoji } from '../../../shared/utils/formatters';
import { getMoonPhase } from '../../../shared/utils/astrology';

export default function HomeScreen({ navigation }: any) {
  const { profile } = useUserStore();
  const { logout } = useAuthStore();
  const moonInfo = getMoonPhase();

  return (
    <CosmicBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header - Massive Hero Section */}
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={[TextStyles.labelSmall, styles.greeting]}>
                {getGreetingEmoji()} {getGreeting().toUpperCase()}
              </Text>
              <Text style={[TextStyles.displayMedium, styles.name]}>{profile?.name || 'Starseeker'}</Text>
            </View>
            <View style={styles.headerRight}>
              <GlassCard style={styles.signBadge} variant="gold" padding={Spacing.sm}>
                <Text style={styles.badgeText}>☀️ {profile?.sunSign || 'Aries'}</Text>
              </GlassCard>
            </View>
          </View>

          {/* Daily Horoscope Summary Card */}
          <GlassCard style={styles.dailyCard} variant="elevated" padding={Spacing.xl}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderSymbol}>🔮</Text>
              <Text style={[TextStyles.h2, styles.cardTitle]}>Daily Reading</Text>
            </View>
            <Text style={[TextStyles.bodyLarge, styles.dailyText]} numberOfLines={4}>
              {DAILY_HOROSCOPE.overview}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Horoscope')}
              style={styles.readMoreBtn}
            >
              <Text style={styles.readMoreText}>Reveal Complete Reading →</Text>
            </TouchableOpacity>
          </GlassCard>

          {/* Today's Energy - Bento Grid */}
          <Text style={[TextStyles.h3, styles.sectionTitle]}>Energy Blueprint</Text>
          <View style={styles.bentoGrid}>
            <View style={styles.bentoRow}>
              <GlassCard style={styles.bentoCard} padding={Spacing.lg}>
                <ProgressRing progress={TODAY_ENERGY.love} size={80} strokeWidth={8} color={Colors.semantic.love} valueSize={16} />
                <Text style={styles.energyLabel}>Love</Text>
              </GlassCard>
              <GlassCard style={styles.bentoCard} padding={Spacing.lg}>
                <ProgressRing progress={TODAY_ENERGY.career} size={80} strokeWidth={8} color={Colors.semantic.career} valueSize={16} />
                <Text style={styles.energyLabel}>Career</Text>
              </GlassCard>
            </View>
            <View style={styles.bentoRow}>
              <GlassCard style={styles.bentoCard} padding={Spacing.lg}>
                <ProgressRing progress={TODAY_ENERGY.health} size={80} strokeWidth={8} color={Colors.semantic.health} valueSize={16} />
                <Text style={styles.energyLabel}>Health</Text>
              </GlassCard>
              <GlassCard style={styles.bentoCard} padding={Spacing.lg}>
                <ProgressRing progress={TODAY_ENERGY.finance} size={80} strokeWidth={8} color={Colors.semantic.finance} valueSize={16} />
                <Text style={styles.energyLabel}>Finance</Text>
              </GlassCard>
            </View>
          </View>

          {/* Lucky Values */}
          <GlassCard style={styles.luckyCard} variant="accent">
            <Text style={[TextStyles.h4, styles.luckyTitle]}>Your Cosmic Keynotes</Text>
            <View style={styles.luckyRow}>
              <View style={styles.luckyItem}>
                <Text style={styles.luckyLabel}>Lucky Number</Text>
                <Text style={styles.luckyValue}>{DAILY_HOROSCOPE.luckyNumber}</Text>
              </View>
              <View style={styles.luckyItem}>
                <Text style={styles.luckyLabel}>Lucky Color</Text>
                <Text style={styles.luckyValue}>{DAILY_HOROSCOPE.luckyColor}</Text>
              </View>
              <View style={styles.luckyItem}>
                <Text style={styles.luckyLabel}>Lucky Time</Text>
                <Text style={styles.luckyValue}>{DAILY_HOROSCOPE.luckyTime}</Text>
              </View>
            </View>
          </GlassCard>

          {/* Moon Phase & Transits */}
          <View style={styles.moonAndPlanetRow}>
            <GlassCard style={styles.halfCard} padding={Spacing.md}>
              <Text style={styles.cardLabel}>MOON PHASE</Text>
              <Text style={styles.moonEmoji}>{moonInfo.phaseEmoji}</Text>
              <Text style={styles.moonName}>{moonInfo.phaseName}</Text>
              <Text style={styles.moonIllum}>{moonInfo.illumination}% Illuminated</Text>
            </GlassCard>

            <GlassCard style={styles.halfCard} padding={Spacing.md}>
              <Text style={styles.cardLabel}>TRANSIT FOCUS</Text>
              <Text style={styles.transitPlanet}>Mercury</Text>
              <Text style={styles.transitStatus}>{PLANETARY_INFLUENCES[0].status}</Text>
              <Text style={styles.transitDesc}>{PLANETARY_INFLUENCES[0].influence}</Text>
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
  scrollContainer: {
    padding: Spacing.lg,
    gap: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  headerTextContainer: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  headerRight: {
    paddingTop: Spacing.xs,
  },
  greeting: {
    color: Colors.accent.gold,
    letterSpacing: 2,
    marginBottom: Spacing.xs,
  },
  name: {
    color: Colors.text.primary,
  },
  signBadge: {
    borderRadius: 24,
  },
  badgeText: {
    color: Colors.text.primary,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  dailyCard: {
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  cardHeaderSymbol: {
    fontSize: 28,
  },
  cardTitle: {
    color: Colors.text.primary,
  },
  dailyText: {
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  readMoreBtn: {
    marginTop: Spacing.md,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: Colors.accent.purpleLight,
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    color: Colors.text.primary,
    marginTop: Spacing.md,
    marginBottom: -Spacing.xs,
  },
  bentoGrid: {
    gap: Spacing.md,
  },
  bentoRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  bentoCard: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.md,
  },
  energyLabel: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  luckyCard: {
    width: '100%',
  },
  luckyTitle: {
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  luckyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  luckyItem: {
    alignItems: 'center',
  },
  luckyLabel: {
    color: Colors.text.muted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  luckyValue: {
    color: Colors.accent.goldLight,
    fontSize: 15,
    fontWeight: '600',
  },
  moonAndPlanetRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  halfCard: {
    flex: 1,
    alignItems: 'center',
    minHeight: 160,
  },
  cardLabel: {
    color: Colors.text.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: Spacing.sm,
  },
  moonEmoji: {
    fontSize: 36,
    marginVertical: 4,
  },
  moonName: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  moonIllum: {
    color: Colors.text.tertiary,
    fontSize: 11,
    marginTop: 2,
  },
  transitPlanet: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  transitStatus: {
    color: Colors.accent.gold,
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  transitDesc: {
    color: Colors.text.tertiary,
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
});
