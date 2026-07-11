/**
 * Input — Premium floating-label input with glow focus state
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Colors, BorderRadius, Spacing, FontSize, FontWeight } from '../theme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string | null;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  value,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [error]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.parallel([
      Animated.timing(labelAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(labelAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    onBlur?.(e);
  };

  const labelTop = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 6],
  });

  const labelFontSize = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [FontSize.base, FontSize.xs],
  });

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? Colors.status.error : Colors.glass.border,
      error ? Colors.status.error : Colors.accent.purple,
    ],
  });

  return (
    <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
      <Animated.View
        style={[
          styles.container,
          { borderColor },
          isFocused && styles.focusedContainer,
        ]}
        accessible={true}
        accessibilityLabel={label}
        accessibilityHint={error ? `Error: ${error}` : 'Input field'}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.inputWrapper}>
          <Animated.Text
            style={[
              styles.label,
              {
                top: labelTop,
                fontSize: labelFontSize,
                color: isFocused ? Colors.accent.purpleLight : Colors.text.muted,
              },
            ]}
          >
            {label}
          </Animated.Text>
          <TextInput
            style={[styles.input, icon ? { paddingLeft: 0 } : undefined]}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={Colors.text.muted}
            selectionColor={Colors.accent.purple}
            accessible={true}
            accessibilityLabel={`${label} text entry`}
            {...rest}
          />
        </View>
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            accessible={true}
            accessibilityLabel="Toggle visibility or secondary action"
            accessibilityRole="button"
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && (
        <Text
          style={styles.error}
          accessible={true}
          accessibilityLabel={`Error message: ${error}`}
        >
          {error}
        </Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass.background,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    height: 56,
    paddingHorizontal: Spacing.base,
  },
  focusedContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.06)',
  },
  iconContainer: {
    marginRight: Spacing.md,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    left: 0,
    fontWeight: FontWeight.medium,
  },
  input: {
    color: Colors.text.primary,
    fontSize: FontSize.base,
    paddingTop: 12,
    height: '100%',
  },
  rightIcon: {
    marginLeft: Spacing.sm,
    padding: Spacing.xs,
  },
  error: {
    color: Colors.status.error,
    fontSize: FontSize.sm,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
});
