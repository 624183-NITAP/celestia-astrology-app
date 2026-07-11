import { create } from 'zustand';

export interface UserProfile {
  name: string;
  birthDate: string; // ISO string
  birthTime: string; // HH:MM
  birthLocation: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
}

interface UserState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  updateProfile: (updates) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    })),
}));
