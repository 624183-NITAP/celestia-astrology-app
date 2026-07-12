import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { useUserStore } from '../../../store/useUserStore';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { CosmicBackground, GlassCard, Button } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';

export default function ProfileCreationScreen({ navigation }: any) {
  const { pendingProfile, setOnboardingComplete } = useOnboardingStore();
  const { setProfile } = useUserStore();
  const [analyzing, setAnalyzing] = useState(true);
  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start zodiac wheel spin animation
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    // Finish calculation screen in 4 seconds
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleFinish = useCallback(() => {
    // Commit the staged profile to the user store — this triggers navigator switch to Main
    if (pendingProfile) {
      setProfile(pendingProfile);
    }
    setOnboardingComplete(true);
  }, [pendingProfile, setProfile, setOnboardingComplete]);

  return (
    <CosmicBackground variant="onboarding">
      <View style={styles.container}>
        {analyzing ? (
          <View style={styles.loaderContainer}>
            <Animated.Text style={[styles.wheel, { transform: [{ rotate: spin }] }]}>☸️</Animated.Text>
            <Text style={[TextStyles.h2, styles.loaderTitle]}>Mapping the Heavens...</Text>
            <Text style={[TextStyles.bodySmall, styles.loaderDesc]}>Calculating planetary coordinates, houses, and astrological charts...</Text>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={[TextStyles.displaySmall, styles.congrats]}>Celestial Chart Ready</Text>
            <Text style={[TextStyles.body, styles.intro]}>
              Greetings {pendingProfile?.name || 'Traveler'}. The stars have aligned to reveal your cosmic blueprint:
            </Text>

            <View style={styles.grid}>
              <GlassCard style={styles.signCard} variant="gold">
                <Text style={styles.signLabel}>☀️ SUN SIGN</Text>
                <Text style={styles.signValue}>{pendingProfile?.sunSign}</Text>
              </GlassCard>

              <GlassCard style={styles.signCard} variant="elevated">
                <Text style={styles.signLabel}>🌙 MOON SIGN</Text>
                <Text style={styles.signValue}>{pendingProfile?.moonSign}</Text>
              </GlassCard>

              <GlassCard style={styles.signCard} variant="accent">
                <Text style={styles.signLabel}>⬆️ RISING SIGN</Text>
                <Text style={styles.signValue}>{pendingProfile?.risingSign}</Text>
              </GlassCard>
            </View>

            <Button
              title="Enter Celestia"
              variant="primary"
              onPress={handleFinish}
              style={styles.finishBtn}
            />
          </View>
        )}
      </View>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  loaderContainer: {
    alignItems: 'center',
  },
  wheel: {
    fontSize: 90,
    color: Colors.accent.gold,
    marginBottom: Spacing.xl,
  },
  loaderTitle: {
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  loaderDesc: {
    color: Colors.text.tertiary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  resultContainer: {
    alignItems: 'center',
  },
  congrats: {
    color: Colors.text.primary,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  intro: {
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.base,
  },
  grid: {
    width: '100%',
    gap: Spacing.md,
    marginBottom: Spacing['2xl'],
  },
  signCard: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  signLabel: {
    color: Colors.accent.gold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  signValue: {
    color: Colors.text.primary,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  finishBtn: {
    width: '100%',
  },
});
