import { create } from 'zustand';

interface OnboardingState {
  fullName: string;
  birthDate: Date | null;
  birthTime: string;
  birthLocation: string;
  setFullName: (name: string) => void;
  setBirthDate: (date: Date | null) => void;
  setBirthTime: (time: string) => void;
  setBirthLocation: (location: string) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  fullName: '',
  birthDate: null,
  birthTime: '12:00',
  birthLocation: '',
  setFullName: (fullName) => set({ fullName }),
  setBirthDate: (birthDate) => set({ birthDate }),
  setBirthTime: (birthTime) => set({ birthTime }),
  setBirthLocation: (birthLocation) => set({ birthLocation }),
  resetOnboarding: () => set({ fullName: '', birthDate: null, birthTime: '12:00', birthLocation: '' }),
}));
