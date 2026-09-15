import { create } from "zustand";

interface UiState {
  menuOpen: boolean;
  activeSection: string;
  scrollY: number;
  toggleMenu: () => void;
  closeMenu: () => void;
  setActiveSection: (id: string) => void;
  setScrollY: (value: number) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  menuOpen: false,
  activeSection: "",
  scrollY: 0,
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
  setActiveSection: (id) => set({ activeSection: id }),
  setScrollY: (value) => set({ scrollY: value }),
}));