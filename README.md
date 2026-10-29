# Sai Gireesh — Portfolio

Personal portfolio for G. Sai Gireesh Reddy, AI/ML Engineer (Generative AI). Built with React, TypeScript, Tailwind CSS and Framer Motion.

**Live:** run locally with the steps below.

## Stack

- [Vite](https://vitejs.dev) + [React 18](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Lucide](https://lucide.dev) for icons
- [simple-icons](https://simpleicons.org) for tool/stack logos

## Getting started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

```bash
npm run build   # type-check and build for production
npm run lint     # oxlint
npm run preview  # preview the production build
```

## Project structure

```
src/
  data.ts            # all site copy — name, projects, skills, FAQ, etc.
  components/         # shared UI: nav, dock, buttons, tickers, tool icons
  sections/           # page sections (Hero, Projects, Services, About, ...)
public/
  avatar.webp          # 3D-rendered avatar portrait
  avatar-cutout.webp   # background-removed version used in the hero
  resume.pdf           # downloadable resume
```

Most content changes only require editing [`src/data.ts`](src/data.ts); the sections render whatever is there.

## Design notes

The layout and motion patterns (sticky-stacking service cards, scrolling marquees, progressive blur, a floating contact dock) are hand-built with Tailwind and Framer Motion — no external UI kit.
