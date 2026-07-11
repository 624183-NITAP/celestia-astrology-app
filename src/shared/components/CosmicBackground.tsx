/**
 * CosmicBackground — Full-screen gradient background with animated and drifting stars
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const NUM_STARS = 65; // Increased for richer background

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: Animated.Value;
  driftX: Animated.Value;
  driftY: Animated.Value;
  delay: number;
}

interface CosmicBackgroundProps {
  children?: React.ReactNode;
  variant?: 'default' | 'auth' | 'onboarding';
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  children,
  variant = 'default',
}) => {
  const stars = useRef<Star[]>(
    Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * SCREEN_WIDTH,
      y: Math.random() * SCREEN_HEIGHT,
      size: Math.random() * 2.2 + 0.6,
      opacity: new Animated.Value(Math.random() * 0.4 + 0.1),
      driftX: new Animated.Value(0),
      driftY: new Animated.Value(0),
      delay: Math.random() * 3000,
    }))
  ).current;

  useEffect(() => {
    stars.forEach(star => {
      // Twinkle loop
      const twinkle = () => {
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.7 + 0.2,
            duration: 2000 + Math.random() * 2500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.25 + 0.05,
            duration: 2000 + Math.random() * 2500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]).start(() => twinkle());
      };

      // Subtle float/drift loop
      const floatDrift = () => {
        const targetX = (Math.random() - 0.5) * 20;
        const targetY = (Math.random() - 0.5) * 20;
        Animated.parallel([
          Animated.timing(star.driftX, {
            toValue: targetX,
            duration: 10000 + Math.random() * 8000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(star.driftY, {
            toValue: targetY,
            duration: 10000 + Math.random() * 8000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]).start(() => floatDrift());
      };

      setTimeout(() => {
        twinkle();
        floatDrift();
      }, star.delay);
    });
  }, []);

  const gradientColors = (variant === 'auth'
    ? [Colors.background.deepSpace, '#080517', Colors.background.darkNavy]
    : variant === 'onboarding'
      ? ['#04030B', '#09061C', '#120E30']
      : [Colors.background.deepSpace, '#050714', Colors.background.navy]) as unknown as readonly [string, string, ...string[]];

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradientColors} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFill} />
      {/* Add a subtle top highlight for depth */}
      <LinearGradient colors={['rgba(139, 92, 246, 0.12)', 'transparent']} style={styles.topHighlight} />
      {stars.map((star, i) => (
        <Animated.View
          key={i}
          style={[
            styles.star,
            {
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              opacity: star.opacity,
              backgroundColor: i % 5 === 0 ? '#C4B5FD' : i % 3 === 0 ? '#93C5FD' : '#FFFFFF',
              transform: [
                { translateX: star.driftX },
                { translateY: star.driftY },
              ],
            },
          ]}
        />
      ))}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Solid fallback
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  star: {
    position: 'absolute',
  },
});
