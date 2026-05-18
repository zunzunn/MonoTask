# MotAnos Design Spec

This document defines the landing page UI/UX direction for MotAnos. It consolidates product positioning, audience needs, and the precise visual/interaction rules required to deliver the "Zen-Tech sanctuary" experience.

## 1) Audience, Goals, and Emotional Target
- **Primary users:** Adults with ADHD/executive dysfunction who are overwhelmed by planning-heavy productivity tools.
- **Primary UX goal:** Reduce cognitive load and help users start the next task immediately.
- **Emotional target:** Calm, safe, and capable. The page should feel like a deep breath.
- **Conversion target:** Get the user to try the demo first, then present the free trial.

## 2) Core Design Principles
1. **Subtractive UI:** Show only what is essential. Hide navigational clutter and dense layouts.
2. **Single-focus entry:** One input field should dominate the hero. Everything else is secondary.
3. **Quiet luxury:** Premium minimalism with warm neutrals, not sterile white.
4. **Low-pressure language:** Encourage action without urgency, guilt, or "hustle" tone.
5. **Tactile reward promise:** Subtle hints of "pop" and "Zen Jar" without loud gamification.

## 3) Layout Structure (Landing Page)
The landing page is intentionally short and conversion-focused.

### Section A: Hero (Full viewport)
- **Headline:** "Productivity is too loud. MotAnos is the silence."
- **Subheadline:** "The AI task assistant for brains that struggle with starting. We only show the next step."
- **Primary interaction:** Large, centered input with placeholder: "What's the one thing you're avoiding?"
- **Primary CTA:** "Break it down" (button integrated with input).
- **Secondary hint:** "No signup to try the demo." (text link or light caption under CTA).

### Section B: Problem (Relatability)
- **Headline:** "You don't have a laziness problem. You have a starting problem."
- **Two-column layout:**
  - Left: short bullets explaining additive vs subtractive UI.
  - Right: calm visual motif (noise blob vs single task card).

### Section C: Features (Gentle differentiators)
- **Three cards, simple copy:**
  1. Decomposition Engine
  2. Potato Energy Mode
  3. Tactile Rewards (Pop + Zen Jar)
- **No more than 2 lines per card.**

### Section D: Pricing (Low-friction)
- **Headline:** "One coffee a month for a year of clarity."
- **Price:** "$4.99 / month" and "7-day no-overwhelm challenge" CTA.

### Section E: Mission (Trust)
- **Headline:** "Built for the neurodivergent brain."
- **Copy:** Short empathy statement and privacy promise.

## 4) Visual System

### Colors (Quiet Luxury)
- **Background:** Linen `#F9F7F2`
- **Text:** Charcoal `#1F1D1B` (avoid pure black)
- **Primary accent:** Sage `#7C8C7F`
- **Secondary accent:** Soft terracotta `#D9A273`
- **Dividers/borders:** Linen shade `#E9E4DB`

### Typography
- **Headings:** Instrument Sans (600 or 700)
- **Body:** Atkinson Hyperlegible or Inter (400 or 500)
- **Line height:** 1.3 for headings, 1.6 for body
- **Letter spacing:** Slightly negative (-0.01em) for H1/H2 only

### Spacing and Layout
- **Page max width:** 1120px
- **Hero content width:** 720px
- **Section spacing:** 96px vertical between sections
- **Card padding:** 24px to 32px
- **Border radius:** 20px to 28px

## 5) Component Specs

### Primary Input
- **Height:** 64px
- **Border radius:** 20px
- **Background:** White with subtle shadow
- **Placeholder:** Muted charcoal at 60% opacity
- **CTA button:** Right-aligned, same height, sage fill
- **Focus state:** Soft sage glow (0 0 0 4px rgba(124, 140, 127, 0.25))

### Feature Cards
- **3-column grid on desktop, 1-column on mobile**
- **Shadow:** Subtle, no hard edges
- **Icon style:** Line icons only, 1.5px stroke

### Pricing Block
- **Price weight:** 600
- **CTA style:** Sage background, charcoal text
- **Secondary copy:** 12-14px, muted

## 6) Interaction and Motion
- **Hero input focus:** Background dims slightly; input grows 2-4%.
- **On typing:** Subtle page blur, hinting the "workspace" transition.
- **On submit:** A lightweight morph into a demo state showing a short list of pearls.
- **Animation timing:** 200-350ms, ease-out only.
- **Avoid looping animations** that create visual noise.

## 7) Responsive Behavior
- **Mobile hero:** Stack headline, subheadline, input, and CTA vertically.
- **Input:** Full width with CTA below if screen < 420px.
- **Typography scale:** H1 40px desktop, 30px mobile. Body 17px desktop, 16px mobile.

## 8) Accessibility and UX Safety
- **Contrast:** Meet WCAG AA for text and buttons.
- **Focus indicators:** Visible and consistent on all interactive elements.
- **Reduced motion:** Honor prefers-reduced-motion for all transitions.
- **Language:** Avoid guilt or performance framing. Keep copy supportive.

## 9) Content Tone and Copy Rules
- Use short sentences.
- Avoid "crush your tasks" or "hustle" phrasing.
- Speak to the user as a calm guide, not a manager.

## 10) Design Must-Nots
- No bright neon colors.
- No busy SaaS-style gradients.
- No dense nav or sidebars on the landing page.
- No gamification badges or XP.

---

This spec is the single source of truth for the landing page UI/UX. Any changes should maintain the "subtractive," calm, and premium feel that differentiates MotAnos.
