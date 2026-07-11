/**
 * Astrology Utility Functions
 * Sun sign, moon sign, rising sign calculations, compatibility, and moon phase.
 */

import { ZODIAC_SIGNS, ZodiacSign } from '../constants/zodiacSigns';

/** Determine sun sign from a birth date */
export function getSunSign(birthDate: Date): ZodiacSign {
  const month = birthDate.getMonth() + 1; // 1-indexed
  const day = birthDate.getDate();

  for (const sign of ZODIAC_SIGNS) {
    if (sign.id === 'capricorn') {
      // Capricorn spans year boundary
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return sign;
    } else {
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign;
      }
    }
  }
  // Default fallback (should never hit)
  return ZODIAC_SIGNS[0];
}

/** Simulated moon sign — based on a simple hash of date + time */
export function getMoonSign(birthDate: Date, birthTime?: string): ZodiacSign {
  const dayOfYear = getDayOfYear(birthDate);
  const timeMinutes = birthTime ? parseTimeToMinutes(birthTime) : 720;
  const hash = (dayOfYear * 13 + timeMinutes * 7 + birthDate.getFullYear()) % 12;
  return ZODIAC_SIGNS[hash];
}

/** Simulated rising sign — based on birth time and location hash */
export function getRisingSign(birthDate: Date, birthTime?: string, _location?: string): ZodiacSign {
  const dayOfYear = getDayOfYear(birthDate);
  const timeMinutes = birthTime ? parseTimeToMinutes(birthTime) : 360;
  const locationHash = _location ? simpleStringHash(_location) : 42;
  const index = (dayOfYear * 3 + timeMinutes * 11 + locationHash + birthDate.getFullYear()) % 12;
  return ZODIAC_SIGNS[index];
}

/** Calculate compatibility score between two signs */
export function getCompatibilityScore(sign1Id: string, sign2Id: string): CompatibilityResult {
  const s1 = ZODIAC_SIGNS.find(s => s.id === sign1Id);
  const s2 = ZODIAC_SIGNS.find(s => s.id === sign2Id);

  if (!s1 || !s2) {
    return getDefaultCompatibility();
  }

  // Base score from compatibility lists
  let base = 50;
  if (s1.compatibleSigns.includes(s2.id)) base += 25;
  if (s2.compatibleSigns.includes(s1.id)) base += 15;
  if (s1.element === s2.element) base += 10;

  // Element harmony
  const elementBonus = getElementHarmony(s1.element, s2.element);
  base += elementBonus;

  // Modality dynamics
  if (s1.modality === s2.modality) base -= 5; // Same modality can clash
  if (s1.modality !== s2.modality) base += 5;

  // Same sign
  if (s1.id === s2.id) base = 72;

  const overall = Math.min(98, Math.max(20, base));

  // Derive category scores from overall with some variation
  const seed = simpleStringHash(s1.id + s2.id);
  return {
    overall,
    love: clampScore(overall + ((seed % 20) - 10)),
    friendship: clampScore(overall + (((seed * 3) % 20) - 10)),
    communication: clampScore(overall + (((seed * 7) % 20) - 10)),
    emotional: clampScore(overall + (((seed * 11) % 20) - 10)),
    marriage: clampScore(overall + (((seed * 13) % 20) - 10)),
  };
}

export interface CompatibilityResult {
  overall: number;
  love: number;
  friendship: number;
  communication: number;
  emotional: number;
  marriage: number;
}

/** Calculate current moon phase */
export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  // Simplified moon phase algorithm
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Calculate days since known new moon (Jan 6, 2000)
  const julianDate = getJulianDate(year, month, day);
  const daysSinceNew = julianDate - 2451550.1;
  const newMoons = daysSinceNew / 29.530588853;
  const phase = newMoons - Math.floor(newMoons);
  const phaseDay = Math.round(phase * 29.53);
  const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) * 50);

  let phaseName: string;
  let phaseEmoji: string;

  if (phaseDay < 1) { phaseName = 'New Moon'; phaseEmoji = '🌑'; }
  else if (phaseDay < 7) { phaseName = 'Waxing Crescent'; phaseEmoji = '🌒'; }
  else if (phaseDay < 8) { phaseName = 'First Quarter'; phaseEmoji = '🌓'; }
  else if (phaseDay < 14) { phaseName = 'Waxing Gibbous'; phaseEmoji = '🌔'; }
  else if (phaseDay < 16) { phaseName = 'Full Moon'; phaseEmoji = '🌕'; }
  else if (phaseDay < 22) { phaseName = 'Waning Gibbous'; phaseEmoji = '🌖'; }
  else if (phaseDay < 23) { phaseName = 'Third Quarter'; phaseEmoji = '🌗'; }
  else { phaseName = 'Waning Crescent'; phaseEmoji = '🌘'; }

  return {
    phaseName,
    phaseEmoji,
    phaseDay,
    illumination,
    phase,
  };
}

export interface MoonPhaseInfo {
  phaseName: string;
  phaseEmoji: string;
  phaseDay: number;
  illumination: number;
  phase: number; // 0-1
}

/** Generate simulated planet positions for a birth chart */
export function getPlanetPositions(birthDate: Date, birthTime?: string): PlanetPosition[] {
  const dayOfYear = getDayOfYear(birthDate);
  const year = birthDate.getFullYear();
  const timeMinutes = birthTime ? parseTimeToMinutes(birthTime) : 720;

  const planetIds = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

  return planetIds.map((planetId, i) => {
    const seed = (dayOfYear * (i + 3) + year * (i + 7) + timeMinutes * (i + 1)) % 360;
    const signIndex = Math.floor(seed / 30);
    const degree = seed % 30;
    const house = ((signIndex + Math.floor(timeMinutes / 120) + i) % 12) + 1;

    return {
      planetId,
      signId: ZODIAC_SIGNS[signIndex].id,
      signName: ZODIAC_SIGNS[signIndex].name,
      degree: Math.round(degree * 100) / 100,
      house,
      isRetrograde: (seed + i * 17) % 7 === 0,
    };
  });
}

export interface PlanetPosition {
  planetId: string;
  signId: string;
  signName: string;
  degree: number;
  house: number;
  isRetrograde: boolean;
}

/** Get element distribution from planet positions */
export function getElementDistribution(positions: PlanetPosition[]): Record<string, number> {
  const counts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  positions.forEach(pos => {
    const sign = ZODIAC_SIGNS.find(s => s.id === pos.signId);
    if (sign) counts[sign.element]++;
  });
  return counts;
}

/** Get modality distribution from planet positions */
export function getModalityDistribution(positions: PlanetPosition[]): Record<string, number> {
  const counts: Record<string, number> = { Cardinal: 0, Fixed: 0, Mutable: 0 };
  positions.forEach(pos => {
    const sign = ZODIAC_SIGNS.find(s => s.id === pos.signId);
    if (sign) counts[sign.modality]++;
  });
  return counts;
}

// ── Helpers ──────────────────────────────────────

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function parseTimeToMinutes(time: string): number {
  const parts = time.split(':');
  if (parts.length < 2) return 720;
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

function simpleStringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function getJulianDate(year: number, month: number, day: number): number {
  if (month <= 2) { year--; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function getElementHarmony(e1: string, e2: string): number {
  const harmonious: Record<string, string[]> = {
    Fire: ['Air'],
    Air: ['Fire'],
    Earth: ['Water'],
    Water: ['Earth'],
  };
  if (e1 === e2) return 10;
  if (harmonious[e1]?.includes(e2)) return 8;
  return -3;
}

function clampScore(score: number): number {
  return Math.min(98, Math.max(15, Math.round(score)));
}

function getDefaultCompatibility(): CompatibilityResult {
  return { overall: 50, love: 50, friendship: 50, communication: 50, emotional: 50, marriage: 50 };
}
