/**
 * ProgressRing — Animated SVG circular progress indicator
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { Colors, FontWeight, FontSize } from '../theme';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  gradientColors?: readonly [string, string];
  showValue?: boolean;
  label?: string;
  animated?: boolean;
  duration?: number;
  valueSize?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color,
  gradientColors,
  showValue = true,
  label,
  animated = true,
  duration = 1200,
  valueSize,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: progress,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(progress);
    }
  }, [progress, animated, duration]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  const displayValue = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const defaultGradient = gradientColors || Colors.gradient.cosmic;
  const strokeColor = color || undefined;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Defs>
          <SvgGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={defaultGradient[0]} />
            <Stop offset="100%" stopColor={defaultGradient[1]} />
          </SvgGradient>
        </Defs>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor || 'url(#progressGrad)'}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      {showValue && (
        <View style={styles.valueContainer}>
          <AnimatedText value={displayValue} fontSize={valueSize || size * 0.22} />
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      )}
    </View>
  );
};

/** Animated number display */
const AnimatedText: React.FC<{ value: Animated.AnimatedInterpolation<number>; fontSize: number }> = ({
  value,
  fontSize,
}) => {
  const [displayVal, setDisplayVal] = React.useState(0);
  const listenerId = useRef<string | null>(null);

  useEffect(() => {
    listenerId.current = value.addListener(({ value: v }) => {
      setDisplayVal(Math.round(v));
    });
    return () => {
      if (listenerId.current) value.removeListener(listenerId.current);
    };
  }, [value]);

  return (
    <Text style={[styles.value, { fontSize }]}>
      {displayVal}
      <Text style={[styles.percent, { fontSize: fontSize * 0.5 }]}>%</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    color: Colors.text.primary,
    fontWeight: FontWeight.bold,
  },
  percent: {
    color: Colors.text.tertiary,
    fontWeight: FontWeight.medium,
  },
  label: {
    color: Colors.text.tertiary,
    fontSize: FontSize.xs,
    marginTop: 2,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
