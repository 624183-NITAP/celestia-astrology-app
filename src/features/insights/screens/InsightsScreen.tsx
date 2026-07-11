import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { CosmicBackground, GlassCard, ProgressRing } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';
import { INSIGHTS_WEEKLY_TRENDS, INSIGHTS_PLANET_TIMELINE, JOURNAL_ENTRIES } from '../../../shared/constants/mockData';
import { MoodGraph } from '../components/MoodGraph';

export default function InsightsScreen() {
  const [activeMetric, setActiveMetric] = useState<'mood' | 'energy' | 'focus'>('mood');

  return (
    <CosmicBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[TextStyles.h1, styles.headerTitle]}>Cosmic Insights</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Trends & Mood Graph */}
          <GlassCard style={styles.card} variant="elevated" padding={Spacing.xl}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderSymbol}>📊</Text>
              <Text style={[TextStyles.h2, styles.cardTitle]}>Weekly Rhythms</Text>
            </View>
            
            <View style={styles.metricToggles}>
              {(['mood', 'energy', 'focus'] as const).map((metric) => (
                <TouchableOpacity 
                  key={metric}
                  style={[styles.toggleBtn, activeMetric === metric && styles.toggleBtnActive]}
                  onPress={() => setActiveMetric(metric)}
                >
                  <Text style={[styles.toggleText, activeMetric === metric && styles.toggleTextActive]}>
                    {metric.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <MoodGraph data={INSIGHTS_WEEKLY_TRENDS} metric={activeMetric} />
          </GlassCard>

          {/* Growth Tracker - Bento Grid */}
          <Text style={[TextStyles.h3, styles.sectionTitle]}>Spiritual Growth</Text>
          <View style={styles.bentoGrid}>
            <View style={styles.bentoRow}>
              <GlassCard style={styles.bentoCard} padding={Spacing.lg}>
                <ProgressRing progress={85} size={70} strokeWidth={6} color={Colors.accent.purple} valueSize={16} />
                <Text style={styles.bentoLabel}>Intuition</Text>
              </GlassCard>
              <GlassCard style={styles.bentoCard} padding={Spacing.lg}>
                <ProgressRing progress={60} size={70} strokeWidth={6} color={Colors.semantic.health} valueSize={16} />
                <Text style={styles.bentoLabel}>Grounding</Text>
              </GlassCard>
            </View>
            <View style={styles.bentoRow}>
              <GlassCard style={styles.bentoCard} padding={Spacing.lg}>
                <ProgressRing progress={92} size={70} strokeWidth={6} color={Colors.semantic.love} valueSize={16} />
                <Text style={styles.bentoLabel}>Empathy</Text>
              </GlassCard>
              <GlassCard style={styles.bentoCard} padding={Spacing.lg}>
                <ProgressRing progress={45} size={70} strokeWidth={6} color={Colors.semantic.career} valueSize={16} />
                <Text style={styles.bentoLabel}>Discipline</Text>
              </GlassCard>
            </View>
          </View>

          {/* Planetary Timeline */}
          <Text style={[TextStyles.h3, styles.sectionTitle, { marginTop: Spacing.xl }]}>Cosmic Timeline</Text>
          <GlassCard style={styles.card} padding={Spacing.xl}>
            {INSIGHTS_PLANET_TIMELINE.map((event, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineIconContainer}>
                  <Text style={styles.timelineEmoji}>{event.emoji}</Text>
                  {index !== INSIGHTS_PLANET_TIMELINE.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>{event.date}</Text>
                  <Text style={[TextStyles.h4, styles.timelineEventTitle]}>{event.event}</Text>
                  <Text style={[TextStyles.bodySmall, styles.timelineImpact]}>{event.impact}</Text>
                </View>
              </View>
            ))}
          </GlassCard>

          {/* Journal History */}
          <Text style={[TextStyles.h3, styles.sectionTitle, { marginTop: Spacing.xl }]}>Recent Reflections</Text>
          {JOURNAL_ENTRIES.map((entry) => (
            <GlassCard key={entry.id} style={styles.journalCard} padding={Spacing.lg}>
              <View style={styles.journalHeader}>
                <Text style={styles.journalEmoji}>{entry.moodEmoji}</Text>
                <View style={styles.journalMeta}>
                  <Text style={styles.journalTitle}>{entry.title}</Text>
                  <Text style={styles.journalDate}>{entry.date.toLocaleDateString()}</Text>
                </View>
              </View>
              <Text style={styles.journalContent} numberOfLines={2}>{entry.content}</Text>
            </GlassCard>
          ))}

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
    paddingBottom: Spacing['3xl'] || 40,
  },
  card: {
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
  metricToggles: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 4,
    marginBottom: Spacing.md,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  toggleBtnActive: {
    backgroundColor: Colors.accent.purple,
  },
  toggleText: {
    color: Colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  toggleTextActive: {
    color: Colors.white,
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: Spacing.xs,
    letterSpacing: 0.5,
    color: Colors.text.primary,
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
  bentoLabel: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  timelineIconContainer: {
    alignItems: 'center',
    marginRight: Spacing.md,
    width: 30,
  },
  timelineEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.glass.borderLight,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: Spacing.md,
  },
  timelineDate: {
    color: Colors.accent.gold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  timelineEventTitle: {
    color: Colors.text.primary,
    fontWeight: '700',
    marginBottom: 4,
  },
  timelineImpact: {
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  journalCard: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  journalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  journalEmoji: {
    fontSize: 32,
  },
  journalMeta: {
    flex: 1,
  },
  journalTitle: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  journalDate: {
    color: Colors.text.muted,
    fontSize: 12,
    marginTop: 2,
  },
  journalContent: {
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});
