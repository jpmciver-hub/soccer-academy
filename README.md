# Soccer Academy

A 90-day interactive pre-academy soccer development platform built for U11 youth players. Track daily training, log touches, study tactics, and build consistency through a structured summer program.

**Live site:** https://jpmciver-hub.github.io/soccer-academy/

## Features

- **Dashboard** — Daily status, streak counter, XP/level progression, phase tracking
- **Daily Training** — Structured sessions with warmup, touches, speed, position-specific drills, recovery, and soccer IQ sections. Each drill expands with coaching points and embedded YouTube demos
- **Touch Counter** — Track daily touches across ball mastery, passing, dribbling, and game touches with a 1,000-touch daily target and celebration animation
- **Drill Library** — Searchable/filterable library of drills by category, difficulty, and position relevance
- **Progress Tracking** — Achievements, badges, weekly consistency heatmap, phase progress, and XP system
- **Soccer IQ** — Tactical concepts (9v9 spacing, build-out play, defensive compactness, pressing triggers, position-specific guides) with embedded video breakdowns
- **Weekly Plan** — Printable weekly schedules with parent notes and recovery reminders
- **Coach View** — Add session notes with attitude/effort/confidence ratings, track improvement areas
- **Multi-Profile** — Support multiple players with isolated progress, switchable from the sidebar

## Training Program

The 90-day program is split into three phases:

| Phase | Weeks | Focus |
|-------|-------|-------|
| 1 | 1-5 | Foundation & Technique |
| 2 | 6-10 | Speed & Pressure |
| 3 | 11-13 | Match Readiness |

Position-specific training adapts for CB, RB, RWB, and CDM.

## Tech Stack

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- localStorage persistence (no backend required)
- GitHub Pages via GitHub Actions

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`. The app is statically exported with `output: "export"` in `next.config.ts`.
