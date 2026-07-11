import { create } from 'zustand';

interface AuthState {
  user: { email: string; name: string } | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  login: (email: string, name?: string) => Promise<void>;
  register: (email: string, name: string) => Promise<void>;
  continueAsGuest: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isGuest: false,
  isLoading: false,

  login: async (email: string, name = 'Cosmic Traveler') => {
    set({ isLoading: true });
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      user: { email, name },
      isAuthenticated: true,
      isGuest: false,
      isLoading: false,
    });
  },

  register: async (email: string, name: string) => {
    set({ isLoading: true });
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      user: { email, name },
      isAuthenticated: true,
      isGuest: false,
      isLoading: false,
    });
  },

  continueAsGuest: () => {
    set({
      user: { email: 'guest@celestia.app', name: 'Guest' },
      isAuthenticated: true,
      isGuest: true,
      isLoading: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isGuest: false,
      isLoading: false,
    });
  },
}));
