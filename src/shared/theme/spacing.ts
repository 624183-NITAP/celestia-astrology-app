/**
 * Celestia Spacing & Layout System
 * Based on a 4px grid for consistent visual rhythm.
 */

export const Spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  '6xl': 80,
  '7xl': 96,
} as const;

export const BorderRadius = {
  none: 0,
  sm: 6,
  md: 10,
  base: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

export const Layout = {
  screenPaddingHorizontal: Spacing.lg,
  screenPaddingTop: Spacing['2xl'],
  cardPadding: Spacing.base,
  cardPaddingLarge: Spacing.xl,
  sectionGap: Spacing.xl,
  itemGap: Spacing.md,
  inputHeight: 56,
  buttonHeight: 52,
  buttonHeightSmall: 40,
  tabBarHeight: 80,
  headerHeight: 56,
  iconSize: 24,
  iconSizeLarge: 32,
  avatarSize: 64,
  avatarSizeLarge: 96,
  zodiacWheelSize: 300,
  progressRingSize: 120,
  progressRingStroke: 8,
} as const;
