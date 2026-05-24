"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AppNav from "@/components/AppNav";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const glowGreen = "rgba(74,124,89,0.15)";

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`rounded-3xl border border-[#e4e0d8] bg-white/85 p-6 shadow-[0_14px_45px_rgba(46,50,48,0.07)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_55px_rgba(46,50,48,0.10)] md:p-7 ${className}`}
      variants={cardVariants}
      whileHover={{ y: -2 }}
    >
      {children}
    </motion.div>
  );
}

function SectionTag({ text }: { text: string }) {
  return (
    <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#9b704f]">
      {text}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-semibold tracking-tight text-[#2e3230] md:text-3xl"
      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
    >
      {children}
    </h2>
  );
}

function ToggleSwitch({
  active,
  onToggle,
  label,
}: {
  active: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      className="flex items-center gap-3"
      onClick={onToggle}
      type="button"
    >
      <div
        className={`relative h-7 w-12 rounded-full transition-all duration-300 ${
          active
            ? "bg-[#4a7c59] shadow-[0_0_12px_rgba(74,124,89,0.35)]"
            : "bg-[#d4ccbf]"
        }`}
      >
        <motion.div
          animate={{ x: active ? 20 : 2 }}
          className="absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow-sm"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      <span className="text-sm font-semibold text-[#4a4e4a]">{label}</span>
    </button>
  );
}

function GlowToggle({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className={`relative h-7 w-12 rounded-full transition-all duration-300 ${
        active
          ? "bg-[#4a7c59] shadow-[0_0_16px_rgba(74,124,89,0.45)]"
          : "bg-[#d4ccbf]"
      }`}
      onClick={onToggle}
      type="button"
    >
      <motion.div
        animate={{ x: active ? 20 : 2 }}
        className="absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow-sm"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

function SliderControl({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = "",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#4a4e4a]">{label}</span>
        <span className="text-xs font-bold text-[#74796e]">
          {value}
          {unit}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#e4e0d8]">
        <motion.div
          animate={{ width: `${pct}%` }}
          className="h-full rounded-full bg-[#4a7c59]"
          initial={{ width: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <input
          className="absolute inset-0 w-full cursor-pointer opacity-0"
          max={max}
          min={min}
          onChange={(e) => onChange(Number(e.target.value))}
          type="range"
          value={value}
        />
      </div>
    </div>
  );
}

function CircularProgress({
  value,
  label,
  sublabel,
}: {
  value: number;
  label: string;
  sublabel: string;
}) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            fill="none"
            r={r}
            stroke="#e4e0d8"
            strokeWidth="4"
          />
          <motion.circle
            animate={{ strokeDashoffset: offset }}
            cx="40"
            cy="40"
            fill="none"
            r={r}
            stroke="#4a7c59"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            strokeLinecap="round"
            strokeWidth="4"
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <span
          className="absolute text-lg font-bold text-[#2e3230]"
          style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
        >
          {label}
        </span>
      </div>
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#74796e]">
        {sublabel}
      </span>
    </div>
  );
}

const accentColors = [
  { name: "Forest", value: "#4a7c59" },
  { name: "Sage", value: "#78a886" },
  { name: "Terracotta", value: "#9b704f" },
  { name: "Slate", value: "#6b6358" },
  { name: "Ocean", value: "#4a7c8a" },
];

const pomodoroOptions = [15, 25, 30, 45, 60];
const breakOptions = [5, 10, 15, 20, 30];

type ThemeMode = "light" | "dark" | "amoled";

const rankTitles = [
  "Focus Apprentice",
  "Mindful Beginner",
  "Flow Seeker",
  "Discipline Walker",
  "Stillness Student",
  "Calm Architect",
  "Focus Artisan",
  "Deep Worker",
  "Intentional Being",
  "Concentration Sage",
  "Flow Master",
  "Focus Architect",
  "Mindfulness Virtuoso",
  "Zen Commander",
  "Clarity Champion",
];

export default function SettingsPage() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [accentColor, setAccentColor] = useState(accentColors[0].value);
  const [blurIntensity, setBlurIntensity] = useState(75);
  const [animations, setAnimations] = useState(true);
  const [glassmorphism, setGlassmorphism] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [pomodoro, setPomodoro] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [autoBreaks, setAutoBreaks] = useState(true);
  const [dailyReset, setDailyReset] = useState("00:00");
  const [weekStartsMonday, setWeekStartsMonday] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  const [taskReminders, setTaskReminders] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [focusReminders, setFocusReminders] = useState(true);

  const [uiSounds, setUiSounds] = useState(true);
  const [rainAmbience, setRainAmbience] = useState(false);
  const [forestAmbience, setForestAmbience] = useState(false);
  const [focusAmbience, setFocusAmbience] = useState(false);
  const [masterVol, setMasterVol] = useState(80);
  const [musicVol, setMusicVol] = useState(60);
  const [effectsVol, setEffectsVol] = useState(75);

  return (
    <div
      className="min-h-screen bg-[#faf6f0] transition-colors duration-300"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
      }}
    >
      <AppNav />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-[#c8e8d0] opacity-10 blur-3xl" />
      </div>

      <motion.main
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 py-10 md:px-8 md:py-12"
        initial="hidden"
        variants={containerVariants}
      >
        {/* HERO PROFILE CARD */}
        <GlassCard>
          <div className="flex flex-col items-center gap-5 md:flex-row md:gap-7">
            <div className="relative shrink-0">
              <div
                className="absolute inset-0 rounded-full blur-xl"
                style={{ backgroundColor: accentColor, opacity: 0.25 }}
              />
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 bg-white/90 text-3xl shadow-lg md:h-28 md:w-28 md:text-4xl"
                style={{
                  borderColor: accentColor,
                  boxShadow: `0 0 30px ${glowGreen}`,
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    color: accentColor,
                    fontVariationSettings:
                      "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  psychology
                </span>
              </div>
              <div
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#4a7c59] text-[10px] font-bold text-white shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                12
              </div>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <SectionTag text="Profile" />
              <h1
                className="text-3xl font-semibold tracking-tight text-[#2e3230] md:text-4xl"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                Explorer
              </h1>
              <p
                className="mt-1 text-sm font-semibold md:text-base"
                style={{ color: accentColor }}
              >
                Level 12 — {rankTitles[11]}
              </p>
              <div className="mt-3 flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{
                      color: accentColor,
                      fontVariationSettings:
                        "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    local_fire_department
                  </span>
                  <span className="text-sm font-bold text-[#4a4e4a]">
                    7 day streak
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{
                      color: accentColor,
                      fontVariationSettings:
                        "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    stars
                  </span>
                  <span className="text-sm font-bold text-[#4a4e4a]">
                    1,240 XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* APPEARANCE */}
        <GlassCard>
          <SectionTag text="Appearance" />
          <SectionTitle>Look and feel</SectionTitle>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {(["light", "dark", "amoled"] as const).map((mode) => (
              <button
                className={`group relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-all duration-300 hover:-translate-y-1 ${
                  theme === mode
                    ? "shadow-[0_0_20px_rgba(74,124,89,0.15)]"
                    : "border-[#e4e0d8] bg-white/50 hover:bg-white/80"
                }`}
                key={mode}
                onClick={() => setTheme(mode)}
                style={{
                  borderColor: theme === mode ? accentColor : undefined,
                }}
                type="button"
              >
                {theme === mode && (
                  <motion.div
                    className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    layoutId="themeCheck"
                    style={{ backgroundColor: accentColor }}
                  >
                    ✓
                  </motion.div>
                )}
                <span
                  className="material-symbols-outlined mb-2 block text-xl"
                  style={{
                    color: theme === mode ? accentColor : "#6b6358",
                    fontVariationSettings:
                      "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  {mode === "light"
                    ? "light_mode"
                    : mode === "dark"
                      ? "dark_mode"
                      : "nights_stay"}
                </span>
                <p className="text-sm font-bold capitalize text-[#2e3230]">
                  {mode === "amoled" ? "AMOLED" : mode}
                </p>
                <p className="mt-0.5 text-xs text-[#74796e]">
                  {mode === "light"
                    ? "Warm and soft"
                    : mode === "dark"
                      ? "Easy on the eyes"
                      : "Deep contrast"}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#4a4e4a]">
                Accent color
              </p>
              <div className="flex flex-wrap gap-3">
                {accentColors.map((c) => (
                  <button
                    className={`relative h-9 w-9 rounded-full transition-all duration-300 hover:scale-110 ${
                      accentColor === c.value ? "scale-110 ring-2 ring-offset-2" : ""
                    }`}
                    key={c.value}
                    onClick={() => setAccentColor(c.value)}
                    style={{
                      backgroundColor: c.value,
                      boxShadow:
                        accentColor === c.value
                          ? `0 0 16px ${c.value}60`
                          : undefined,
                    }}
                    title={c.name}
                    type="button"
                  >
                    {accentColor === c.value && (
                      <motion.span
                        className="absolute inset-0 flex items-center justify-center text-[11px] text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <SliderControl
              label="Blur intensity"
              max={100}
              min={20}
              onChange={setBlurIntensity}
              unit="%"
              value={blurIntensity}
            />

            <div className="flex flex-wrap gap-6">
              <ToggleSwitch
                active={animations}
                label="Animations"
                onToggle={() => setAnimations(!animations)}
              />
              <ToggleSwitch
                active={glassmorphism}
                label="Glassmorphism"
                onToggle={() => setGlassmorphism(!glassmorphism)}
              />
              <ToggleSwitch
                active={reduceMotion}
                label="Reduce motion"
                onToggle={() => setReduceMotion(!reduceMotion)}
              />
            </div>
          </div>
        </GlassCard>

        {/* PRODUCTIVITY SETTINGS */}
        <GlassCard>
          <SectionTag text="Productivity" />
          <SectionTitle>Focus configuration</SectionTitle>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#4a4e4a]">
                Pomodoro duration
              </p>
              <div className="flex flex-wrap gap-2">
                {pomodoroOptions.map((m) => (
                  <button
                    className={`rounded-xl border px-4 py-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                      pomodoro === m
                        ? "text-white shadow-[0_0_12px_rgba(74,124,89,0.25)]"
                        : "border-[#e4e0d8] bg-white/60 text-[#4a4e4a] hover:bg-white"
                    }`}
                    key={m}
                    onClick={() => setPomodoro(m)}
                    style={{
                      backgroundColor: pomodoro === m ? accentColor : undefined,
                      borderColor: pomodoro === m ? accentColor : undefined,
                    }}
                    type="button"
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-[#4a4e4a]">
                Break duration
              </p>
              <div className="flex flex-wrap gap-2">
                {breakOptions.map((m) => (
                  <button
                    className={`rounded-xl border px-4 py-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                      breakDuration === m
                        ? "text-white shadow-[0_0_12px_rgba(74,124,89,0.25)]"
                        : "border-[#e4e0d8] bg-white/60 text-[#4a4e4a] hover:bg-white"
                    }`}
                    key={m}
                    onClick={() => setBreakDuration(m)}
                    style={{
                      backgroundColor:
                        breakDuration === m ? accentColor : undefined,
                      borderColor:
                        breakDuration === m ? accentColor : undefined,
                    }}
                    type="button"
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-6">
            <ToggleSwitch
              active={autoBreaks}
              label="Auto-start breaks"
              onToggle={() => setAutoBreaks(!autoBreaks)}
            />
            <ToggleSwitch
              active={weekStartsMonday}
              label="Week starts Monday"
              onToggle={() => setWeekStartsMonday(!weekStartsMonday)}
            />
            <ToggleSwitch
              active={focusMode}
              label="Focus mode"
              onToggle={() => setFocusMode(!focusMode)}
            />
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-[#4a4e4a]">
              Daily reset time
            </p>
            <div className="relative inline-block">
              <input
                className="rounded-xl border border-[#e4e0d8] bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#2e3230] outline-none transition focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/20"
                onChange={(e) => setDailyReset(e.target.value)}
                type="time"
                value={dailyReset}
              />
            </div>
          </div>
        </GlassCard>

        {/* NOTIFICATIONS */}
        <GlassCard>
          <SectionTag text="Notifications" />
          <SectionTitle>What reaches you</SectionTitle>

          <div className="mt-5 flex flex-col gap-4">
            {[
              {
                key: "taskReminders",
                active: taskReminders,
                icon: "checklist",
                label: "Task reminders",
                desc: "Gentle nudges for unfinished tasks",
              },
              {
                key: "streakReminders",
                active: streakReminders,
                icon: "local_fire_department",
                label: "Streak reminders",
                desc: "Keep your streak alive",
              },
              {
                key: "dailySummary",
                active: dailySummary,
                icon: "summarize",
                label: "Daily summary",
                desc: "End-of-day productivity recap",
              },
              {
                key: "focusReminders",
                active: focusReminders,
                icon: "timeline",
                label: "Focus reminders",
                desc: "Stay on track during sessions",
              },
            ].map((item) => (
              <div
                className="flex items-center justify-between gap-4 rounded-2xl border border-[#e4e0d8] bg-white/50 p-4 transition hover:bg-white/80"
                key={item.key}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{
                      color: item.active ? accentColor : "#74796e",
                      fontVariationSettings:
                        "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p
                      className="text-sm font-bold text-[#2e3230]"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-[#74796e]">{item.desc}</p>
                  </div>
                </div>
                <GlowToggle
                  active={
                    item.key === "taskReminders"
                      ? taskReminders
                      : item.key === "streakReminders"
                        ? streakReminders
                        : item.key === "dailySummary"
                          ? dailySummary
                          : focusReminders
                  }
                  onToggle={() => {
                    if (item.key === "taskReminders")
                      setTaskReminders(!taskReminders);
                    else if (item.key === "streakReminders")
                      setStreakReminders(!streakReminders);
                    else if (item.key === "dailySummary")
                      setDailySummary(!dailySummary);
                    else setFocusReminders(!focusReminders);
                  }}
                />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* AUDIO & AMBIENCE */}
        <GlassCard>
          <SectionTag text="Audio" />
          <SectionTitle>Sound & ambience</SectionTitle>

          <div className="mt-5 space-y-4">
            <div className="flex flex-wrap gap-4">
              {[
                {
                  key: "uiSounds",
                  active: uiSounds,
                  icon: "ads_click",
                  label: "UI sounds",
                },
                {
                  key: "rain",
                  active: rainAmbience,
                  icon: "water_drop",
                  label: "Rain ambience",
                },
                {
                  key: "forest",
                  active: forestAmbience,
                  icon: "forest",
                  label: "Forest ambience",
                },
                {
                  key: "focus",
                  active: focusAmbience,
                  icon: "self_improvement",
                  label: "Focus ambience",
                },
              ].map((item) => (
                <button
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                    item.active
                      ? "text-white shadow-[0_0_12px_rgba(74,124,89,0.25)]"
                      : "border-[#e4e0d8] bg-white/60 text-[#4a4e4a] hover:bg-white"
                  }`}
                  key={item.key}
                  onClick={() => {
                    if (item.key === "uiSounds") setUiSounds(!uiSounds);
                    else if (item.key === "rain")
                      setRainAmbience(!rainAmbience);
                    else if (item.key === "forest")
                      setForestAmbience(!forestAmbience);
                    else setFocusAmbience(!focusAmbience);
                  }}
                  style={{
                    backgroundColor: item.active ? accentColor : undefined,
                    borderColor: item.active ? accentColor : undefined,
                  }}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{
                      fontVariationSettings:
                        "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 rounded-2xl border border-[#e4e0d8] bg-white/50 p-4">
              <SliderControl
                label="Master volume"
                max={100}
                min={0}
                onChange={setMasterVol}
                unit="%"
                value={masterVol}
              />
              <SliderControl
                label="Music"
                max={100}
                min={0}
                onChange={setMusicVol}
                unit="%"
                value={musicVol}
              />
              <SliderControl
                label="Effects"
                max={100}
                min={0}
                onChange={setEffectsVol}
                unit="%"
                value={effectsVol}
              />
            </div>
          </div>
        </GlassCard>

        {/* STATS & INSIGHTS */}
        <GlassCard>
          <SectionTag text="Insights" />
          <SectionTitle>Your productivity stats</SectionTitle>

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            <CircularProgress
              label="47"
              sublabel="Focus hours"
              value={47}
            />
            <CircularProgress
              label="89"
              sublabel="Tasks done"
              value={89}
            />
            <CircularProgress
              label="12"
              sublabel="Longest streak"
              value={40}
            />
            <CircularProgress
              label="76%"
              sublabel="Completion"
              value={76}
            />
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-[#4a4e4a]">
              Weekly productivity
            </p>
            <div className="flex items-end gap-2 md:gap-3">
              {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                <div className="flex flex-1 flex-col items-center gap-2" key={i}>
                  <motion.div
                    animate={{ height: `${h}%` }}
                    className="w-full rounded-lg transition-all duration-300 hover:opacity-80"
                    initial={{ height: 0 }}
                    style={{
                      backgroundColor: accentColor,
                      opacity: 0.7 + (h / 100) * 0.3,
                      maxHeight: 120,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.07 }}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#74796e]">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* AI SECTION - COMING SOON */}
        <GlassCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 backdrop-blur-[2px]" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              Coming soon
            </span>
          </div>
          <div className="pointer-events-none relative opacity-40">
            <SectionTag text="AI Features" />
            <SectionTitle>Intelligent assistance</SectionTitle>
          </div>

          <div className="pointer-events-none relative mt-5 grid gap-3 opacity-40 sm:grid-cols-3">
            {[
              {
                icon: "auto_awesome",
                label: "AI Planner",
                desc: "Let AI structure your day",
              },
              {
                icon: "support_agent",
                label: "AI Focus Coach",
                desc: "Real-time focus guidance",
              },
              {
                icon: "summarize",
                label: "AI Daily Review",
                desc: "Intelligent end-of-day insights",
              },
            ].map((item) => (
              <div
                className="rounded-2xl border border-[#e4e0d8] bg-white/60 p-4"
                key={item.label}
              >
                <span
                  className="material-symbols-outlined mb-2 block text-xl"
                  style={{
                    color: accentColor,
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  {item.icon}
                </span>
                <p
                  className="text-sm font-bold text-[#2e3230]"
                  style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                >
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-[#74796e]">{item.desc}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* ABOUT */}
        <GlassCard>
          <SectionTag text="About" />
          <SectionTitle>MotAnos</SectionTitle>

          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { icon: "info", label: "Version 0.1.0" },
              { icon: "history", label: "Changelog" },
              { icon: "feedback", label: "Send feedback" },
              { icon: "lock", label: "Privacy" },
            ].map((item) => (
              <button
                className="flex items-center gap-2 rounded-xl border border-[#e4e0d8] bg-white/60 px-4 py-2.5 text-sm font-semibold text-[#4a4e4a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
                key={item.label}
                type="button"
              >
                <span
                  className="material-symbols-outlined text-lg"
                  style={{
                    color: accentColor,
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-[#e4e0d8] pt-5 text-center">
            <p className="text-sm font-semibold italic text-[#74796e]">
              Built to make productivity feel alive.
            </p>
          </div>
        </GlassCard>
      </motion.main>
    </div>
  );
}
