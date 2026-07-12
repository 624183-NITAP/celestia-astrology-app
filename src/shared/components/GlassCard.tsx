/**
 * GlassCard — Premium Glassmorphism card using expo-blur
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
  StyleProp,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, Spacing, Shadows } from '../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'accent' | 'gold';
  animated?: boolean;
  delay?: number;
  padding?: number;
  onPress?: () => void;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  variant = 'default',
  animated = true,
  delay = 0,
  padding = Spacing.base,
  accessible,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const fadeAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;
  const slideAnim = useRef(new Animated.Value(animated ? 25 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(animated ? 0.97 : 1)).current;

  useEffect(() => {
    if (animated) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          delay,
          easing: Easing.out(Easing.bezier(0.16, 1, 0.3, 1)), // Premium easeOutExpo
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          delay,
          easing: Easing.out(Easing.bezier(0.16, 1, 0.3, 1)),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          delay,
          easing: Easing.out(Easing.bezier(0.16, 1, 0.3, 1)),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [animated, delay]);

  const borderColor =
    variant === 'accent'
      ? Colors.glass.borderAccent
      : variant === 'gold'
        ? 'rgba(245, 208, 96, 0.28)'
        : Colors.glass.border;

  const gradientColors =
    variant === 'elevated'
      ? (['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.05)'] as const)
      : variant === 'accent'
        ? (['rgba(139, 92, 246, 0.16)', 'rgba(99, 102, 241, 0.08)'] as const)
        : variant === 'gold'
          ? (['rgba(245, 208, 96, 0.12)', 'rgba(212, 175, 55, 0.04)'] as const)
          : (['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] as const);

  const shadow = variant === 'elevated' ? Shadows.cardElevated : Shadows.card;

  const backgroundLayer = (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[StyleSheet.absoluteFill, { borderColor, borderWidth: 1, borderRadius: BorderRadius.lg }]}
    />
  );

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <View style={[styles.container, shadow, style]}>
        {Platform.OS !== 'web' ? (
          <BlurView intensity={45} tint="dark" style={StyleSheet.absoluteFill}>
            {backgroundLayer}
          </BlurView>
        ) : (
          <View style={[StyleSheet.absoluteFill, styles.webGlassFallback]}>
            {backgroundLayer}
          </View>
        )}
        <View style={{ padding }}>
          {children}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderTopColor: 'rgba(255, 255, 255, 0.25)', // Inner highlight
  },
  gradient: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  webGlassFallback: {
    backgroundColor: 'rgba(10, 14, 39, 0.75)',
  },
});
