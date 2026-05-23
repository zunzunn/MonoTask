"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createDecoration, decorationCatalog } from "./gardenData";
import { GardenState } from "./types";

const initialFocusSapling = {
  active: false,
  startedAt: null,
  accumulatedSeconds: 0,
};

export const useGardenStore = create<GardenState>()(
  persist(
    (set, get) => ({
      mood: "serene",
      weather: "clear",
      focusSapling: initialFocusSapling,
      unlockedDecorations: [],
      creatureSeed: 0,
      setMood: (mood) => set({ mood }),
      setWeather: (weather) => set({ weather }),
      startFocusSession: () =>
        set((state) => ({
          focusSapling: {
            ...state.focusSapling,
            active: true,
            startedAt: Date.now(),
          },
        })),
      stopFocusSession: () => {
        get().tickFocusSession();
        set((state) => ({
          focusSapling: {
            ...state.focusSapling,
            active: false,
            startedAt: null,
          },
        }));
      },
      tickFocusSession: () =>
        set((state) => {
          if (!state.focusSapling.active || !state.focusSapling.startedAt) {
            return state;
          }

          const elapsed = Math.max(
            0,
            Math.floor((Date.now() - state.focusSapling.startedAt) / 1000),
          );

          return {
            focusSapling: {
              active: true,
              startedAt: Date.now(),
              accumulatedSeconds: state.focusSapling.accumulatedSeconds + elapsed,
            },
          };
        }),
      unlockDecoration: (completedSteps) =>
        set((state) => {
          const owned = new Set(state.unlockedDecorations.map((item) => item.kind));
          const next = decorationCatalog
            .filter((item) => !owned.has(item.kind))
            .map((item) => createDecoration(item.kind, completedSteps))
            .filter((item): item is NonNullable<typeof item> => Boolean(item));

          if (next.length === 0) return state;

          return {
            unlockedDecorations: [...state.unlockedDecorations, ...next],
          };
        }),
      nudgeCreature: () =>
        set((state) => ({ creatureSeed: state.creatureSeed + 1 })),
    }),
    {
      name: "motanos.garden",
      partialize: (state) => ({
        mood: state.mood,
        weather: state.weather,
        focusSapling: {
          ...state.focusSapling,
          active: false,
          startedAt: null,
        },
        unlockedDecorations: state.unlockedDecorations,
        creatureSeed: state.creatureSeed,
      }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
