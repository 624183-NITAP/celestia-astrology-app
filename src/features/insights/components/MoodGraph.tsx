import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withDelay } from 'react-native-reanimated';
import { Colors, Spacing } from '../../../shared/theme';

interface DataPoint {
  day: string;
  energy: number;
  mood: number;
  focus: number;
}

interface MoodGraphProps {
  data: DataPoint[];
  metric: 'energy' | 'mood' | 'focus';
}

const AnimatedBar = ({ value, label, index, color }: { value: number; label: string; index: number; color: string }) => {
  const height = useSharedValue(0);

  useEffect(() => {
    // Animate to the percentage height
    height.value = withDelay(
      index * 100,
      withTiming(value, {
        duration: 800,
        easing: Easing.out(Easing.exp),
      })
    );
  }, [value, index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: `${height.value}%`,
    };
  });

  return (
    <View style={styles.barContainer}>
      <View style={styles.barTrack}>
        <Animated.View style={[styles.barFill, { backgroundColor: color }, animatedStyle]} />
      </View>
      <Text style={styles.barLabel}>{label}</Text>
    </View>
  );
};

export const MoodGraph: React.FC<MoodGraphProps> = ({ data, metric }) => {
  const getColor = () => {
    switch (metric) {
      case 'energy': return Colors.semantic.career;
      case 'mood': return Colors.semantic.love;
      case 'focus': return Colors.semantic.communication;
      default: return Colors.accent.purple;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartArea}>
        {data.map((point, index) => (
          <AnimatedBar
            key={point.day}
            value={point[metric]}
            label={point.day}
            index={index}
            color={getColor()}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    marginTop: Spacing.md,
  },
  chartArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  barContainer: {
    alignItems: 'center',
    height: '100%',
    width: 24,
  },
  barTrack: {
    flex: 1,
    width: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  barLabel: {
    color: Colors.text.muted,
    fontSize: 10,
    marginTop: Spacing.sm,
    fontWeight: '600',
  },
});
