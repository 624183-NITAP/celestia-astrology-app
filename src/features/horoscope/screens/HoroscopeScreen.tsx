import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { CosmicBackground, GlassCard } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';
import { DAILY_HOROSCOPE, WEEKLY_HOROSCOPE, MONTHLY_HOROSCOPE, YEARLY_HOROSCOPE } from '../../../shared/constants/mockData';

export default function HoroscopeScreen() {
  const [tab, setTab] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

  const getHoroscopeData = () => {
    switch (tab) {
      case 'weekly': return WEEKLY_HOROSCOPE;
      case 'monthly': return MONTHLY_HOROSCOPE;
      case 'yearly': return YEARLY_HOROSCOPE;
      default: return DAILY_HOROSCOPE;
    }
  };

  const data = getHoroscopeData();

  return (
    <CosmicBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={[TextStyles.h1, styles.headerTitle]}>Horoscope</Text>
        </View>

        {/* Tab switcher */}
        <View style={styles.tabBar}>
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tabItem, tab === t && styles.tabItemActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <GlassCard style={styles.card} variant="elevated" padding={Spacing['2xl']}>
            <Text style={[TextStyles.h2, styles.sectionTitle]}>Overview</Text>
            <Text style={[TextStyles.bodyLarge, styles.overviewText]}>{data.overview}</Text>
          </GlassCard>

          <GlassCard style={styles.card} padding={Spacing.xl}>
            <Text style={styles.bgIcon}>❤️</Text>
            <Text style={[TextStyles.h3, styles.sectionTitle, { color: Colors.semantic.love }]}>Love & Romance</Text>
            <Text style={[TextStyles.body, styles.bodyText]}>{data.love}</Text>
          </GlassCard>

          <GlassCard style={styles.card} padding={Spacing.xl}>
            <Text style={styles.bgIcon}>💼</Text>
            <Text style={[TextStyles.h3, styles.sectionTitle, { color: Colors.semantic.career }]}>Career & Ambition</Text>
            <Text style={[TextStyles.body, styles.bodyText]}>{data.career}</Text>
          </GlassCard>

          <GlassCard style={styles.card} padding={Spacing.xl}>
            <Text style={styles.bgIcon}>🟢</Text>
            <Text style={[TextStyles.h3, styles.sectionTitle, { color: Colors.semantic.health }]}>Health & Vitality</Text>
            <Text style={[TextStyles.body, styles.bodyText]}>{data.health}</Text>
          </GlassCard>

          <GlassCard style={styles.card} padding={Spacing.xl}>
            <Text style={styles.bgIcon}>💰</Text>
            <Text style={[TextStyles.h3, styles.sectionTitle, { color: Colors.semantic.finance }]}>Finance & Wealth</Text>
            <Text style={[TextStyles.body, styles.bodyText]}>{data.finance}</Text>
          </GlassCard>

          <GlassCard style={styles.card} variant="gold" padding={Spacing.xl}>
            <Text style={styles.bgIcon}>✨</Text>
            <Text style={[TextStyles.h3, styles.sectionTitle, { color: Colors.accent.gold }]}>Celestial Advice</Text>
            <Text style={[TextStyles.body, styles.bodyText, { fontStyle: 'italic', fontWeight: '500' }]}>{data.advice}</Text>
          </GlassCard>
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginHorizontal: Spacing.xl,
    borderRadius: 25,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.glass.border,
    marginBottom: Spacing.md,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  tabItemActive: {
    backgroundColor: Colors.accent.purple,
  },
  tabText: {
    color: Colors.text.secondary,
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.white,
  },
  scrollContainer: {
    padding: Spacing.xl,
    gap: Spacing.xl,
    paddingBottom: Spacing['3xl'] || 40,
  },
  card: {
    width: '100%',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },
  overviewText: {
    color: Colors.text.primary,
    lineHeight: 28,
  },
  bodyText: {
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  bgIcon: {
    position: 'absolute',
    right: -20,
    top: -20,
    fontSize: 120,
    opacity: 0.05,
  },
});
