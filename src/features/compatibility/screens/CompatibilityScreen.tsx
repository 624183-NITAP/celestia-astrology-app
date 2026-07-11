import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import { CosmicBackground, GlassCard, Button, Input, ProgressRing } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';
import { getCompatibilityScore, CompatibilityResult } from '../../../shared/utils/astrology';
import { useUserStore } from '../../../store/useUserStore';
import { ZODIAC_SIGNS } from '../../../shared/constants/zodiacSigns';

export default function CompatibilityScreen() {
  const [partnerName, setPartnerName] = useState('');
  const [partnerSign, setPartnerSign] = useState('');
  const [results, setResults] = useState<CompatibilityResult | null>(null);
  const { profile } = useUserStore();

  const handleCheck = () => {
    if (!partnerSign.trim()) {
      Alert.alert('Zodiac Sign Required', 'Please enter your partner\'s zodiac sign.');
      return;
    }
    const cleanSign = partnerSign.toLowerCase().trim();
    const isValidSign = ZODIAC_SIGNS.some(s => s.id === cleanSign || s.name.toLowerCase() === cleanSign);

    if (!isValidSign) {
      Alert.alert('Invalid Sign', 'Please enter a valid zodiac sign (e.g. Leo, Taurus, Aries).');
      return;
    }

    const userSign = (profile?.sunSign || 'Aries').toLowerCase();
    const res = getCompatibilityScore(userSign, cleanSign);
    setResults(res);
  };

  return (
    <CosmicBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={[TextStyles.h1, styles.headerTitle]}>Compatibility</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {!results ? (
            <GlassCard style={styles.card}>
              <Text style={[TextStyles.h3, styles.cardTitle]}>Check Alignment</Text>
              <Text style={[TextStyles.bodySmall, styles.cardDesc]}>
                Enter your partner's details or select their zodiac sign to examine your relational chemistry.
              </Text>

              <View style={styles.form}>
                <Input
                  label="Partner's Name"
                  value={partnerName}
                  onChangeText={setPartnerName}
                  autoCapitalize="words"
                />
                <Input
                  label="Partner's Zodiac Sign (e.g. Leo)"
                  value={partnerSign}
                  onChangeText={setPartnerSign}
                  autoCapitalize="words"
                />
              </View>

              <Button
                title="Determine Harmony"
                onPress={handleCheck}
                style={styles.checkBtn}
              />
            </GlassCard>
          ) : (
            <View style={styles.resultsWrapper}>
              <GlassCard style={styles.scoreCard} variant="gold" padding={Spacing.xl}>
                <View style={styles.heroEmojis}>
                  <Text style={styles.heroEmojiItem}>✨</Text>
                  <Text style={styles.heroEmojiItem}>💞</Text>
                  <Text style={styles.heroEmojiItem}>✨</Text>
                </View>
                <Text style={styles.scoreHeader}>SYNASTRY SCORE</Text>
                <ProgressRing progress={results.overall} size={150} strokeWidth={10} color={Colors.accent.gold} valueSize={36} />
                <Text style={styles.compatibilityRating}>
                  {results.overall > 80 ? 'Highly Auspicious' : results.overall > 60 ? 'Harmonious Flow' : 'Growth & Work'}
                </Text>
              </GlassCard>

              {/* Categorical metrics - 2x2 Grid */}
              <View style={styles.metricsGrid}>
                <View style={styles.metricRow}>
                  <GlassCard style={styles.metricItem} padding={Spacing.md}>
                    <ProgressRing progress={results.love} size={70} strokeWidth={6} color={Colors.semantic.love} valueSize={14} />
                    <Text style={styles.metricLabel}>Love</Text>
                  </GlassCard>
                  <GlassCard style={styles.metricItem} padding={Spacing.md}>
                    <ProgressRing progress={results.friendship} size={70} strokeWidth={6} color={Colors.semantic.friendship} valueSize={14} />
                    <Text style={styles.metricLabel}>Friendship</Text>
                  </GlassCard>
                </View>
                <View style={styles.metricRow}>
                  <GlassCard style={styles.metricItem} padding={Spacing.md}>
                    <ProgressRing progress={results.communication} size={70} strokeWidth={6} color={Colors.semantic.communication} valueSize={14} />
                    <Text style={styles.metricLabel}>Dialogue</Text>
                  </GlassCard>
                  <GlassCard style={styles.metricItem} padding={Spacing.md}>
                    <ProgressRing progress={results.marriage} size={70} strokeWidth={6} color={Colors.semantic.marriage} valueSize={14} />
                    <Text style={styles.metricLabel}>Bond</Text>
                  </GlassCard>
                </View>
              </View>

              <Button
                title="Check Another Connection"
                variant="secondary"
                onPress={() => setResults(null)}
                style={styles.resetBtn}
              />
            </View>
          )}
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
  },
  card: {
    width: '100%',
  },
  cardTitle: {
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  cardDesc: {
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  form: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  checkBtn: {
    width: '100%',
  },
  resultsWrapper: {
    gap: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    paddingBottom: Spacing['3xl'] || 40,
  },
  scoreCard: {
    width: '100%',
    alignItems: 'center',
  },
  heroEmojis: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  heroEmojiItem: {
    fontSize: 40,
    textShadowColor: 'rgba(255,255,255,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  scoreHeader: {
    color: Colors.accent.gold,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: Spacing.xl,
  },
  compatibilityRating: {
    color: Colors.text.primary,
    fontSize: 22,
    fontWeight: '700',
    marginTop: Spacing.xl,
  },
  metricsGrid: {
    width: '100%',
    gap: Spacing.md,
  },
  metricRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  metricLabel: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  resetBtn: {
    width: '100%',
    marginTop: Spacing.md,
  },
});
