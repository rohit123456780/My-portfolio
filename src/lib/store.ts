
import { create } from 'zustand';

interface UIState {
  isBooted: boolean;
  setBooted: (val: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (val: boolean) => void;
  accentColor: string;
  setAccentColor: (val: string) => void;
  activeSection: string;
  setActiveSection: (val: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isBooted: false,
  setBooted: (val) => set({ isBooted: val }),
  terminalOpen: false,
  setTerminalOpen: (val) => set({ terminalOpen: val }),
  accentColor: '#00ff9f',
  setAccentColor: (val) => set({ accentColor: val }),
  activeSection: '01',
  setActiveSection: (val) => set({ activeSection: val }),
}));
