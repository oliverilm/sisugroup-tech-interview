# sisugroup-tech-interview

A small TypeScript (Node.js) project.

## Requirements

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm (bundled with Node)

## Setup

Install dependencies:

```bash
npm install
```

## Run

**Run TypeScript directly** (no build step; uses [tsx](https://github.com/privatenumber/tsx)):

```bash
npm run dev
```

**Build and run compiled JavaScript:**

```bash
npm run build
npm start
```

## Project layout

- `src/index.ts` — application entry point
- `dist/` — compiled output (created by `npm run build`, gitignored)
