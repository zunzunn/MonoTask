# MonoTask: Build Roadmap (0 to Launch)

This roadmap focuses on getting a **High-Fidelity MVP** (Minimum Viable Product) live in 4 weeks, prioritizing the "Zen-Tech" aesthetic and the AI core.

---

## Phase 1: Foundation & "Linen" UI (Week 1)
*Goal: Establish the high-end look and feel without AI logic.*
- [ ] **Setup Project:** Initialize Next.js 15, Tailwind CSS, and Framer Motion/GSAP.
- [ ] **Design Tokens:** Define the "Quiet Luxury" palette (Linen, Charcoal, Sage) in `tailwind.config.js`.
- [ ] **Static Shell:** Build the "Tunnel Vision" workspace layout (the central card and background dimming).
- [ ] **Typography:** Integrate *Instrument Sans* and *Inter*.
- [ ] **Animations:** Implement the GSAP morphing transition from "Empty State" to "Task Active State."

## Phase 2: The "Decomposer" Core (Week 2)
*Goal: Connect the AI and make it feel like "Magic."*
- [ ] **NVIDIA NIM Integration:** Setup the backend route to talk to NVIDIA's Llama 3 API.
- [ ] **Prompt Engineering:** Finalize the "ADHD Decomposition" system prompt.
- [ ] **Streaming UI:** Use the Vercel AI SDK to stream sub-tasks into the "Path of Pearls" view.
- [ ] **The "Pop" Interaction:** Build the Lottie/GSAP animation for completing sub-tasks with sound.

## Phase 3: The "Dopamine Engine" (Week 3)
*Goal: Add the features that keep users coming back.*
- [ ] **Potato Energy Mode:** Build the toggle that shifts the UI color temperature and swaps AI prompts.
- [ ] **The Zen Jar:** Implement the physical spark simulation (using a lightweight physics library or SVG/CSS).
- [ ] **Supabase Setup:** Connect database for user Auth and saving the "Garden" state.
- [ ] **Garden Growth:** Create the logic that unlocks new hand-drawn plants every 10 completions.

## Phase 4: Launch & Polish (Week 4)
*Goal: Domain, Marketing, and $5/mo Paywall.*
- [ ] **Stripe Integration:** Setup the $4.99/mo subscription flow using **Stripe Checkout** and **Webhooks** to update user status in Supabase.
- [ ] **Landing Page:** Build the "Morphing" landing page with the sales copy.
- [ ] **Domain Setup:** Connect your custom domain and setup SEO tags.
- [ ] **Beta Test:** Run a small group of ADHD users through the app to fix UI "friction points."

---

## The Tech Stack (The "Free-to-Start" Architecture)

| Layer | Technology | Why? |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | Best for SEO, speed, and handles both Frontend + Backend logic. |
| **Hosting** | **Vercel** | $0 for hobbyists. Seamless integration with Next.js. |
| **Database** | **Supabase (PostgreSQL)** | $0 Tier. Saves user tasks, garden state, and "Zen Jar" progress. |
| **Authentication** | **Supabase Auth** | $0. Easily add "Login with Google" or "Magic Link." |
| **AI Engine** | **NVIDIA NIM** | Use your 1,000 free credits. OpenAI-compatible API. |
| **Payments** | **Stripe Checkout** | Industry standard. You only pay when you make a sale. |
| **Animations** | **GSAP + Framer Motion** | High-end physics and layout transitions for that premium feel. |

---

## Technical Debt to Avoid
- **Don't build a complex calendar:** Keep it focused on the "One Thing."
- **Don't over-animate:** Animations must be fast (200ms) or they become a distraction.
- **Don't hard-code AI:** Use environment variables for API keys to keep things secure.
