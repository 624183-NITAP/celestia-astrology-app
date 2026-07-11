/**
 * Celestia Typography System
 * Premium typography using Inter (body) and system fonts.
 * In production, load Inter + Outfit via expo-font.
 */

import { TextStyle, Platform } from 'react-native';

export const FontFamily = {
  regular: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  medium: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  semiBold: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  bold: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
} as const;

export const FontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
} as const;

export const FontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semiBold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extraBold: '800' as TextStyle['fontWeight'],
};

export const LineHeight = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const LetterSpacing = {
  extraTight: -1.5,
  tight: -0.75,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;

/** Pre-composed text style presets */
export const TextStyles: Record<string, TextStyle> = {
  // Display
  displayLarge: {
    fontSize: FontSize['6xl'],
    fontWeight: FontWeight.extraBold,
    letterSpacing: LetterSpacing.extraTight,
    lineHeight: FontSize['6xl'] * LineHeight.tight,
  },
  displayMedium: {
    fontSize: FontSize['5xl'],
    fontWeight: FontWeight.extraBold,
    letterSpacing: LetterSpacing.extraTight,
    lineHeight: FontSize['5xl'] * LineHeight.tight,
  },
  displaySmall: {
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight.extraBold,
    letterSpacing: LetterSpacing.extraTight,
    lineHeight: FontSize['4xl'] * LineHeight.snug,
  },

  // Headings
  h1: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.extraBold,
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['3xl'] * LineHeight.snug,
  },
  h2: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['2xl'] * LineHeight.snug,
  },
  h3: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    lineHeight: FontSize.xl * LineHeight.snug,
  },
  h4: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    lineHeight: FontSize.lg * LineHeight.snug,
  },

  // Body
  bodyLarge: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.lg * LineHeight.normal,
  },
  body: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.base * LineHeight.normal,
  },
  bodySmall: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.md * LineHeight.normal,
  },

  // Labels
  label: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.md * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
  },
  labelSmall: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.sm * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
  },

  // Caption
  caption: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
  },
  captionSmall: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.xs * LineHeight.normal,
  },

  // Special
  zodiacSymbol: {
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight.regular,
    lineHeight: FontSize['4xl'] * LineHeight.tight,
  },
  scoreValue: {
    fontSize: FontSize['5xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['5xl'] * LineHeight.tight,
  },
} as const;
