import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Image } from 'react-native';
import { CosmicBackground } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';

export default function SplashScreen({ navigation }: any) {
  const ring1Scale = useRef(new Animated.Value(0.4)).current;
  const ring2Scale = useRef(new Animated.Value(0.4)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Elegant pulsing celestial rings animation
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(ring1Scale, {
            toValue: 1.1,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(ring1Scale, {
            toValue: 0.8,
            duration: 3500,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(ring2Scale, {
            toValue: 0.9,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(ring2Scale, {
            toValue: 1.2,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Auto navigate to Login after 3.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <CosmicBackground variant="auth">
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          {/* Outer glowing rings */}
          <Animated.View style={[styles.ring, styles.ringOuter, { transform: [{ scale: ring1Scale }] }]} />
          <Animated.View style={[styles.ring, styles.ringInner, { transform: [{ scale: ring2Scale }] }]} />
          
          <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
            <Text style={styles.logoIcon}>✨</Text>
          </Animated.View>
        </View>

        <Animated.View style={[styles.textWrapper, { opacity: logoOpacity }]}>
          <Text style={[TextStyles.displayMedium, styles.title]}>CELESTIA</Text>
          <Text style={[TextStyles.label, styles.tagline]}>Your Soul's Cosmic Alignment</Text>
        </Animated.View>
      </View>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 250,
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1.5,
  },
  ringOuter: {
    width: 220,
    height: 220,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    borderStyle: 'dashed',
  },
  ringInner: {
    width: 170,
    height: 170,
    borderColor: 'rgba(139, 92, 246, 0.25)',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: 2,
    borderColor: Colors.accent.gold,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 8,
  },
  logoIcon: {
    fontSize: 48,
  },
  textWrapper: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  title: {
    color: Colors.text.primary,
    letterSpacing: 6,
    fontWeight: '700',
  },
  tagline: {
    color: Colors.accent.goldLight,
    marginTop: Spacing.sm,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontSize: 12,
  },
});
