/**
 * Button — Premium gradient button with press animation
 */

import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  ActivityIndicator,
  StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, Spacing, FontWeight, FontSize, Shadows } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = true,
  style,
  textStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const heights = { sm: 40, md: 52, lg: 58 };
  const fontSizes = { sm: FontSize.md, md: FontSize.base, lg: FontSize.lg };

  const isPrimary = variant === 'primary';
  const isGold = variant === 'gold';
  const isGhost = variant === 'ghost';
  const isDanger = variant === 'danger';

  const gradientColors = isGold
    ? Colors.gradient.gold
    : isDanger
      ? Colors.gradient.fire
      : Colors.gradient.cosmic;

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
        fullWidth && { width: '100%' },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ disabled: disabled || loading, busy: loading }}
        style={[
          styles.base,
          { height: heights[size] },
          isGhost && styles.ghost,
          variant === 'secondary' && styles.secondary,
          disabled && styles.disabled,
        ]}
      >
        {(isPrimary || isGold || isDanger) && !disabled ? (
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.gradient, { height: heights[size] }]}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <>
                {icon}
                <Text style={[styles.text, { fontSize: fontSizes[size] }, textStyle]}>{title}</Text>
              </>
            )}
          </LinearGradient>
        ) : (
          <>
            {loading ? (
              <ActivityIndicator color={Colors.text.primary} />
            ) : (
              <>
                {icon}
                <Text
                  style={[
                    styles.text,
                    { fontSize: fontSizes[size] },
                    isGhost && styles.ghostText,
                    variant === 'secondary' && styles.secondaryText,
                    disabled && styles.disabledText,
                    textStyle,
                  ]}
                >
                  {title}
                </Text>
              </>
            )}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.base,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    ...Shadows.button,
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.base,
  },
  text: {
    color: Colors.white,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.5,
  },
  ghost: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  ghostText: {
    color: Colors.accent.purpleLight,
  },
  secondary: {
    backgroundColor: Colors.glass.background,
    borderWidth: 1,
    borderColor: Colors.glass.border,
    shadowColor: 'transparent',
    elevation: 0,
  },
  secondaryText: {
    color: Colors.text.secondary,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: Colors.text.muted,
  },
});
