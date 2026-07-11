/**
 * Celestia Premium Color Palette
 * A luxury cosmic theme with deep-space backgrounds, ethereal gradients, and gold accents.
 */

export const Colors = {
  // ── Backgrounds ──────────────────────────────────
  background: {
    deepSpace: '#03050B',
    darkNavy: '#060913',
    navy: '#0D1126',
    card: '#12162B',
    elevated: '#171C35',
    surface: '#1D2342',
  },

  // ── Primary Gradients ───────────────────────────
  gradient: {
    cosmic: ['#6C3CE1', '#3B1F8E'] as const,
    nebula: ['#7C3AED', '#4F46E5'] as const,
    aurora: ['#1E3A8A', '#7C3AED'] as const,
    sunset: ['#F59E0B', '#D946EF'] as const,
    ocean: ['#0EA5E9', '#6366F1'] as const,
    fire: ['#F43F5E', '#F97316'] as const,
    earth: ['#10B981', '#059669'] as const,
    celestial: ['#818CF8', '#C084FC'] as const,
    gold: ['#F5D060', '#D4AF37'] as const,
    midnight: ['#0A0E27', '#1E1B4B'] as const,
    cardGlass: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)'] as const,
  },

  // ── Accent Colors ──────────────────────────────
  accent: {
    gold: '#D4AF37',
    goldLight: '#F5D060',
    goldMuted: '#B8962E',
    purple: '#8B5CF6',
    purpleLight: '#A78BFA',
    indigo: '#6366F1',
    blue: '#3B82F6',
    cyan: '#06B6D4',
    pink: '#EC4899',
    rose: '#F43F5E',
  },

  // ── Semantic Colors ────────────────────────────
  semantic: {
    love: '#F43F5E',
    career: '#6366F1',
    health: '#10B981',
    finance: '#F59E0B',
    friendship: '#EC4899',
    communication: '#06B6D4',
    emotional: '#8B5CF6',
    marriage: '#D4AF37',
  },

  // ── Text Colors ────────────────────────────────
  text: {
    primary: '#FFFFFF',
    secondary: '#E2E8F0',
    tertiary: '#94A3B8',
    muted: '#64748B',
    accent: '#D4AF37',
    inverse: '#0A0E27',
  },

  // ── Glassmorphism ─────────────────────────────
  glass: {
    background: 'rgba(255, 255, 255, 0.04)',
    backgroundStrong: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.15)',
    borderLight: 'rgba(255, 255, 255, 0.10)',
    borderAccent: 'rgba(139, 92, 246, 0.40)',
  },

  // ── Zodiac Element Colors ─────────────────────
  elements: {
    fire: '#F43F5E',
    earth: '#10B981',
    air: '#FBBF24',
    water: '#3B82F6',
  },

  // ── Status Colors ─────────────────────────────
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // ── Utility ───────────────────────────────────
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.60)',
  overlayLight: 'rgba(0, 0, 0, 0.30)',
} as const;

export type ColorKey = keyof typeof Colors;
