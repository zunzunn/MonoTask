export type GardenMood = "serene" | "dreamy" | "rainy" | "starlit";

export type WeatherMode = "clear" | "mist" | "drizzle" | "aurora";

export type DecorationKind = "lantern" | "bridge" | "mushroom" | "windbell";

export type GardenDecoration = {
  id: string;
  kind: DecorationKind;
  label: string;
  unlockedAt: number;
  x: number;
  y: number;
};

export type FocusSapling = {
  active: boolean;
  startedAt: number | null;
  accumulatedSeconds: number;
};

export type GardenState = {
  mood: GardenMood;
  weather: WeatherMode;
  focusSapling: FocusSapling;
  unlockedDecorations: GardenDecoration[];
  creatureSeed: number;
  setMood: (mood: GardenMood) => void;
  setWeather: (weather: WeatherMode) => void;
  startFocusSession: () => void;
  stopFocusSession: () => void;
  tickFocusSession: () => void;
  unlockDecoration: (completedSteps: number) => void;
  nudgeCreature: () => void;
};

export type PlantStage = "sprout" | "bud" | "bloom" | "tree";

export type GardenPlant = {
  id: string;
  title: string;
  icon: string;
  progress: number;
  completedSteps: number;
  totalSteps: number;
  stage: PlantStage;
  x: number;
  y: number;
  hue: number;
};
