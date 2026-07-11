/**
 * Planet Data — Celestial bodies used in astrology
 */

export interface Planet {
  id: string;
  name: string;
  symbol: string;
  emoji: string;
  rulership: string[];
  meaning: string;
  keywords: string[];
  color: string;
}

export const PLANETS: Planet[] = [
  {
    id: 'sun',
    name: 'Sun',
    symbol: '☉',
    emoji: '☀️',
    rulership: ['Leo'],
    meaning: 'Your core identity, ego, and vitality. The Sun represents your fundamental character and the essence of who you are.',
    keywords: ['Identity', 'Ego', 'Vitality', 'Purpose'],
    color: '#F59E0B',
  },
  {
    id: 'moon',
    name: 'Moon',
    symbol: '☽',
    emoji: '🌙',
    rulership: ['Cancer'],
    meaning: 'Your emotional inner world, instincts, and subconscious patterns. The Moon governs your deepest feelings and needs.',
    keywords: ['Emotions', 'Instincts', 'Nurturing', 'Habits'],
    color: '#E2E8F0',
  },
  {
    id: 'mercury',
    name: 'Mercury',
    symbol: '☿',
    emoji: '💫',
    rulership: ['Gemini', 'Virgo'],
    meaning: 'How you think, communicate, and process information. Mercury governs intellect and expression.',
    keywords: ['Communication', 'Intellect', 'Logic', 'Learning'],
    color: '#06B6D4',
  },
  {
    id: 'venus',
    name: 'Venus',
    symbol: '♀',
    emoji: '💖',
    rulership: ['Taurus', 'Libra'],
    meaning: 'Your approach to love, beauty, pleasure, and values. Venus reveals what you find attractive and harmonious.',
    keywords: ['Love', 'Beauty', 'Harmony', 'Values'],
    color: '#EC4899',
  },
  {
    id: 'mars',
    name: 'Mars',
    symbol: '♂',
    emoji: '🔥',
    rulership: ['Aries'],
    meaning: 'Your drive, ambition, energy, and assertiveness. Mars reveals how you take action and pursue desires.',
    keywords: ['Drive', 'Ambition', 'Energy', 'Passion'],
    color: '#EF4444',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    symbol: '♃',
    emoji: '🪐',
    rulership: ['Sagittarius'],
    meaning: 'Your path to growth, expansion, and good fortune. Jupiter represents wisdom, optimism, and abundance.',
    keywords: ['Expansion', 'Luck', 'Wisdom', 'Abundance'],
    color: '#8B5CF6',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    symbol: '♄',
    emoji: '⏳',
    rulership: ['Capricorn'],
    meaning: 'Your lessons, responsibilities, and karmic path. Saturn represents discipline, structure, and maturity.',
    keywords: ['Discipline', 'Responsibility', 'Structure', 'Karma'],
    color: '#6B7280',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    symbol: '♅',
    emoji: '⚡',
    rulership: ['Aquarius'],
    meaning: 'Your uniqueness, innovation, and desire for freedom. Uranus represents sudden change and revolution.',
    keywords: ['Innovation', 'Freedom', 'Rebellion', 'Change'],
    color: '#3B82F6',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    symbol: '♆',
    emoji: '🌊',
    rulership: ['Pisces'],
    meaning: 'Your spiritual connection, imagination, and dreams. Neptune represents intuition and transcendence.',
    keywords: ['Spirituality', 'Dreams', 'Intuition', 'Illusion'],
    color: '#2563EB',
  },
  {
    id: 'pluto',
    name: 'Pluto',
    symbol: '♇',
    emoji: '🔮',
    rulership: ['Scorpio'],
    meaning: 'Your transformation, power, and regeneration. Pluto represents deep psychological change and rebirth.',
    keywords: ['Transformation', 'Power', 'Rebirth', 'Intensity'],
    color: '#DC2626',
  },
];

export const HOUSES = [
  { number: 1, name: 'First House', meaning: 'Self, Appearance, First Impressions', ruler: 'Aries' },
  { number: 2, name: 'Second House', meaning: 'Values, Possessions, Self-Worth', ruler: 'Taurus' },
  { number: 3, name: 'Third House', meaning: 'Communication, Learning, Siblings', ruler: 'Gemini' },
  { number: 4, name: 'Fourth House', meaning: 'Home, Family, Roots', ruler: 'Cancer' },
  { number: 5, name: 'Fifth House', meaning: 'Creativity, Romance, Children', ruler: 'Leo' },
  { number: 6, name: 'Sixth House', meaning: 'Health, Daily Routine, Service', ruler: 'Virgo' },
  { number: 7, name: 'Seventh House', meaning: 'Partnerships, Marriage, Contracts', ruler: 'Libra' },
  { number: 8, name: 'Eighth House', meaning: 'Transformation, Shared Resources', ruler: 'Scorpio' },
  { number: 9, name: 'Ninth House', meaning: 'Higher Learning, Travel, Philosophy', ruler: 'Sagittarius' },
  { number: 10, name: 'Tenth House', meaning: 'Career, Public Image, Authority', ruler: 'Capricorn' },
  { number: 11, name: 'Eleventh House', meaning: 'Friends, Groups, Hopes & Wishes', ruler: 'Aquarius' },
  { number: 12, name: 'Twelfth House', meaning: 'Subconscious, Secrets, Spirituality', ruler: 'Pisces' },
] as const;

export const ASPECTS = [
  { name: 'Conjunction', symbol: '☌', degrees: 0, orb: 8, nature: 'neutral' as const, color: '#D4AF37' },
  { name: 'Sextile', symbol: '⚹', degrees: 60, orb: 6, nature: 'harmonious' as const, color: '#10B981' },
  { name: 'Square', symbol: '□', degrees: 90, orb: 8, nature: 'challenging' as const, color: '#EF4444' },
  { name: 'Trine', symbol: '△', degrees: 120, orb: 8, nature: 'harmonious' as const, color: '#3B82F6' },
  { name: 'Opposition', symbol: '☍', degrees: 180, orb: 8, nature: 'challenging' as const, color: '#F97316' },
] as const;

export function getPlanetById(id: string): Planet | undefined {
  return PLANETS.find(p => p.id === id);
}
