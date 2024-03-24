import { create } from "zustand";

type Store = {
  interval: string;
  setTrendingInterval: (interval: string) => void;
};

export const useTrendingIntervalStore = create<Store>((set) => ({
  interval: "72",
  setTrendingInterval: (interval) => set({ interval }),
}));
