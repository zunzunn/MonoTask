# MotAnos — Current UI/UX Design System

This document describes the **implemented** UI/UX of the MotAnos web app as of the latest codebase. It is the single source of truth for all design tokens, component structures, and interaction patterns.

---

## 1) Tech Stack

- **Framework:** Next.js 16.2.6 (App Router, Webpack)
- **Language:** TypeScript, React 19.2.4
- **Styling:** Tailwind CSS v4 with PostCSS (`@tailwindcss/postcss`)
- **Animation:** Framer Motion 12.38.0 (used in `/app/tasks` page), CSS keyframes (used in landing)
- **Icons:** Google Material Symbols Outlined (variable font w/ `wght`, `FILL`, `GRAD`, `opsz` axes)
- **Fonts:** Google Fonts (Hanken Grotesk + Atkinson Hyperlegible Next)
- **State:** Custom `useSyncExternalStore` store backed by `localStorage` (no external state library)
- **Font hosting:** Google Fonts via `<link>` (not `next/font`)

---

## 2) Design Philosophy

- **Subtractive UI:** Show only what is essential. Hide navigational clutter.
- **Single-focus entry:** One input/task at a time.
- **Quiet luxury:** Warm neutrals, not sterile white. No bright neon, no SaaS gradients.
- **Low-pressure language:** Calm, supportive tone — no "hustle" framing.
- **Tactile rewards:** Zen Jar filling, sparks — not badges/XP/gamification.

---

## 3) Color System

All colors are defined in `tailwind.config.ts` and duplicated as CSS custom properties in `globals.css`. The palette is a Material Design 3 / Stitch Terra variant.

### Surface & Background (Warm Neutral)

| Token | Hex | Usage |
|---|---|---|
| `surface` / `background` | `#faf6f0` | Main page background |
| `surface-container-low` | `#f5f1ea` | Card alternative bg, footer |
| `surface-container` | `#f0ece4` | Scrollbar track, badge bg |
| `surface-container-high` | `#eae6de` | — |
| `surface-container-highest` | `#e4e0d8` | Feature card borders |
| `surface-container-lowest` | `#ffffff` | White cards, input bg |
| `surface-variant` | `#e4e0d8` | Borders on feature cards |
| `surface-dim` | `#dbd7cf` | — |
| `surface-bright` | `#faf6f0` | — |

### Primary (Sage Green)

| Token | Hex | Usage |
|---|---|---|
| `primary` / `surface-tint` | `#4a7c59` | CTAs, active states, scrollbar, links |
| `primary-container` | `#78a886` | Blur circles, pearl dots |
| `primary-fixed` | `#c8e8d0` | Icon bg (decomposition), selection bg |
| `primary-fixed-dim` | `#8ecf9e` | Pearl glow, Zen Jar fill |
| `on-primary-fixed-variant` | `#2a6038` | Icon color (decomposition) |
| `on-primary` | `#ffffff` | Button text on primary bg |
| `on-primary-container` | `#d8f0de` | — |
| `on-primary-fixed` | `#002110` | — |

### Secondary (Warm Taupe)

| Token | Hex | Usage |
|---|---|---|
| `secondary` | `#6b6358` | Footer links hover, secondary text |
| `secondary-container` | `#f0e8db` | Icon bg (Potato Energy) |
| `secondary-fixed` | `#f0e8db` | — |
| `secondary-fixed-dim` | `#d4ccbf` | Calm Zone swatch |
| `on-secondary-container` | `#5e5548` | — |
| `on-secondary-fixed` | `#1e1a13` | — |
| `on-secondary-fixed-variant` | `#4a4538` | Icon color (Potato Energy) |

### Tertiary (Warm Gold / Amber)

| Token | Hex | Usage |
|---|---|---|
| `tertiary` | `#705c30` | Sparks, Zen Jar dots |
| `tertiary-container` | `#c4a66a` | — |
| `tertiary-fixed` | `#f8e0a8` | Icon bg (Tactile Rewards) |
| `tertiary-fixed-dim` | `#dcc48e` | — |
| `on-tertiary-fixed-variant` | `#554020` | Icon color (Tactile Rewards) |

### Outline & Text

| Token | Hex | Usage |
|---|---|---|
| `on-surface` | `#2e3230` | Primary text color (headings, body) |
| `on-surface-variant` | `#4a4e4a` | Secondary body text, muted labels |
| `outline` | `#74796e` | Very muted text, labels, tracking |
| `outline-variant` | `#c4c8bc` | Borders, dividers, inputs |
| `on-background` | `#2e3230` | Same as on-surface |

### Special / Accent Values Used Inline

- **Warm peach bg (Tasks page):** `#fff3e8`, `#fffaf4`, `#ead9c7`, `#e8c0a0`, `#9b704f` (terracotta/peach tones used in `/app/tasks`)
- **Input border (subtle):** `#ead9c7` (used for subtask input borders)
- **Error:** `#b83230`, `#ffdad8` (error container), `#690005` (on-error-container)
- **CTAs use 90% opacity on hover** (not a different color)

### Pearl / Decorative Glows

Used in Hero's floating decorative circles:

| Color | Hex | Shadow |
|---|---|---|
| Sage pearl | `rgba(74, 124, 89, 0.2)` bg, `rgba(74,124,89,0.6)` icon | `0 0 30px rgba(74,124,89,0.4)` |
| Taupe pearl | `rgba(107, 99, 88, 0.2)` bg, `rgba(107,99,88,0.6)` icon | `0 0 20px rgba(107,99,88,0.3)` |
| Gold pearl | `rgba(112, 92, 48, 0.2)` bg, `rgba(112,92,48,0.6)` icon | `0 0 25px rgba(112,92,48,0.3)` |
| Light sage dot | `rgba(120, 168, 134, 0.3)` bg | `0 0 15px rgba(120,168,134,0.3)` |

---

## 4) Typography

### Font Families

| Role | Font | Falls back to |
|---|---|---|
| **Headlines** (H1-H3) | `Hanken Grotesk` | `sans-serif` |
| **Display** | `Hanken Grotesk` | `sans-serif` |
| **Body** | `Atkinson Hyperlegible Next` | `sans-serif` |
| **Labels** | `Atkinson Hyperlegible Next` | `sans-serif` |

### Font Size Scale (Tailwind config)

| Token | Size | Line H | Weight | Letter Spacing |
|---|---|---|---|---|
| `headline-xl` | 48px | 56px | 700 | -0.01em |
| `headline-lg` | 32px | 40px | 600 | -0.01em |
| `headline-lg-mobile` | 28px | 36px | 600 | -0.01em |
| `headline-md` | 24px | 32px | 600 | normal (0) |
| `body-lg` | 20px | 32px | 400 | normal |
| `body-md` | 17px | 26px | 400 | normal |
| `label-md` | 14px | 20px | 500 | 0.02em |
| `label-sm` | 12px | 16px | 600 | 0.05em |

### Inline Exceptions

- Hero headline: 48px/56px/700/-0.01em (matches `headline-xl`)
- "You moved the needle": 32px/40px/600/-0.01em (matches `headline-lg`)
- Active task title in Workspace: text-4xl md:text-5xl (approx 36px/48px) / semibold / tracking-tight
- Subheadings in app sections ("Add a focus", "Shape the path yourself"): text-2xl / font-semibold / tracking-tight
- MotAnos brand logo: text-2xl / font-bold / tracking-tight

### Body Text

- Body-lg: 20px/32px — used for hero subheadline
- Body-md: 17px/26px — used for descriptions, feature copy, paragraphs
- Labels: 14px/20px/500/0.02em — buttons, CTA text
- Labels small: 12px/16px/600/0.05em — "No signup to try the demo", privacy note

---

## 5) Spacing & Layout

### Grid & Width

| Property | Value |
|---|---|
| Page max width | `1024px` (max-w-container-max / max-w-5xl) |
| Center alignment | `mx-auto` + flex column with `items-center` |
| Side padding (mobile) | `px-5` |
| Side padding (desktop) | `md:px-8` |
| Hero content width | `max-w-[720px]` / `max-w-2xl` |
| Workspace main | `max-w-5xl` with `max-w-[720px]` sections |

### Spacing Tokens

| Token | Value | Usage |
|---|---|---|
| `unit` | 8px | Base grid unit |
| `stack-sm` | 12px | Tight spacing |
| `stack-md` | 24px | Standard spacing |
| `stack-lg` | 48px | Section spacing |
| `gutter` | 32px | Gutter width |
| `margin-mobile` | 20px | Mobile margin |

### Vertical Rhythm

- **Section vertical padding:** `py-12` (48px)
- **Section vertical margin:** `my-12` (48px)
- **Hero margin top:** `mt-12` (48px)
- **Between sections on landing:** ~96px total (48px py + 12px my each side)
- **Mission section extra bottom:** `mb-24` (96px)
- **Gap between items / cards:** `gap-8` (32px) or `gap-3` (12px)
- **Subtask list gap:** `gap-3`

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `rounded-DEFAULT` | 0.5rem (8px) | Default |
| `rounded-lg` | 1rem (16px) | — |
| `rounded-xl` | 1.5rem (24px) | Cards, sections |
| `rounded-2xl` | 1.75rem (28px) | Inputs, subtask cards, sections |
| `rounded-3xl` | ~1.875rem+ (custom) | Task cards in overview, Workspace sections |
| `rounded-full` | 9999px | CTAs, nav buttons, pearls, avatars |

Inline exceptions:
- Input container (Hero): `rounded-full` (pill shape)
- CTA buttons: `rounded-full`
- Primary task card in Workspace: `rounded-3xl`
- Subtask add area: `rounded-2xl`
- Navbar "Start" button: `rounded-full`

---

## 6) Shadows

All defined in `tailwind.config.ts`:

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 4px 20px rgba(46, 50, 48, 0.06)` | Cards, inputs, default shadow |
| `pearl` | `0 0 30px rgba(74,124,89,0.4)` | Sage pearl glow |
| `pearl-secondary` | `0 0 20px rgba(107,99,88,0.3)` | Taupe pearl glow |
| `pearl-tertiary` | `0 0 25px rgba(112,92,48,0.3)` | Gold pearl glow |
| `pearl-container` | `0 0 15px rgba(120,168,134,0.3)` | Light sage dot glow |

Framer Motion variants: shadow transitions use `shadow-sm` and `shadow-md`.

Inline shadow used in Workspace cards:
- `shadow-[0_14px_45px_rgba(46,50,48,0.07)]` — task intake card
- `shadow-[0_4px_20px_rgba(46,50,48,0.06)]` — focus card
- `shadow-[0_10px_35px_rgba(46,50,48,0.06)]` — subtasks card
- `shadow-[0_18px_60px_rgba(112,92,48,0.12)]` — Tasks overview header
- `shadow-[0_12px_42px_rgba(46,50,48,0.06)]` — tasks column
- `shadow-[0_18px_55px_rgba(46,50,48,0.08)]` — sidebar nav

---

## 7) Component Architecture

### Page Structure

```
/ (Landing)
├── Navbar (sticky, border-bottom)
├── Hero (80vh, centered, interactive demo)
├── ProblemSection (2-col grid)
├── FeaturesSection (3-col grid, icon + title + desc)
├── PricingSection (centered, bordered container)
├── MissionSection (centered, max-w-2xl)
└── Footer (rounded-t-xl, surface-container-low)

/app (Workspace)
├── AppNav (sticky, backdrop-blur)
├── Sidebar (fixed left, task switcher + add button)
├── Task Intake Card (icon picker + task input + subtask input)
├── Mobile task switcher (horizontal scroll)
├── Focus Card (icon + title + current step + Done button)
├── Subtasks Card (add subtask + reorderable/editable list)
├── Progress Stepper (horizontal dots)
├── Calm Zone button (bottom-left)
└── Sparks / Zen Jar (bottom-right)

/app/tasks (TasksOverview)
├── AppNav (with tinyStepsMode)
├── Header card (title + description + summary pills)
└── 3-column grouped cards (Pending / Started / Done)
```

### Navbar (Landing, `/components/Navbar.tsx`)

- Sticky top, z-50, bg `#faf6f0`, bottom border `1px solid #c4c8bc`
- Left: "MotAnos" brand (Hanken Grotesk, 600 weight, text-xl md:text-2xl, tracking-tight)
- Right: "Start" pill button (bg `#4a7c59`, text white, rounded-full, px-5 py-2.5)
- On hover: brand → `#4a7c59`, button → `-translate-y-0.5`

### AppNav (App pages, `/components/AppNav.tsx`)

- Sticky top, z-50, backdrop-blur-md
- Transparent bg `#faf6f0/90` or `#fff3e8/80` (when tinyStepsMode)
- Left: "MotAnos" logo in `#4a7c59`
- Center: nav items (Today / Tasks / Garden / Settings) — inline, horizontal scroll on mobile
- Active state: `border-b-2 border-[#4a7c59]`, text `#4a7c59`
- Right: "Landing" link (rounded-full, border `#c4c8bc`)
- tinyStepsMode: reduces center nav opacity to 55%

### Hero (`/components/Hero.tsx`)

- Full section center-aligned, min-height `80vh`, max-width `1024px`
- Headline (48px/56px/700/-0.01em, Hanken Grotesk, `#2e3230`): "Productivity is too loud. MotAnos is the silence."
- Subheadline (20px/32px/400, Atkinson Hyperlegible, `#4a4e4a`): "The AI task assistant for brains that struggle with starting..."
- **Interactive demo** with states: `initial → loading → step1 → step2 → reward`
  - **Initial:** Pill input (white, rounded-full, border `#c4c8bc`, shadow-sm), 17px placeholder text "What's the one thing you're avoiding?", "Break it down" sage button inside
  - **Loading:** Animated spinner + "Finding the first tiny step..." text
  - **Step 1/2:** White card (rounded-2xl, p-6, border, shadow) with step label, title, 2-min badge, "Done" button
  - **Reward:** Zen Jar visualization + "You moved the needle." heading + "Reset Demo" link
- Decorative floating pearls (4 circles with Material icons inside, float animations)
- Small text below: "No signup to try the demo." (12px/600/0.05em, `#74796e`)

### ProblemSection (`/components/ProblemSection.tsx`)

- Max-width 1024px, centered
- H2 (32px/40px/600/-0.01em): "You don't have a laziness problem. You have a starting problem."
- Two-column grid (1-col mobile, 2-col md+):
  - **Left:** Paragraph + two bullet items with Material Icons (red X for "additive lists", green check for "subtractive design")
  - **Right:** Visual card (`#f5f1ea` bg, border, rounded-xl, p-8, min-h-[300px]) with radial gradient overlay. Inner white card with target icon + "Just focus on this."

### FeaturesSection (`/components/FeaturesSection.tsx`)

- Max-width 1024px, centered
- 3-column grid (1-col mobile, 3-col md+)
- Three feature cards (bg `#f5f1ea`, border `#e4e0d8`, rounded-xl, p-8):
  - **Decomposition Engine:** icon in `#c8e8d0` circle, green icon
  - **Potato Energy Mode:** icon in `#f0e8db` circle, taupe icon
  - **Tactile Rewards:** icon in `#f8e0a8` circle, gold icon
- Each card: icon (48x48 circle) + h3 (headline-md, Hanken Grotesk) + p (body-md, Atkinson Hyperlegible)

### PricingSection (`/components/PricingSection.tsx`)

- Max-width 1024px, centered, text-center
- Container: rounded-xl, p-12, bg `rgba(142, 207, 158, 0.1)`, border `#c8e8d0`
- H2 (headline-lg): "One coffee a month for a year of clarity."
- Price: 48px/700/headline-xl style, sage green `#4a7c59` — "$4.99 / month"
- CTA: rounded-full, sage bg, white text — "Start the 7-day no-overwhelm challenge"

### MissionSection (`/components/MissionSection.tsx`)

- Max-width 1024px, centered, text-center, extra bottom margin
- H2 (headline-md, Hanken Grotesk): "Built for the neurodivergent brain."
- Body paragraph (body-md): empathetic copy
- Privacy note (label-sm, `#74796e`)

### Footer (`/components/Footer.tsx`)

- Max-width 1024px, rounded-t-xl, bg `#f5f1ea`
- Left: "© 2024 MotAnos. Designed for deep focus." (Hanken Grotesk, 18px/600)
- Right: 4 links (Privacy, Terms, Journal, Support) — label-md, `#4a4e4a`, hover `#6b6358`

### Workspace (`/components/Workspace.tsx`)

- **Background:** `#faf6f0` with SVG noise texture overlay (fractalNoise, opacity 0.04)
- **Sidebar (desktop):** Fixed left, vertical pill container with task icons + "add" button. Active task: green border, green bg tint, filled icon. Non-active: transparent, `#4a4e4a`. Add button: border `#ead9c7`, bg `#fffaf4`, green icon.
- **Task intake card:** Rounded-3xl, border `#e4e0d8`, bg white/90, backdrop-blur, shadow. Contains:
  - Header with label "ADD A FOCUS" (uppercase, 12px, tracking-[0.18em], `#9b704f`) + active count badge
  - Icon picker (8 icons, grid of circles, fills on select)
  - Main task input (rounded-2xl, border `#c4c8bc`, bg `#faf6f0`, focus ring green)
  - Optional subtask input + "Add subtask" button
  - Draft subtask list (removable chips)
  - "Save task" button (rounded-2xl, sage bg)
- **Focus card:** Rounded-3xl, white bg, shadow, center-aligned. Contains icon circle, progress text, task title (text-4xl md:text-5xl, Hanken Grotesk, semibold, tracking-tight), current subtask, "Done" button
- **Subtasks card:** Rounded-3xl, border `#e4e0d8`, bg white/85, backdrop-blur. Contains header, add-subtask input, list of subtask rows (each with circle indicator, text, Up/Down/Edit/Delete buttons)
- **Progress stepper:** Horizontal dots below subtasks — active dot (pulsing green), done dots (filled green), locked dots (empty)
- **Calm Zone button (bottom-left):** Fixed, 48x48 circle, border `#e4e0d8`, bg `#f5f1ea`, shows ✦. Click toggles a floating palette of 3 colored swatches.
- **Sparks / Zen Jar (bottom-right):** Fixed, vertical container. Small jar shape (rounded-t-2xl, rounded-b-md, border, white/80 bg) with up to 5 golden dots inside + "X / 5 sparks" label.

### TasksOverview (`/components/TasksOverview.tsx`)

- **Background:** `#fff3e8` (warm peach) with SVG noise texture, opacity 0.04
- Page title card (rounded-3xl, border `#ead9c7`, bg `#fffaf4/88`, backdrop-blur, shadow)
  - H1: "Every focus you are holding." (text-4xl md:text-5xl, Hanken Grotesk, semibold)
  - Subtitle: description text (body-md, `#4a4e4a`)
  - **Summary pills:** 3 rounded pills (Pending / Started / Done) showing counts
- **3-column grid** (staggered Framer Motion animations): Pending / Started / Done sections
  - Each section: rounded-3xl, border `#ead9c7`, bg `#fffaf4/72`, backdrop-blur
  - Section header: title (text-2xl, Hanken Grotesk, semibold) + helper text + count badge
  - **Task cards:** rounded-3xl, border, shadow-sm. Framer Motion (fade-up, hover lift, tap scale). Content: icon circle + title + status badge + preview text + progress bar

### taskStore (`/components/taskStore.ts`)

- Types: `FocusTask { id, title, icon, steps, currentIndex, completed, source }`, where `source` is `"idle" | "manual" | "ai" | "fallback"`
- State: Custom store using `useSyncExternalStore` + `localStorage` persistence
- Keys: `monotask.tasks`, `monotask.activeTaskId`
- Default starter task: "Clean my room" with 3 steps (icon: `cleaning_services`)
- **8 icon options** for tasks:
  - `cleaning_services` (Cleaning)
  - `menu_book` (Study)
  - `mail` (Message)
  - `laptop_mac` (Computer)
  - `shopping_bag` (Errand)
  - `call` (Call)
  - `edit_document` (Writing)
  - `local_florist` (Care)

### AI API (`/app/api/decompose/route.ts`)

- Endpoint: `POST /api/decompose`
- Body: `{ task: string, potatoEnergy?: boolean }`
- Backend: NVIDIA NIM API (Llama 3.1 8B) with fallback to hardcoded steps
- Tiny Steps Mode (`potatoEnergy: true`): returns 3 very soft steps, lower temperature (0.35)
- Normal mode: returns 5-7 steps, temperature 0.45

---

## 8) Interactions & Animations

### CSS Keyframe Animations (defined in `globals.css`)

| Name | Duration | Easing | Behavior |
|---|---|---|---|
| `float-1` | 5s | ease-in-out infinite | Float up-down, slight X |
| `float-2` | 6s | ease-in-out infinite | Float opposite direction |
| `float-3` | 4s | ease-in-out infinite | Float diagonal |
| `shimmer` | 1.5s | ease-in-out infinite | Opacity pulse (0.5 → 1) |
| `fill-jar` | 1.5s | ease-out forwards | Height 0% → 100% |

### Transition Conventions

- Duration: `duration-200`, `duration-300`, `duration-500`, `duration-700`
- Timing: `ease-out` or `ease` (default)
- Hover effects: `hover:-translate-y-0.5` (subtle lift), opacity 0.9 on CTAs
- Focus states: `focus:ring-4 focus:ring-[#4a7c59]/20`, `focus:border-[#4a7c59]`
- Backdrop blur: `backdrop-blur-xl`, `backdrop-blur-md`, `backdrop-blur`

### Framer Motion (TasksOverview only)

- Page header: `opacity: 0→1, y: -18→0`, 0.45s, easeOut
- 3-column grid: staggered children (0.08s stagger), fade-up + scale
- Task cards: `whileHover={{ y: -3 }}`, `whileTap={{ scale: 0.985 }}`
- Progress bar: animated width, 0.55s, easeOut

### Material Symbols Usage

- Icons use the `material-symbols-outlined` class
- `fontVariationSettings` set via inline style for each instance: `'FILL' 0/1, 'wght' 400/500/600, 'GRAD' 0, 'opsz' 24`
- Active/filled states use `'FILL' 1, 'wght' 500`
- Non-active states use `'FILL' 0, 'wght' 400`

### Hero Demo Flow

1. User types in input field
2. Clicks "Break it down" → input blurs → loading state appears
3. After 800ms → Step 1 card slides in (fade + translateY)
4. User clicks "Done" → Step 2 card slides in
5. User clicks "Done" → Zen Jar fills (fill-jar animation) → "You moved the needle." message
6. User clicks "Reset Demo" → back to initial state

---

## 9) Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `sm` (≥640px) | Subtask row becomes horizontal |
| `md` (≥768px) | 2-col grid (Problem), 3-col feature grid, sidebar appears, mobile task bar hidden, horizontal nav instead of stacked |
| `lg` (≥1024px) | 3-col tasks overview |
| Default (<md) | Single column, pill nav scrolls horizontally |

### Typography Scaling

- H1 (headline-xl): 48px desktop → (28px for headline-lg-mobile on mobile equivalent)
- Feature cards: 3-col → 1-col
- Hero input: full-width on mobile, CTA below if very small (<420px)
- Side padding: px-5 mobile → md:px-8

---

## 10) Accessibility & UX Safety

- **Focus indicators:** `:focus-visible` styled with 2px solid `#4a7c59` outline + 2px offset, `border-radius: 0.25rem`. Inputs have custom focus rings (ring-4 with 20% opacity primary).
- **Selection:** `::selection` uses `#c8e8d0` bg, `#002110` text.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables all animations and transitions (0.01ms duration override).
- **Contrast:** Text meets WCAG AA (e.g., `#2e3230` on `#faf6f0` ≈ 11.4:1, `#4a4e4a` on `#faf6f0` ≈ 7.5:1).
- **Labels:** All interactive elements use `aria-label` for accessibility.
- **Language:** Calm, supportive framing — "We don't judge, we don't nag."

---

## 11) Copy & Tone Rules

- Short sentences. No jargon.
- No "crush your goals" or "hustle culture" language.
- Example headlines:
  - "Productivity is too loud. MotAnos is the silence."
  - "You don't have a laziness problem. You have a starting problem."
  - "One coffee a month for a year of clarity."
  - "Built for the neurodivergent brain."
  - "Every focus you are holding."
- Body text: empathetic, supportive, human.
- Privacy promise: "Your data is yours. We train no models on your personal struggles."

---

## 12) Design Must-Nots (enforced by existing code)

- No bright neon colors or busy SaaS gradients
- No dense navigation or sidebars on landing
- No gamification badges, XP, or leaderboards
- No pure black backgrounds or text (`#2e3230` is darkest)
- No looping animations that create visual noise (floating pearls are slow/subtle, shimmer is gentle pulse)
- No external state libraries (no Redux, Zustand, etc. — custom store only)

---

## 13) Custom Scrollbar

- Width: 8px
- Track: `#f0ece4`
- Thumb: `#4a7c59`, `border-radius: 9999px`
- Hover: same color, slightly more opaque

---

## 14) Favicon

- Emoji-based: 🌿 (herb/leaf — green thematic match)
- Inline data URI SVG in `<head>`
