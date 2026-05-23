# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

Quick start (dev):

1. Install deps:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

Features added for this project:
- Product data is fetched from `https://dummyjson.com` and rendered in `NewArrivals`.
- Cart state is in `src/composables/useAppState.ts` and persists to `localStorage`.
- Cart page available at `/cart` and product detail pages at `/product/:id`.
