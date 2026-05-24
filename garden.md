# MotAnos Garden — Vision, Design & Architecture

> *"A living place for finished moments."*

---

## 1) Vision

### Why the Garden exists

Productivity tools are obsessed with counting: streaks, velocity, graphs, velocity charts, burn-downs. They treat the user as a machine that needs optimization. The MotAnos Garden rejects that premise entirely.

The Garden exists to **translate effort into atmosphere**. Every completed task, every focused minute, every small win doesn't just increment a counter — it changes the world. A sprout unfurls. A lantern flickers to life. The air shifts.

Users do not visit the Garden to *review their productivity*. They visit to:
- **Rest** in a world that reflects their progress back at them as beauty, not data.
- **Feel** the emotional weight of what they've accomplished through living visuals.
- **Connect** with a space that responds to their state — calm when they are calm, dreaming when they have worked.

The Garden is the emotional heart of MotAnos. It is where the user's consistency becomes tangible, where the app stops being a tool and starts being a place.

### Emotional purpose

| Feeling | How the Garden delivers it |
|---|---|
| **Pride** | Watching seeds you grew by completing tasks become full trees |
| **Calm** | An ambient world with no dashboards, no numbers, no pressure |
| **Belonging** | A persistent space that remembers you and changes with you |
| **Wonder** | Discovering new decorations, weather moods, creatures visiting |
| **Rest** | A place to just *be*, not to do |

---

## 2) Core Gameplay Loop

### Task → Growth

Every task in MotAnos maps to a **plant** in the Garden. As the user completes subtasks, the plant progresses through visible growth stages:

| Stage | Progress | Visual |
|---|---|---|
| **Seed** | 0% (just created) | Small mound of dirt, barely visible |
| **Sprout** | 1–32% | Tiny green stem, two small leaves, sways in the breeze |
| **Bud** | 33–65% | Taller stem, flower bud forming, first hints of color |
| **Bloom** | 66–99% | Open flower or fruit, rich color, subtle glow |
| **Tree** | 100% (completed) | Full canopy, deep roots, ambient particles float around it |

Each plant gets a unique hue based on its index so the garden develops a diverse, organic color palette — not identical rows of clones.

### Focus → Sapling

The **Focus Sapling** is a central tree that grows in the middle of the garden. It represents the user's deep work — accumulated focus sessions, not task completion.

- A "Grow" button starts a focus session.
- Every second the session runs, the sapling accumulates progress.
- At 25 minutes (1500s / one Pomodoro), the sapling reaches full height.
- The progress bar fills with a gradient: green → yellow → gold.
- The sapling pulses with a soft glow while the session is active.

### Consistency → Decorations

The user's total completed steps across **all tasks** unlock permanent decorations. Decorations are one-time unlocks that stay in the garden forever.

| Threshold | Decoration | Description |
|---|---|---|
| 2 steps | **Moon Lantern** | A warm glowing lantern hung from a wooden post |
| 4 steps | **Glow Mushrooms** | A cluster of bioluminescent mushrooms |
| 7 steps | **Tiny Bridge** | A small arched bridge over the pond |
| 10 steps | **Glass Windbell** | A hanging windbell that sways and catches light |

This catalog is data-driven in `gardenData.ts` — adding new decorations means adding one entry, not touching rendering logic.

### Streaks → Weather & Mood

The store saves the user's chosen mood and weather. In the future, streaks and consistency will dynamically influence what weather naturally occurs — but the user always retains manual control as the primary interface.

---

## 3) Environment Systems

### Sky & Day/Night Cycle

The sky is a full-screen gradient that animates in the background continuously.

**Day sky** (`#ffe9b4` → `#bfe9e0` → `#a9d9f7`):
- Warm golden top, cyan middle, soft blue bottom
- A large glowing orb (sun) drifts slowly from left to right, pulsing opacity
- Clouds drift via a `backgroundPosition` animation cycling over 24 seconds

**Night sky** (`#111a31` → `#24445a` → `#74634a`):
- Deep navy top, teal mid, warm brown horizon
- 24 stars twinkle independently with staggered delays and varying opacity/scale
- Activated when real-world hour < 6 or >= 18, OR when mood is set to "starlit"

**Transition**: Both day and night modes are smooth gradient changes — no harsh cuts.

### Weather Modes

Each weather state changes the sky gradient, adds weather-specific effects, and shifts the emotional tone.

| Mode | Sky Palette | Effects |
|---|---|---|
| **Clear** | Gold → Cyan → Blue | Sun glow, standard ambience |
| **Mist** | Warm cream → Sage → Lavender | A large horizontal blurred band drifts across the middle (26% top), opacity pulses |
| **Drizzle** | Steel blue → Muted teal → Slate | 28 falling rain lines (angled, staggered delays), mist band, general desaturation |
| **Aurora** | Deep teal → Forest → Olive | A massive radial gradient sweeps the sky with green/teal/cyan, opacity pulses, `skewX` oscillates |

### Particles

**Fireflies** (18 instances):
- Small glowing dots (`#fff6a8`, `shadow-[0_0_18px_6px_rgba(255,234,133,0.38)]`)
- Drift in organic paths: opacity fades in/out, x/y float with different magnitudes
- Staggered delays so no two fireflies move in sync
- Data-driven via `fireflySeeds` array in `gardenData.ts`

**Stars** (24 instances):
- Tiny white dots with golden glow (`#fff7c7`, `shadow-[0_0_14px_rgba(255,247,199,0.9)]`)
- Twinkle independently with varied delay/duration
- Only visible at night or starlit mood

**Rain** (28 instances):
- Thin angled white lines, full height
- Fall at staggered intervals with linear timing
- Only in drizzle mode

### Parallax Depth Layers

The world has 5 depth layers sorted by `z-index`:

| Layer | z-index | Content | Motion |
|---|---|---|---|
| **Sky** | 0 | Gradient, sun, stars, mist, aurora | Background position drift |
| **Back Hills** | 10 | Large distant hills, blur 2px | Very slow horizontal drift (-18px) |
| **Mid Hills** | 15 | Medium hills, slight green tint | Medium drift (+12px) |
| **Front Hills** | 20 | Near hills, most detail | Fastest drift (+24px) |
| **Terrain** | 25 | Green ground, grass texture, shadow overlay | Static (ground plane) |
| **Water** | 20 | Pond with reflections and ripple rings | Static (at terrain level) |
| **Decorations** | 40 | Lanterns, mushrooms, bridge, windbell | Gentle float animation |
| **Plants** | 40 | All plant sprites, growing from terrain | Sway animation, hover interaction |
| **Focus Tree** | 50 | Center sapling tree | Pulse glow, idle float |
| **Creature** | 50 | Animal visitor | Walk cycle animation |
| **Fireflies** | 30 | Floating light dots | Drift in 3D space above terrain |

### Ground Composition

The ground is a layered composited surface:

1. **Base** — Full width curved hill (`rounded-[54%_46%_0_0]`), gradient from `#4c7f45` → `#83b85f` → `#dce49c`, with inset shadows for depth
2. **Overlay** — Radial gradient highlights (sun spots on grass) from yellow → transparent
3. **Texture** — CSS radial gradient pattern simulating grass blades, at `opacity: 0.35`
4. **Atmospheric haze** — A horizontal blurred band at the grass-sky transition line

### Water Pond

A fixed elliptical pond (`left: 34%, top: 69%`) built with:
- Teal gradient base (`#9ddbd8` → `#74bec9` → `#4f86a5`)
- Soft inner shadow (white reflection at top-left)
- Outer edge blur (green halo from surrounding grass)
- 3 expanding ripple rings that animate opacity/scale with staggered delays
- A moving light shimmer that sweeps left-to-right across the surface

---

## 4) Visual Direction

### 2.5D Layered World

The Garden uses pure CSS/Framer Motion to create a 2.5D isometric-style world — no WebGL, no canvas. Depth is achieved through:

- **Parallax scrolling** — hills at different depths move at different speeds
- **Proximity scale** — foreground elements are larger, background smaller
- **Blur depth** — distant hills are blurred (`blur-[2px]`, `blur-[1px]`)
- **Shadow depth** — plants and decorations have `drop-shadow` for ground contact
- **Z-ordering** — explicit z-index stack creates spatial hierarchy

### Cozy Palette

The Garden uses its own distinct dark/earthy color system separate from the main app:

| Token | Hex | Usage |
|---|---|---|
| Sky dark | `#14251f` | Page background outside world |
| Deep forest | `#1c2c24` | Bottom gradient overlay |
| Rich green | `#4c7f45` | Ground base |
| Meadow green | `#83b85f` | Ground mid |
| Warm yellow | `#dce49c` | Ground highlight |
| Trunk brown | `#9d6d45` | Tree trunks |
| Leaf dark | `#4f9560` | Canopy shadow side |
| Leaf light | `#8ccb78` | Canopy sun side |
| Pond teal | `#74bec9` | Water surface |
| Glow gold | `#fff6a8` | Fireflies, highlights |

### Glassmorphism UI

All floating panels use the `FloatingPanel` component:
```tsx
className="border border-white/45 bg-white/42 shadow-[0_24px_80px_rgba(33,59,48,0.18)] backdrop-blur-2xl"
```

- **Base:** `bg-white/42` — semi-transparent white
- **Border:** `border-white/45` — soft translucent edge
- **Blur:** `backdrop-blur-2xl` — blurs the world behind
- **Shadow:** Deep green-tinted shadow for ground contact
- **Radius:** `rounded-[2rem]` — large pill/capsule radius

Controls inside panels use either:
- **Active state:** Solid dark green bg (`#315d43`), light text (`#fff9df`), strong shadow
- **Inactive state:** Semi-transparent white bg (`bg-white/48` or `bg-white/38`), green text

### Ambient Lighting

- **Plant glow:** Each plant has a colored blur behind it (`hsl(hue, 68%, 72%)` at calculated opacity) that pulses — makes flowers feel luminescent
- **Sun glow:** Large `blur-2xl` circle at top-left, warm yellow, pulses scale/opacity
- **Focus tree aura:** Green blur circle behind the sapling that pulses during active sessions
- **Sky gradient:** Background animates continuously — the world never feels static
- **Drop shadows:** All decorations use `drop-shadow-[0_18px_18px_rgba(44,70,56,0.18)]`

### Cute Game Aesthetic

- **Rounded everything** — plants use `rounded-[46%_54%_50%_50%]` for organic shapes, not perfect circles
- **Soft shadows** — `inset` shadows on leaves and canopies for 3D volume
- **Exaggerated proportions** — large flowers, chunky mushrooms, stubby trees
- **Label tags** — hover tooltips on plants ("3/5 - Clean my room"), name tags on creatures
- **Bouncy transitions** — `whileHover: scale(1.06)`, `whileTap: scale(0.97)` on interactive elements
- **Decoration detail** — lanterns have strings + hooks, windbells have glass bodies, mushrooms have spots

---

## 5) Animation Philosophy

> *"If it exists, it should move."*

Every element in the Garden has at least one subtle motion. Nothing is perfectly still. This creates the feeling of a living, breathing world.

### Motion Rules

| Element | Animation | Duration | Type |
|---|---|---|---|
| Sky gradient | Background position drift | 24s | `easeInOut`, infinite loop |
| Sun glow | Opacity + scale pulse | 9s | `easeInOut`, infinite loop |
| Stars | Opacity fade + scale | 2.8s | `easeInOut`, staggered |
| Fireflies | Opacity + x/y drift | 4.8–7.0s | `easeInOut`, staggered |
| Mist band | Horizontal drift | 18s | `easeInOut`, infinite |
| Aurora | Opacity + skewX | 10s | `easeInOut`, infinite |
| Back hills | Horizontal drift | 28s | `easeInOut`, infinite |
| Mid hills | Horizontal drift | 25s | `easeInOut`, infinite |
| Front hills | Horizontal drift | 22s | `easeInOut`, infinite |
| Tree clusters | Slight rotate + y float | 5.8s | `easeInOut`, infinite |
| Plants | Opacity/scale (glow) + y float | 3.4–4.6s | `easeInOut`, infinite |
| Flower blooms | Scale + rotate | 3.2s | `easeInOut`, infinite |
| Leaves | Rotate sway | 3.8–4.5s | `easeInOut`, infinite |
| Focus tree | Y float + glow pulse | 2.8–4.0s | `easeInOut`, infinite |
| Decorations | Y float + slight rotate | 4.2s | `easeInOut`, infinite |
| Water ripples | Opacity + scale expand | 4.4s | `easeOut`, infinite |
| Water shimmer | Horizontal sweep | 5.5s | `easeInOut`, infinite |
| Rain | Vertical fall | 1.6s | `linear`, infinite |
| Creature | Walk cycle (x/y) | 5.5s | `easeInOut`, infinite |
| Creature nudge | Random respawn | 42s | Interval reset |
| Nav bar (garden) | Gentle y float | 7s | `easeInOut`, infinite |
| Panels | Entrance fade-up | 0.55s | Custom bezier `[0.22,1,0.36,1]` |

### Performance Considerations

- **Reduced motion** — `useReducedMotion()` disables all infinite animations and creature nudging
- **CSS-only animations** preferred for simple cases (fewer React re-renders)
- **Framer Motion's `animate` prop** handles complex orchestrated sequences
- **`drag` on parent container** rather than individual elements — single gesture handler
- **Debounced intervals** — creature nudging runs every 42s, focus tick every 1s
- **`useMemo`** for plant building — recalculated only when tasks change
- **No canvas/WebGL** — pure CSS compositing, hardware accelerated by the browser

---

## 6) Technical Architecture

### Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Rendering | React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| State | Zustand v5 + `persist` middleware |
| Persistence | localStorage (via Zustand `createJSONStorage`) |
| Icons | Material Symbols Outlined |
| Fonts | Hanken Grotesk (headings), Atkinson Hyperlegible (body) |

### Module Structure

```
components/garden/
├── GardenExperience.tsx   # Main orchestrator component
├── gardenStore.ts         # Zustand store (mood, weather, focus, decorations)
├── gardenData.ts          # Static config (decoration catalog, fireflies, stars, moods)
└── types.ts               # TypeScript types & interfaces

app/app/garden/
└── page.tsx               # Route page (thin wrapper)
```

### Component Tree

```
GardenPage
└── GardenExperience
    ├── AppNav (with isGarden styling)
    ├── Sky
    │   ├── Sun glow
    │   ├── Stars (×24)
    │   ├── Mist band
    │   └── Aurora
    ├── Fireflies (×18)
    ├── Draggable World Container
    │   ├── GardenWorld
    │   │   ├── DistantHills (back / mid / front)
    │   │   ├── TreeCluster (×2)
    │   │   ├── Ground (layered terrain + grass texture + haze)
    │   │   ├── WaterPond (ripples + shimmer)
    │   │   ├── DecorationSprite (×N, depending on unlocks)
    │   │   ├── PlantSprite (×N, one per task)
    │   │   ├── FocusTree
    │   │   └── Rain (×28, conditional)
    │   └── Creature
    ├── Top Floating Panel (title + mood)
    ├── Bottom-Left Floating Panel (ambience controls)
    └── Bottom-Right Floating Panel (focus session controls)
```

### Zustand Store Schema

```typescript
interface GardenState {
  mood: "serene" | "dreamy" | "rainy" | "starlit";
  weather: "clear" | "mist" | "drizzle" | "aurora";
  focusSapling: {
    active: boolean;
    startedAt: number | null;
    accumulatedSeconds: number;
  };
  unlockedDecorations: GardenDecoration[];
  creatureSeed: number; // rotated to show different creatures

  // Actions
  setMood: (mood: GardenMood) => void;
  setWeather: (weather: WeatherMode) => void;
  startFocusSession: () => void;
  stopFocusSession: () => void;
  tickFocusSession: () => void;
  unlockDecoration: (completedSteps: number) => void;
  nudgeCreature: () => void;
}
```

**Persistence**: The store uses Zustand's `persist` middleware with `localStorage` under key `"motanos.garden"`. The `partialize` option strips ephemeral state (`active`, `startedAt`) on save — sessions don't persist across page reloads.

### Data Flow

```
[taskStore] ──→ GardenExperience.buildPlants()
                     │
                     ├── For each task: calculate progress, stage, position, hue
                     └── returns GardenPlant[] ──→ GardenWorld → PlantSprite[]

[completedSteps] ──→ useEffect → unlockDecoration(threshold check)
                           │
                           └── decorationCatalog filter → new GardenDecoration[]
                                  ──→ gardenStore.unlockedDecorations
                                  ──→ GardenWorld → DecorationSprite[]

[focusSapling.active] ──→ useEffect → setInterval(1s) → tickFocusSession()
                              │
                              └── accumulatedSeconds ──→ FocusTree (height + progress bar)
```

### Decoration System (Data-Driven)

Adding a new decoration requires **one entry** in `decorationCatalog`:

```typescript
{ kind: "well", label: "Wishing Well", threshold: 14, x: 42, y: 66 },
```

Then a new rendering case in `DecorationSprite`:

```tsx
if (decoration.kind === "well") (
  <div className="...">/* CSS art */</div>
);
```

No store changes, no route changes, no state management changes.

---

## 7) Scene Composition

### Layered Background Construction

The Garden is not an image — it is composited from 15+ CSS layers stacked together. This makes it:
- **Resolution independent** — looks sharp at any screen size
- **Themeable** — each layer can be swapped or parameterized
- **Animatable** — each layer moves independently

### Canvas Construction Order (bottom to top)

```
1. Sky gradient (full viewport, animates position)
2. Sun glow (absolute positioned, pulse)
3. Stars (24 dots, twinkle)
4. Mist band (horizontal, drift)
5. Aurora (radial gradient, skew)
6. Back hills (large, blurred, slow drift)
7. Mid hills (medium, slight green, medium drift)
8. Front hills (detailed, green, fast drift)
9. Ground base (full width curved hill)
10. Ground overlay (radiant highlights)
11. Ground texture (grass pattern dots)
12. Atmospheric haze (horizontal blur at horizon)
13. Water pond (ellipse with ripples + shimmer)
14. Decorations (lanterns, mushrooms, bridge, windbell)
15. Plants (task-based sprites with glow)
16. Focus tree (center sapling)
17. Creature (visiting animal)
18. Fireflies (floating light dots)
19. Rain (falling lines, conditional)
20. Bottom gradient fade (dark overlay at world edge)
21. Floating UI panels (glassmorphism, on top of everything)
```

### Camera & World Movement

- **Desktop:** The world container is draggable on the X axis via Framer Motion's `drag="x"` with `dragConstraints` set to the world boundaries and `dragElastic: 0.08`
- **Mobile:** Same drag mechanism works with touch events
- **World width:** Minimum 1320px — wider than viewport to necessitate scrolling
- **UI panels** counter-scroll slightly (via `useTransform(dragX, [-520, 0], [-18, 18])`) to create a subtle parallax between UI and world
- **No Y scrolling** — the viewport height is fixed at `calc(100vh - 73px)` with `min-height` of 720px

### Terrain Design

The ground is curved like a gentle hill, not flat:
- `rounded-[54%_46%_0_0]` creates a soft organic upward curve at the edges
- Grass texture is a CSS `radial-gradient` dot pattern repeated across the surface
- The ground extends beyond viewport bounds (`inset-x-[-22%]`) to feel infinite
- A dark gradient at the bottom (`from-[#1c2c24]/52 to-transparent`) fades the world edge

---

## 8) UI Design Rules

### Floating Panel System

Every UI element on the Garden screen uses the `FloatingPanel` component:

```
- border: white/45                    # Soft translucent border
- bg: white/42                        # Semi-transparent white base
- backdrop-blur-2xl                   # Blurs the world behind
- shadow: green-tinted deep shadow    # Ground contact shadow
- rounded-[2rem]                      # Large pill radius
- entrance: fade-up + scale           # 0.55s custom bezier
```

### UI Layout

| Position | Content | Behavior |
|---|---|---|
| Top center | Title panel ("MotAnos Garden / A living place for finished moments.") | Parallax counter-scroll |
| Top right | "Drag the world" hint (desktop only) | Hidden on mobile |
| Bottom left (md) / Bottom spread (mobile) | Ambience panel (mood + weather controls) | Full width on mobile |
| Bottom right (md) / Below ambience (mobile) | Focus panel (timer + progress + stats) | Full width on mobile |

### Design Constraints

- **No persistent dashboard numbers** — stats are shown as secondary context, not primary focus
- **No aggressive CTAs** — controls are small pills, not large buttons
- **UI never covers the center of the world** — panels are pushed to edges
- **Transparency at all levels** — every panel lets the world breathe through it
- **Typography is minimal** — short labels, large type weight for impact
- **Only one prominent action** — the "Grow" / "Rest" button is the only primary CTA

---

## 9) Emotional Design

### Why the Garden motivates without metrics

Traditional productivity apps create motivation through **anxiety** — you see what you haven't done, how far behind you are, how many tasks are overdue. The Garden creates motivation through **attachment**.

**The psychology:**

| Traditional approach | Garden approach |
|---|---|
| "You completed 3 of 8 tasks" | "Your sprout is getting taller" |
| "Your streak is in danger" | "The lantern is still glowing from yesterday" |
| "You're behind on this project" | "A new flower bloomed while you were working" |
| Dashboard with red overdue items | A peaceful world that grew because of you |

### Emotional Progression Arc

Over days and weeks of using MotAnos, the Garden evolves with the user:

| Timeframe | Emotional state | Garden reflection |
|---|---|---|
| **Day 1** | Hopeful, tentative | 1–2 small sprouts, bare terrain |
| **Week 1** | Building momentum | Several plants at bud/bloom, first lantern |
| **Month 1** | Consistent rhythm | Multiple trees, mushrooms, bridge, full plant ecosystem |
| **Quarter 1** | Deep integration | Dense garden, all decorations, creature visits, rich canopy |

The Garden **does not punish absence**. If the user stops using MotAnos for a week, the Garden stays exactly as they left it — waiting, not wilting. There is no decay mechanic, no guilt mechanic, no "come back or your plants die" system. The world is a reward for effort, not a leash.

### Micro-Joy Moments

| Trigger | Effect |
|---|---|
| Completing a subtask | The corresponding plant shimmers briefly |
| Unlocking a decoration | Decoration appears with a scale-in animation |
| Starting a focus session | Sapling starts pulsing with energy |
| Reaching 25min focus | Sapling reaches full tree height, ambient sparkle |
| Creature visit | Random creature appears, walks around, then disappears |
| Changing weather | Sky gradient morphs, new particle effects appear |

---

## 10) Future Expansion Ideas

### Near-term (Next 3 months)

**Pets**
- 4–6 creature types that visit randomly (currently 4: Momo, Pip, Nara, Bun)
- Clicking a creature drops a small reward (seed, sparkle, mood shift)
- Creatures can be attracted by specific weather or decoration combinations
- Persistent creature that stays for longer visits (not just 42s nudges)

**AI Companion Spirit**
- A small floating light being that follows the cursor / drag position
- Reacts to user actions — brightens on task completion, dims during mist
- Has subtle idle animations (drifts, spirals, hovers near plants)
- Could speak gentle affirmations in a floating speech bubble

**Garden Journal**
- A small book/scroll UI element that captures daily entries
- Auto-generated: "Today you completed 4 tasks. A new mushroom appeared by the pond."
- User can write freeform journal entries tied to the day's garden state

### Medium-term (3–6 months)

**Friend Gardens**
- View a simplified, read-only version of a friend's garden
- Leave a "seed" (encouragement) that appears as a temporary flower
- No competitive leaderboards — pure shared space appreciation

**Secret Unlockables**
- Rare decorations that appear only under specific conditions:
  - "Waterfall" — unlock by having drizzle weather + 3+ consecutive days of use
  - "Fairy Ring" — unlock by having mushrooms + 20+ total focus minutes
  - "Meteor Shower" — unlock by having starlit mood + 50+ completed tasks in a week
- Hidden achievements with no preview — discovered organically

**Rare Events**
- **Blooming Festival** — All plants simultaneously burst into full bloom for 24 hours when the user completes 10 tasks in a single day
- **Visitor Night** — Multiple creatures appear at once when starlit mood + night time
- **Seed Drift** — A random decorative particle event (falling leaves, flower petals, pollen dust) tied to accumulated streak length

**Seasonal Environments**
- The entire color palette shifts with real-world seasons:
  - **Spring:** Cherry blossoms, pink/green palette, more fireflies
  - **Summer:** Dense green canopy, golden hour lighting, cicada-like ambient dots
  - **Autumn:** Warm orange/brown palette, falling leaves particles
  - **Winter:** Snow-covered terrain, blue/white palette, aurora more common
- Seasonal-exclusive decorations (pumpkin, snow globe, blossom branch)

### Long-term (6–12 months)

**Dynamic World Expansion**
- The garden terrain grows horizontally based on total tasks completed
- New terrain types unlock (beach section, forest glade, rocky outcrop)
- A river or path that extends as the user progresses
- Each terrain type has its own color palette and decorations

**Festivals**
- Timed events tied to real-world dates:
  - **Lantern Festival** (New Year) — All lanterns multiply, sky fills with floating lights
  - **Harvest Moon** (Autumn equinox) — Special golden glow, double decoration XP
  - **Bloom Day** (Spring equinox) — All seeds instantly sprout
- Festival rewards: exclusive one-time decorations

**Garden Soundscape**
- Low-fi ambient audio that shifts with weather and mood:
  - Clear: Soft wind, distant birds
  - Mist: Muffled ambient drone
  - Drizzle: Gentle rain patter
  - Aurora: Ethereal synth pads
- Creature sounds (soft chimes when creatures visit)
- Optional: binaural beats / focus-frequency overlay during focus sessions

### Implementation Principles

Every expansion should follow these rules:

1. **Data-driven over hardcoded** — add to config arrays, not switch statements
2. **CSS-native over canvas** — no WebGL unless absolutely necessary for 3D
3. **Progressive enhancement** — new features don't break existing garden state
4. **Persistent by default** — garden state survives page reloads and device switches
5. **Optional interaction** — no expansion should feel like "one more thing to manage"
6. **Performance-first** — all animations must respect `prefers-reduced-motion`

---

## Appendix A: Type Reference

```typescript
type GardenMood = "serene" | "dreamy" | "rainy" | "starlit";

type WeatherMode = "clear" | "mist" | "drizzle" | "aurora";

type DecorationKind = "lantern" | "bridge" | "mushroom" | "windbell";

type PlantStage = "sprout" | "bud" | "bloom" | "tree";

interface GardenDecoration {
  id: string;
  kind: DecorationKind;
  label: string;
  unlockedAt: number;  // completed steps threshold
  x: number;           // percentage position
  y: number;           // percentage position
}

interface FocusSapling {
  active: boolean;
  startedAt: number | null;
  accumulatedSeconds: number;
}

interface GardenPlant {
  id: string;
  title: string;
  icon: string;
  progress: number;        // 0.0 – 1.0
  completedSteps: number;
  totalSteps: number;
  stage: PlantStage;
  x: number;               // percentage position
  y: number;               // percentage position
  hue: number;             // HSL hue for unique coloring
}
```

## Appendix B: Decoration Catalog Template

```typescript
// To add a new decoration, add one entry to decorationCatalog:
{
  kind: "fountain",       // unique string identifier
  label: "Tiny Fountain", // display name
  threshold: 16,          // completed steps to unlock
  x: 34,                  // left % position
  y: 62,                  // top % position
}

// Then add a rendering case in DecorationSprite:
if (decoration.kind === "fountain") (
  <div className="relative h-28 w-20">
    <div className="absolute bottom-0 h-12 w-20 rounded-b-full bg-[#a0b8c2]" />
    <div className="absolute bottom-14 left-1/2 h-4 w-6 -translate-x-1/2 rounded-full bg-[#8fc6e8] shadow-[0_0_24px_rgba(143,198,232,0.6)]" />
    <motion.div
      animate={{ y: [0, -18, 0], opacity: [0.6, 1, 0.6] }}
      className="absolute bottom-14 left-1/2 h-6 w-1 -translate-x-1/2 rounded-full bg-[#cef0ff]"
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
    />
  </div>
);
```
