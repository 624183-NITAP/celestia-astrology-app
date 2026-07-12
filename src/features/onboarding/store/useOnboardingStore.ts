import { create } from 'zustand';

interface PendingProfile {
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
}

interface OnboardingState {
  fullName: string;
  birthDate: Date | null;
  birthTime: string;
  birthLocation: string;
  pendingProfile: PendingProfile | null;
  onboardingComplete: boolean;
  setFullName: (name: string) => void;
  setBirthDate: (date: Date | null) => void;
  setBirthTime: (time: string) => void;
  setBirthLocation: (location: string) => void;
  setPendingProfile: (profile: PendingProfile) => void;
  setOnboardingComplete: (complete: boolean) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  fullName: '',
  birthDate: null,
  birthTime: '12:00',
  birthLocation: '',
  pendingProfile: null,
  onboardingComplete: false,
  setFullName: (fullName) => set({ fullName }),
  setBirthDate: (birthDate) => set({ birthDate }),
  setBirthTime: (birthTime) => set({ birthTime }),
  setBirthLocation: (birthLocation) => set({ birthLocation }),
  setPendingProfile: (pendingProfile) => set({ pendingProfile }),
  setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
  resetOnboarding: () => set({ fullName: '', birthDate: null, birthTime: '12:00', birthLocation: '', pendingProfile: null, onboardingComplete: false }),
}));
