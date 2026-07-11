/**
 * Zodiac Signs — Complete data for all 12 signs
 */

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  emoji: string;
  dateRange: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  rulingPlanet: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  color: string;
  luckyNumbers: number[];
  compatibleSigns: string[];
  description: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    emoji: '🐏',
    dateRange: 'Mar 21 – Apr 19',
    startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
    element: 'Fire',
    modality: 'Cardinal',
    rulingPlanet: 'Mars',
    traits: ['Bold', 'Ambitious', 'Energetic', 'Courageous'],
    strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic'],
    weaknesses: ['Impatient', 'Moody', 'Aggressive', 'Impulsive'],
    color: '#EF4444',
    luckyNumbers: [1, 8, 17],
    compatibleSigns: ['leo', 'sagittarius', 'gemini', 'aquarius'],
    description: 'As the first sign of the zodiac, Aries represents the spark of initiation. Bold and ambitious, Aries dives headfirst into even the most challenging situations.',
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    emoji: '🐂',
    dateRange: 'Apr 20 – May 20',
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    element: 'Earth',
    modality: 'Fixed',
    rulingPlanet: 'Venus',
    traits: ['Reliable', 'Patient', 'Devoted', 'Sensual'],
    strengths: ['Reliable', 'Patient', 'Practical', 'Devoted'],
    weaknesses: ['Stubborn', 'Possessive', 'Uncompromising'],
    color: '#10B981',
    luckyNumbers: [2, 6, 9, 12],
    compatibleSigns: ['virgo', 'capricorn', 'cancer', 'pisces'],
    description: 'Taurus is an earth sign represented by the bull. Like their celestial spirit animal, Taureans enjoy relaxing in serene environments surrounded by soft sounds and soothing aromas.',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    emoji: '👯',
    dateRange: 'May 21 – Jun 20',
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    traits: ['Adaptable', 'Curious', 'Communicative', 'Witty'],
    strengths: ['Gentle', 'Affectionate', 'Curious', 'Adaptable'],
    weaknesses: ['Nervous', 'Inconsistent', 'Indecisive'],
    color: '#FBBF24',
    luckyNumbers: [5, 7, 14, 23],
    compatibleSigns: ['libra', 'aquarius', 'aries', 'leo'],
    description: 'Spontaneous and playful, Gemini is driven by insatiable curiosity. Appropriately symbolized by the celestial twins, this air sign explores a multitude of passions simultaneously.',
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    emoji: '🦀',
    dateRange: 'Jun 21 – Jul 22',
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    element: 'Water',
    modality: 'Cardinal',
    rulingPlanet: 'Moon',
    traits: ['Intuitive', 'Nurturing', 'Protective', 'Emotional'],
    strengths: ['Tenacious', 'Imaginative', 'Loyal', 'Empathic'],
    weaknesses: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative'],
    color: '#3B82F6',
    luckyNumbers: [2, 3, 15, 20],
    compatibleSigns: ['scorpio', 'pisces', 'taurus', 'virgo'],
    description: 'Cancer is a cardinal water sign. Represented by the crab, this oceanic crustacean seamlessly weaves between sea and shore, representing Cancer\'s ability to exist in both emotional and material realms.',
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    emoji: '🦁',
    dateRange: 'Jul 23 – Aug 22',
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    element: 'Fire',
    modality: 'Fixed',
    rulingPlanet: 'Sun',
    traits: ['Dramatic', 'Confident', 'Creative', 'Generous'],
    strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted'],
    weaknesses: ['Arrogant', 'Stubborn', 'Self-centered', 'Lazy'],
    color: '#F59E0B',
    luckyNumbers: [1, 3, 10, 19],
    compatibleSigns: ['aries', 'sagittarius', 'gemini', 'libra'],
    description: 'Leo is ruled by the Sun, the dazzling celestial body that governs life and vitality. Vivacious, dramatic, and fiery, Leo represents the lion\'s majestic and theatrical nature.',
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    emoji: '👸',
    dateRange: 'Aug 23 – Sep 22',
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    element: 'Earth',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    traits: ['Analytical', 'Practical', 'Meticulous', 'Helpful'],
    strengths: ['Loyal', 'Analytical', 'Kind', 'Hardworking'],
    weaknesses: ['Shy', 'Worry', 'Overly critical', 'All work and no play'],
    color: '#8B5CF6',
    luckyNumbers: [5, 14, 15, 23],
    compatibleSigns: ['taurus', 'capricorn', 'cancer', 'scorpio'],
    description: 'Virgo is an earth sign historically represented by the goddess of wheat and agriculture. This connection speaks to Virgo\'s deep-rooted presence in the material world.',
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    emoji: '⚖️',
    dateRange: 'Sep 23 – Oct 22',
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Venus',
    traits: ['Diplomatic', 'Fair', 'Social', 'Harmonious'],
    strengths: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded'],
    weaknesses: ['Indecisive', 'Avoids confrontations', 'Self-pity'],
    color: '#EC4899',
    luckyNumbers: [4, 6, 13, 24],
    compatibleSigns: ['gemini', 'aquarius', 'leo', 'sagittarius'],
    description: 'Libra is an air sign represented by the scales, an association reflecting Libra\'s fixation on balance and harmony. Libra is obsessed with symmetry and strives to create equilibrium in all areas of life.',
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    emoji: '🦂',
    dateRange: 'Oct 23 – Nov 21',
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    element: 'Water',
    modality: 'Fixed',
    rulingPlanet: 'Pluto',
    traits: ['Passionate', 'Intense', 'Mysterious', 'Resourceful'],
    strengths: ['Resourceful', 'Brave', 'Passionate', 'Stubborn'],
    weaknesses: ['Distrusting', 'Jealous', 'Secretive', 'Violent'],
    color: '#DC2626',
    luckyNumbers: [8, 11, 18, 22],
    compatibleSigns: ['cancer', 'pisces', 'virgo', 'capricorn'],
    description: 'Scorpio is one of the most misunderstood signs of the zodiac. Because of its incredible passion and power, Scorpio is often mistaken for a fire sign. In fact, Scorpio is a water sign that derives its strength from the psychic, emotional realm.',
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    emoji: '🏹',
    dateRange: 'Nov 22 – Dec 21',
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    element: 'Fire',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter',
    traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Free-spirited'],
    strengths: ['Generous', 'Idealistic', 'Great sense of humor'],
    weaknesses: ['Impatient', 'Promises more than can deliver', 'Tactless'],
    color: '#7C3AED',
    luckyNumbers: [3, 7, 9, 12],
    compatibleSigns: ['aries', 'leo', 'libra', 'aquarius'],
    description: 'Sagittarius is the last fire sign of the zodiac. Represented by the archer, Sagittarians are always on a quest for knowledge. They launch their many pursuits like blazing arrows, chasing after geographical, intellectual, and spiritual adventures.',
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    emoji: '🐐',
    dateRange: 'Dec 22 – Jan 19',
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    element: 'Earth',
    modality: 'Cardinal',
    rulingPlanet: 'Saturn',
    traits: ['Disciplined', 'Ambitious', 'Responsible', 'Traditional'],
    strengths: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
    weaknesses: ['Know-it-all', 'Unforgiving', 'Condescending', 'Expecting the worst'],
    color: '#6B7280',
    luckyNumbers: [4, 8, 13, 22],
    compatibleSigns: ['taurus', 'virgo', 'scorpio', 'pisces'],
    description: 'The last earth sign of the zodiac, Capricorn is represented by the sea goat, a mythological creature with the body of a goat and tail of a fish. Capricorns navigate both the material and emotional realms with determination.',
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    emoji: '🏺',
    dateRange: 'Jan 20 – Feb 18',
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    element: 'Air',
    modality: 'Fixed',
    rulingPlanet: 'Uranus',
    traits: ['Innovative', 'Independent', 'Humanitarian', 'Eccentric'],
    strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
    weaknesses: ['Runs from emotional expression', 'Temperamental', 'Uncompromising'],
    color: '#06B6D4',
    luckyNumbers: [4, 7, 11, 22],
    compatibleSigns: ['gemini', 'libra', 'aries', 'sagittarius'],
    description: 'Despite the "aqua" in its name, Aquarius is actually the last air sign of the zodiac. Innovative, progressive, and shamelessly revolutionary, Aquarius is represented by the water bearer.',
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    emoji: '🐟',
    dateRange: 'Feb 19 – Mar 20',
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    element: 'Water',
    modality: 'Mutable',
    rulingPlanet: 'Neptune',
    traits: ['Compassionate', 'Intuitive', 'Artistic', 'Dreamy'],
    strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle'],
    weaknesses: ['Fearful', 'Overly trusting', 'Sad', 'Desire to escape reality'],
    color: '#2563EB',
    luckyNumbers: [3, 9, 12, 15],
    compatibleSigns: ['cancer', 'scorpio', 'taurus', 'capricorn'],
    description: 'Pisces is the most intuitive, sensitive, and empathetic sign of the entire zodiac — and that\'s because it\'s the last of the signs. As the final sign, Pisces has absorbed every lesson — the joys and the pains, the hopes and the fears — learned by all of the other signs.',
  },
];

export const ZODIAC_ELEMENTS = ['Fire', 'Earth', 'Air', 'Water'] as const;
export const ZODIAC_MODALITIES = ['Cardinal', 'Fixed', 'Mutable'] as const;

export function getSignById(id: string): ZodiacSign | undefined {
  return ZODIAC_SIGNS.find(s => s.id === id);
}

export function getSignByName(name: string): ZodiacSign | undefined {
  return ZODIAC_SIGNS.find(s => s.name.toLowerCase() === name.toLowerCase());
}
