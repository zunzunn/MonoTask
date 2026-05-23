import { DecorationKind, GardenDecoration, GardenMood, WeatherMode } from "./types";

export const moodCopy: Record<GardenMood, string> = {
  serene: "The garden is breathing slowly.",
  dreamy: "Small magic gathers around finished things.",
  rainy: "Everything feels softer after effort.",
  starlit: "Quiet work is glowing under the stars.",
};

export const weatherOptions: { label: string; value: WeatherMode }[] = [
  { label: "Clear", value: "clear" },
  { label: "Mist", value: "mist" },
  { label: "Drizzle", value: "drizzle" },
  { label: "Aurora", value: "aurora" },
];

export const moodOptions: { label: string; value: GardenMood }[] = [
  { label: "Serene", value: "serene" },
  { label: "Dreamy", value: "dreamy" },
  { label: "Rainy", value: "rainy" },
  { label: "Starlit", value: "starlit" },
];

export const decorationCatalog: {
  kind: DecorationKind;
  label: string;
  threshold: number;
  x: number;
  y: number;
}[] = [
  { kind: "lantern", label: "Moon Lantern", threshold: 2, x: 26, y: 58 },
  { kind: "mushroom", label: "Glow Mushrooms", threshold: 4, x: 72, y: 64 },
  { kind: "bridge", label: "Tiny Bridge", threshold: 7, x: 52, y: 72 },
  { kind: "windbell", label: "Glass Windbell", threshold: 10, x: 86, y: 48 },
];

export const creatureNames = ["Momo", "Pip", "Nara", "Bun"];

export function createDecoration(
  kind: DecorationKind,
  completedSteps: number,
): GardenDecoration | null {
  const item = decorationCatalog.find((decoration) => decoration.kind === kind);

  if (!item || completedSteps < item.threshold) return null;

  return {
    id: `${kind}-${item.threshold}`,
    kind,
    label: item.label,
    unlockedAt: item.threshold,
    x: item.x,
    y: item.y,
  };
}

export const fireflySeeds = Array.from({ length: 18 }, (_, index) => ({
  id: `firefly-${index}`,
  delay: (index % 7) * 0.45,
  duration: 4.8 + (index % 5) * 0.7,
  left: 6 + ((index * 17) % 88),
  top: 12 + ((index * 23) % 64),
  scale: 0.55 + (index % 4) * 0.16,
}));

export const starSeeds = Array.from({ length: 24 }, (_, index) => ({
  id: `star-${index}`,
  left: 3 + ((index * 29) % 94),
  top: 5 + ((index * 13) % 42),
  delay: (index % 8) * 0.35,
}));
