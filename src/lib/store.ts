import { create } from 'zustand';

interface UIState {
  isBooted: boolean;
  setBooted: (val: boolean) => void;
  lowMotion: boolean;
  setLowMotion: (val: boolean) => void;
  accentColor: string;
  setAccentColor: (val: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (val: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isBooted: false,
  setBooted: (val) => set({ isBooted: val }),
  lowMotion: false,
  setLowMotion: (val) => set({ lowMotion: val }),
  accentColor: '#00C2FF',
  setAccentColor: (val) => set({ accentColor: val }),
  commandPaletteOpen: false,
  setCommandPaletteOpen: (val) => set({ commandPaletteOpen: val }),
}));
