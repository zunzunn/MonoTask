"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import AppNav from "@/components/AppNav";
import { FocusTask, useTaskStore } from "@/components/taskStore";
import {
  creatureNames,
  fireflySeeds,
  moodCopy,
  moodOptions,
  starSeeds,
  weatherOptions,
} from "./gardenData";
import { useGardenStore } from "./gardenStore";
import { GardenDecoration, GardenPlant, PlantStage, WeatherMode } from "./types";

const WORLD_MIN_WIDTH = 1320;

function stageFor(progress: number): PlantStage {
  if (progress >= 1) return "tree";
  if (progress >= 0.66) return "bloom";
  if (progress >= 0.33) return "bud";
  return "sprout";
}

function buildPlants(tasks: FocusTask[]): GardenPlant[] {
  return tasks.map((task, index) => {
    const totalSteps = Math.max(task.steps.length, 1);
    const completedSteps = Math.min(task.completed, totalSteps);
    const progress = task.steps.length === 0 ? 0.12 : completedSteps / totalSteps;

    return {
      id: task.id,
      title: task.title,
      icon: task.icon,
      progress,
      completedSteps,
      totalSteps,
      stage: stageFor(progress),
      x: 12 + ((index * 19) % 78),
      y: 50 + ((index * 11) % 23),
      hue: 105 + ((index * 37) % 92),
    };
  });
}

function useIsNight() {
  const [hour, setHour] = useState(12);

  useEffect(() => {
    const update = () => setHour(new Date().getHours());
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return hour < 6 || hour >= 18;
}

function useViewportWidth() {
  const [width, setWidth] = useState(390);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

function Sky({ weather, isNight }: { weather: WeatherMode; isNight: boolean }) {
  const weatherGlow = {
    clear: "from-[#ffe9b4] via-[#bfe9e0] to-[#a9d9f7]",
    mist: "from-[#f4eadc] via-[#cfded8] to-[#c7d2e6]",
    drizzle: "from-[#c5d4d8] via-[#9fbac2] to-[#788da9]",
    aurora: "from-[#17233c] via-[#294a4a] to-[#768553]",
  }[weather];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ backgroundPosition: ["0% 40%", "100% 60%", "0% 40%"] }}
        className={`absolute inset-0 bg-gradient-to-br ${isNight ? "from-[#111a31] via-[#24445a] to-[#74634a]" : weatherGlow}`}
        style={{ backgroundSize: "180% 180%" }}
        transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={{ opacity: [0.24, 0.48, 0.24], scale: [1, 1.06, 1] }}
        className="absolute left-[8%] top-[8%] h-36 w-36 rounded-full bg-[#fff8cf]/80 blur-2xl md:h-52 md:w-52"
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      {isNight &&
        starSeeds.map((star) => (
          <motion.span
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.7, 1.2, 0.7] }}
            className="absolute h-1 w-1 rounded-full bg-[#fff7c7] shadow-[0_0_14px_rgba(255,247,199,0.9)]"
            key={star.id}
            style={{ left: `${star.left}%`, top: `${star.top}%` }}
            transition={{
              delay: star.delay,
              duration: 2.8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      {(weather === "mist" || weather === "drizzle") && (
        <motion.div
          animate={{ x: ["-8%", "8%", "-8%"] }}
          className="absolute inset-x-[-10%] top-[26%] h-52 rounded-full bg-white/20 blur-3xl"
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />
      )}
      {weather === "aurora" && (
        <motion.div
          animate={{ opacity: [0.22, 0.55, 0.22], skewX: [-8, 8, -8] }}
          className="absolute left-[20%] top-0 h-[56%] w-[70%] rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(160,255,202,0.58),rgba(111,214,255,0.18),transparent_68%)] blur-xl"
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        />
      )}
    </div>
  );
}

function Fireflies() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {fireflySeeds.map((seed) => (
        <motion.span
          animate={{
            opacity: [0, 0.95, 0.35, 0.85, 0],
            x: [0, 16, -10, 22, 0],
            y: [0, -18, -28, -8, 0],
          }}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#fff6a8] shadow-[0_0_18px_6px_rgba(255,234,133,0.38)]"
          key={seed.id}
          style={{
            left: `${seed.left}%`,
            top: `${seed.top}%`,
            scale: seed.scale,
          }}
          transition={{
            delay: seed.delay,
            duration: seed.duration,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

function DistantHills({ depth }: { depth: "back" | "front" | "mid" }) {
  const back = depth === "back";
  const mid = depth === "mid";

  return (
    <motion.div
      animate={{ x: back ? [0, -18, 0] : mid ? [0, 12, 0] : [0, 24, 0] }}
      className={`absolute left-[-14%] w-[128%] rounded-[52%_48%_0_0] ${
        back
          ? "bottom-[25%] h-64 bg-[#5f9f87]/24 blur-[2px]"
          : mid
            ? "bottom-[20%] h-56 bg-gradient-to-t from-[#4e876f]/30 to-[#9fc99b]/24 blur-[1px]"
            : "bottom-[14%] h-64 bg-gradient-to-t from-[#5d9b65]/48 via-[#8ebf74]/38 to-[#d8dd9d]/30"
      }`}
      transition={{
        duration: back ? 28 : mid ? 25 : 22,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
}

function TreeCluster({ left, bottom, scale = 1 }: { left: string; bottom: string; scale?: number }) {
  return (
    <motion.div
      animate={{ rotate: [-1.2, 1.5, -1.2], y: [0, -4, 0] }}
      className="absolute origin-bottom"
      style={{ left, bottom, scale }}
      transition={{ duration: 5.8, ease: "easeInOut", repeat: Infinity }}
    >
      <div className="absolute left-1/2 top-14 h-28 w-8 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#9d6d45] to-[#61432d]" />
      <div className="relative h-36 w-40">
        <div className="absolute left-8 top-5 h-28 w-28 rounded-[46%_54%_50%_50%] bg-[#5fa56a] shadow-[inset_-18px_-22px_0_rgba(37,93,57,0.18),0_16px_34px_rgba(37,93,57,0.22)]" />
        <div className="absolute left-0 top-14 h-24 w-24 rounded-full bg-[#77ba73]" />
        <div className="absolute right-0 top-13 h-24 w-24 rounded-full bg-[#4f9560]" />
        <div className="absolute left-12 top-0 h-24 w-24 rounded-full bg-[#8ccb78]" />
      </div>
    </motion.div>
  );
}

function PlantSprite({ plant }: { plant: GardenPlant }) {
  const height = 42 + plant.progress * 78;
  const glow = `hsla(${plant.hue}, 68%, 72%, ${0.24 + plant.progress * 0.34})`;

  return (
    <motion.button
      aria-label={`${plant.title}, ${Math.round(plant.progress * 100)} percent grown`}
      className="group absolute z-40 flex -translate-x-1/2 -translate-y-full flex-col items-center outline-none"
      initial={{ opacity: 0, scale: 0.72, y: 16 }}
      style={{ left: `${plant.x}%`, top: `${plant.y}%` }}
      title={plant.title}
      type="button"
      whileHover={{ scale: 1.06, y: -8 }}
      whileTap={{ scale: 0.97 }}
      animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
      transition={{ duration: 0.7, y: { duration: 4.6, repeat: Infinity, ease: "easeInOut" } }}
    >
      <motion.div
        animate={{ opacity: [0.55, 0.95, 0.55], scale: [0.86, 1.08, 0.86] }}
        className="absolute top-4 h-20 w-20 rounded-full blur-xl"
        style={{ backgroundColor: glow }}
        transition={{ duration: 3.4, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="relative flex items-end justify-center" style={{ height }}>
        {plant.stage === "tree" ? (
          <div className="relative h-32 w-28">
            <div className="absolute bottom-0 left-1/2 h-20 w-5 -translate-x-1/2 rounded-full bg-[#9b6941]" />
            <div
              className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-[45%_55%_48%_52%] shadow-[inset_-14px_-16px_0_rgba(39,91,55,0.2)]"
              style={{ backgroundColor: `hsl(${plant.hue}, 46%, 58%)` }}
            />
            <div className="absolute left-1 top-10 h-16 w-16 rounded-full bg-[#b7d97f]" />
            <div className="absolute right-0 top-11 h-16 w-16 rounded-full bg-[#74ad68]" />
          </div>
        ) : (
          <div className="relative flex h-full w-24 items-end justify-center">
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              className="h-[72%] w-2 origin-bottom rounded-full bg-gradient-to-b from-[#7fb76b] to-[#47774b]"
              transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div
              animate={{ rotate: [-10, 5, -10] }}
              className="absolute bottom-[34%] left-7 h-8 w-12 rounded-[90%_20%_80%_30%] bg-[#83bd72]"
              transition={{ duration: 4.2, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div
              animate={{ rotate: [8, -6, 8] }}
              className="absolute bottom-[44%] right-7 h-8 w-12 rounded-[20%_90%_30%_80%] bg-[#6fab69]"
              transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
            />
            {plant.stage !== "sprout" && (
              <motion.div
                animate={{ scale: [0.88, 1.08, 0.88], rotate: [-4, 4, -4] }}
                className="absolute top-2 h-11 w-11 rounded-[60%_40%_62%_38%] bg-gradient-to-br from-[#ffeaa8] to-[#ffa9a1] shadow-[0_0_24px_rgba(255,185,132,0.45)]"
                transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
              />
            )}
          </div>
        )}
      </div>
      <div className="mt-2 rounded-full border border-white/45 bg-white/58 px-3 py-1 text-[11px] font-bold text-[#31513d] opacity-0 shadow-[0_8px_22px_rgba(49,81,61,0.15)] backdrop-blur-md transition duration-300 group-hover:opacity-100">
        {plant.completedSteps}/{plant.totalSteps} - {plant.title}
      </div>
    </motion.button>
  );
}

function FocusTree({ seconds, active }: { seconds: number; active: boolean }) {
  const progress = Math.min(seconds / 1500, 1);
  const height = 54 + progress * 108;

  return (
    <motion.div
      className="absolute left-[47%] top-[56%] z-50 flex -translate-x-1/2 -translate-y-full flex-col items-center"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
    >
      <motion.div
        animate={{ opacity: active ? [0.35, 0.78, 0.35] : 0.28, scale: [0.88, 1.08, 0.88] }}
        className="absolute bottom-4 h-32 w-32 rounded-full bg-[#bdf5a4]/45 blur-2xl"
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex w-32 items-end justify-center" style={{ height }}>
        <div className="h-[76%] w-4 rounded-full bg-gradient-to-b from-[#c6945c] to-[#68452d]" />
        <div className="absolute bottom-[42%] left-8 h-11 w-16 rounded-[90%_24%_78%_36%] bg-[#80bc6b]" />
        <div className="absolute bottom-[53%] right-7 h-11 w-16 rounded-[24%_90%_36%_78%] bg-[#609e62]" />
        <motion.div
          animate={{ rotate: [-2, 2, -2], scale: [0.98, 1.03, 0.98] }}
          className="absolute top-0 h-20 w-24 rounded-[48%_52%_45%_55%] bg-gradient-to-br from-[#b9dc78] to-[#5f9e64] shadow-[inset_-12px_-16px_0_rgba(51,91,57,0.18)]"
          transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
      <span className="rounded-full border border-[#fff7d7]/70 bg-[#fff8dc]/72 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#6d6334] shadow-[0_8px_24px_rgba(119,100,47,0.18)] backdrop-blur-md">
        Focus sapling
      </span>
    </motion.div>
  );
}

function DecorationSprite({ decoration }: { decoration: GardenDecoration }) {
  const common =
    "absolute z-40 -translate-x-1/2 -translate-y-full drop-shadow-[0_18px_18px_rgba(44,70,56,0.18)]";

  return (
    <motion.div
      animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }}
      className={common}
      initial={{ opacity: 0, scale: 0.6 }}
      style={{ left: `${decoration.x}%`, top: `${decoration.y}%` }}
      transition={{ duration: 4.2, ease: "easeInOut", repeat: Infinity }}
      whileHover={{ scale: 1.08 }}
    >
      {decoration.kind === "lantern" && (
        <div className="relative h-24 w-16">
          <div className="absolute left-1/2 top-0 h-16 w-1 -translate-x-1/2 bg-[#6a4a36]" />
          <div className="absolute bottom-0 left-1/2 h-16 w-12 -translate-x-1/2 rounded-[48%] border border-[#fff2b9] bg-[#ffd978]/80 shadow-[0_0_34px_rgba(255,215,120,0.75)]" />
        </div>
      )}
      {decoration.kind === "mushroom" && (
        <div className="flex items-end gap-1">
          <div className="h-8 w-4 rounded-b-full bg-[#fff4db]" />
          <div className="-ml-4 mb-6 h-8 w-12 rounded-t-full bg-[#ff9d88] shadow-[0_0_22px_rgba(255,157,136,0.5)]" />
          <div className="h-6 w-3 rounded-b-full bg-[#fff4db]" />
          <div className="-ml-3 mb-5 h-6 w-9 rounded-t-full bg-[#ffd174]" />
        </div>
      )}
      {decoration.kind === "bridge" && (
        <div className="h-12 w-36 rounded-t-full border-t-[14px] border-[#b8875a] bg-[#d7a674]/50 shadow-[inset_0_8px_0_rgba(255,255,255,0.18)]" />
      )}
      {decoration.kind === "windbell" && (
        <div className="relative h-24 w-16">
          <div className="absolute left-1/2 top-0 h-14 w-px bg-white/80" />
          <div className="absolute left-1/2 top-12 h-9 w-9 -translate-x-1/2 rounded-b-full rounded-t-lg border border-white/70 bg-white/35 backdrop-blur-md" />
          <div className="absolute bottom-0 left-1/2 h-7 w-px bg-[#fff7d1]" />
        </div>
      )}
    </motion.div>
  );
}

function WaterPond() {
  return (
    <div className="absolute left-[34%] top-[69%] z-20 h-40 w-[36rem] -translate-x-1/2 overflow-hidden rounded-[50%] border border-white/35 bg-gradient-to-br from-[#9ddbd8]/72 via-[#74bec9]/66 to-[#4f86a5]/76 shadow-[inset_0_20px_34px_rgba(255,255,255,0.28),0_20px_38px_rgba(30,70,70,0.22)]">
      <div className="absolute inset-[-18px] rounded-[50%] border-[18px] border-[#95c871]/34 blur-[10px]" />
      <div className="absolute inset-0 rounded-[50%] bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,210,0.36),transparent_24%),radial-gradient(circle_at_70%_70%,rgba(23,90,118,0.22),transparent_44%)]" />
      {[0, 1, 2].map((index) => (
        <motion.div
          animate={{ opacity: [0, 0.55, 0], scale: [0.5, 1.25, 1.55] }}
          className="absolute left-1/2 top-1/2 h-14 w-52 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/60"
          key={index}
          transition={{
            delay: index * 1.2,
            duration: 4.4,
            ease: "easeOut",
            repeat: Infinity,
          }}
        />
      ))}
      <motion.div
        animate={{ x: ["-15%", "15%", "-15%"] }}
        className="absolute inset-y-4 left-0 w-[140%] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.28),transparent)]"
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Creature({ seed }: { seed: number }) {
  const creature = creatureNames[seed % creatureNames.length];

  return (
    <motion.button
      aria-label={`${creature} is visiting the garden`}
      className="absolute left-[77%] top-[63%] z-50 flex -translate-x-1/2 -translate-y-full flex-col items-center"
      initial={{ opacity: 0, x: 40, scale: 0.8 }}
      animate={{ opacity: 1, x: [0, -10, 8, 0], y: [0, -7, 0] }}
      transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
      type="button"
      whileHover={{ scale: 1.08, rotate: -2 }}
    >
      <div className="relative h-20 w-24">
        <div className="absolute left-4 top-0 h-10 w-7 -rotate-12 rounded-full bg-[#d9b28a]" />
        <div className="absolute right-4 top-0 h-10 w-7 rotate-12 rounded-full bg-[#d9b28a]" />
        <div className="absolute bottom-0 h-16 w-24 rounded-[48%] bg-gradient-to-b from-[#f0d1a5] to-[#c99165] shadow-[inset_-10px_-10px_0_rgba(115,75,48,0.12)]" />
        <div className="absolute left-7 top-9 h-2 w-2 rounded-full bg-[#443629]" />
        <div className="absolute right-7 top-9 h-2 w-2 rounded-full bg-[#443629]" />
        <div className="absolute left-1/2 top-12 h-2 w-3 -translate-x-1/2 rounded-full bg-[#8f6251]" />
      </div>
      <span className="mt-1 rounded-full bg-white/58 px-3 py-1 text-[11px] font-bold text-[#6a5037] backdrop-blur-md">
        {creature}
      </span>
    </motion.button>
  );
}

function GardenWorld({
  decorations,
  focusActive,
  focusSeconds,
  plants,
  weather,
}: {
  decorations: GardenDecoration[];
  focusActive: boolean;
  focusSeconds: number;
  plants: GardenPlant[];
  weather: WeatherMode;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <DistantHills depth="back" />
      <DistantHills depth="mid" />
      <TreeCluster bottom="24%" left="4%" scale={0.72} />
      <TreeCluster bottom="26%" left="84%" scale={0.86} />
      <DistantHills depth="front" />
      <div className="absolute inset-x-[-16%] bottom-[26%] h-48 bg-gradient-to-t from-[#224239]/0 via-[#d7e7bc]/18 to-transparent blur-2xl" />
      <div className="absolute inset-x-[-22%] bottom-[-18%] h-[54%] rounded-[54%_46%_0_0] bg-gradient-to-t from-[#4c7f45] via-[#83b85f] to-[#dce49c] shadow-[inset_0_38px_75px_rgba(255,255,207,0.22),inset_0_-48px_75px_rgba(36,67,42,0.24),0_-34px_72px_rgba(199,226,145,0.12)]" />
      <div className="absolute inset-x-[-18%] bottom-[-8%] h-[39%] rounded-[50%_50%_0_0] bg-[radial-gradient(circle_at_24%_18%,rgba(255,243,158,0.26),transparent_21%),radial-gradient(circle_at_52%_8%,rgba(243,232,142,0.20),transparent_18%),radial-gradient(circle_at_78%_22%,rgba(108,180,100,0.32),transparent_22%),linear-gradient(180deg,rgba(223,230,141,0.50),rgba(87,139,72,0.38))]" />
      <div className="absolute inset-x-[-8%] bottom-0 h-[31%] opacity-35 [background-image:radial-gradient(circle_at_16px_20px,rgba(255,255,220,0.28)_0_1px,transparent_1.5px),radial-gradient(circle_at_54px_42px,rgba(52,94,54,0.24)_0_1.2px,transparent_1.8px)] [background-size:72px_58px]" />
      <div className="absolute inset-x-[-12%] bottom-[25%] h-40 bg-gradient-to-b from-transparent via-[#d9e8b8]/16 to-transparent blur-3xl" />
      <WaterPond />
      {decorations.map((decoration) => (
        <DecorationSprite decoration={decoration} key={decoration.id} />
      ))}
      {plants.map((plant) => (
        <PlantSprite key={plant.id} plant={plant} />
      ))}
      <FocusTree active={focusActive} seconds={focusSeconds} />
      {weather === "drizzle" &&
        Array.from({ length: 28 }, (_, index) => (
          <motion.span
            animate={{ y: [0, 170], opacity: [0, 0.42, 0] }}
            className="absolute top-[-10%] z-50 h-10 w-px rotate-12 rounded-full bg-white/50"
            key={index}
            style={{ left: `${(index * 11) % 100}%` }}
            transition={{
              delay: (index % 9) * 0.18,
              duration: 1.6,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        ))}
    </div>
  );
}

function FloatingPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`border border-white/45 bg-white/42 shadow-[0_24px_80px_rgba(33,59,48,0.18)] backdrop-blur-2xl ${className}`}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function GardenExperience() {
  const { tasks } = useTaskStore();
  const {
    creatureSeed,
    focusSapling,
    mood,
    nudgeCreature,
    setMood,
    setWeather,
    startFocusSession,
    stopFocusSession,
    tickFocusSession,
    unlockDecoration,
    unlockedDecorations,
    weather,
  } = useGardenStore();
  const prefersReducedMotion = useReducedMotion();
  const isNight = useIsNight();
  const viewportWidth = useViewportWidth();
  const worldWidth = Math.max(viewportWidth, WORLD_MIN_WIDTH);
  const dragX = useMotionValue(0);
  const panelX = useTransform(dragX, [-520, 0], [-18, 18]);

  const plants = useMemo(() => buildPlants(tasks), [tasks]);
  const completedSteps = useMemo(
    () => tasks.reduce((total, task) => total + Math.min(task.completed, task.steps.length), 0),
    [tasks],
  );
  const focusSeconds = focusSapling.accumulatedSeconds;
  const focusMinutes = Math.floor(focusSeconds / 60);

  useEffect(() => {
    unlockDecoration(completedSteps);
  }, [completedSteps, unlockDecoration]);

  useEffect(() => {
    if (!focusSapling.active) return;
    const interval = window.setInterval(tickFocusSession, 1000);
    return () => window.clearInterval(interval);
  }, [focusSapling.active, tickFocusSession]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = window.setInterval(nudgeCreature, 42_000);
    return () => window.clearInterval(interval);
  }, [nudgeCreature, prefersReducedMotion]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#14251f] text-[#21352a]">
      <AppNav />
      <main className="relative h-[calc(100vh-73px)] min-h-[720px] overflow-hidden md:min-h-[760px]">
        <Sky isNight={isNight || mood === "starlit"} weather={weather} />
        <Fireflies />

        <motion.div
          className="absolute inset-x-0 top-5 z-50 mx-auto flex w-[calc(100%-24px)] max-w-5xl items-center justify-between gap-3 px-1 md:top-7"
          style={{ x: panelX }}
        >
          <FloatingPanel className="rounded-[2rem] px-4 py-3 md:px-5">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#5d765c]">
              MotAnos Garden
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-[-0.04em] text-[#203b2d] md:text-4xl">
              A living place for finished moments.
            </h1>
          </FloatingPanel>
          <FloatingPanel className="hidden rounded-full px-4 py-3 text-sm font-bold text-[#31513d] md:block">
            Drag the world
          </FloatingPanel>
        </motion.div>

        <motion.section
          className="absolute left-0 top-0 h-full"
          drag={prefersReducedMotion ? false : "x"}
          dragConstraints={{ left: Math.min(0, viewportWidth - worldWidth), right: 0 }}
          dragElastic={0.08}
          style={{ width: worldWidth, x: dragX }}
          whileTap={{ cursor: "grabbing" }}
        >
          <GardenWorld
            decorations={unlockedDecorations}
            focusActive={focusSapling.active}
            focusSeconds={focusSeconds}
            plants={plants}
            weather={weather}
          />
          <Creature seed={creatureSeed} />
        </motion.section>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-48 bg-gradient-to-t from-[#1c2c24]/52 to-transparent" />

        <div className="absolute inset-x-3 bottom-4 z-50 grid gap-3 md:inset-x-auto md:bottom-7 md:left-7 md:w-[360px]">
          <FloatingPanel className="rounded-[2rem] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d7b53]">
                  Ambience
                </p>
                <p className="mt-1 text-lg font-black tracking-tight text-[#203b2d]">
                  {moodCopy[mood]}
                </p>
              </div>
              <motion.span
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff4bc]/70 text-2xl shadow-[0_0_28px_rgba(255,231,139,0.48)]"
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span
                  className="material-symbols-outlined text-[26px]"
                  style={{
                    fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  local_florist
                </span>
              </motion.span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {moodOptions.map((option) => (
                <button
                  className={`rounded-full px-3 py-2 text-xs font-black transition duration-300 ${
                    mood === option.value
                      ? "bg-[#315d43] text-[#fff9df] shadow-[0_10px_24px_rgba(49,93,67,0.25)]"
                      : "bg-white/48 text-[#39563f] hover:bg-white/70"
                  }`}
                  key={option.value}
                  onClick={() => setMood(option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {weatherOptions.map((option) => (
                <button
                  className={`rounded-full px-3 py-2 text-xs font-black transition duration-300 ${
                    weather === option.value
                      ? "bg-[#ffefb0] text-[#66552a] shadow-[0_10px_24px_rgba(153,124,44,0.18)]"
                      : "bg-white/38 text-[#49604c] hover:bg-white/70"
                  }`}
                  key={option.value}
                  onClick={() => setWeather(option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FloatingPanel>
        </div>

        <div className="absolute bottom-4 right-3 z-50 w-[calc(100%-24px)] md:bottom-7 md:right-7 md:w-[330px]">
          <FloatingPanel className="rounded-[2rem] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d7b53]">
                  Focus growth
                </p>
                <p className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#203b2d]">
                  {focusMinutes}m nourished
                </p>
              </div>
              <button
                className="rounded-full bg-[#315d43] px-4 py-3 text-sm font-black text-[#fff9df] shadow-[0_16px_34px_rgba(49,93,67,0.24)] transition hover:-translate-y-0.5 hover:bg-[#264935]"
                onClick={focusSapling.active ? stopFocusSession : startFocusSession}
                type="button"
              >
                {focusSapling.active ? "Rest" : "Grow"}
              </button>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#dce9cc]/70">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#7cb963] via-[#d5d76d] to-[#fff0a6] shadow-[0_0_20px_rgba(213,215,109,0.5)]"
                animate={{ width: `${Math.min((focusSeconds / 1500) * 100, 100)}%` }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#4f6a50]">
              <span>{completedSteps} task petals grown</span>
              <span>{unlockedDecorations.length} decor unlocked</span>
            </div>
          </FloatingPanel>
        </div>
      </main>
    </div>
  );
}
