# CareKiln

React + Vite website and synthetic home-care operations demo, including the Remotion opening film.

## Run locally

Use Node.js 22.x.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

## Deploy to Vercel

1. Open https://vercel.com/new and import `PrajaktaAdlytica/carekiln-site` from GitHub.
2. Use the repository root (`./`), Vite preset, Node.js 22.x, install `npm ci`, build `npm run build`, output `dist`.
3. Deploy. These build settings are also committed in `vercel.json`.
4. Check the homepage intro, `/preview`, `/products/visit-desk` and `/request-pilot`, including refreshing each URL.
5. For a custom domain, add it under Project Settings → Domains and apply the exact DNS records Vercel provides at your registrar.
6. Set `SITE_URL=https://carekiln.com` in Vercel Environment Variables and redeploy to keep canonical metadata on the purchased domain. Builds also use `https://carekiln.com` by default; this does not change DNS or hosting.

No secret or API key is required. The standard build emits per-route HTML with metadata, a source page and a 404 page. Future pushes to the connected production branch (`main`) trigger Vercel deployments.

## Contents

- `src/`: site, synthetic demo and Remotion film implementation.
- `public/assets/`: logos, favicon set, fonts and intro artwork.
- `scripts/routes.mjs`: static route metadata and source page generation.
- `qa.html`, `intro-test.html`: local-only QA fixtures (not emitted in production build).
- `deliverables/`: brand kit, vector logo kits, visual explorations, research/IA, intro notes, handoff and final QA evidence. Earlier explorations are archival, not the final approved direction.
- `README.txt`: earlier detailed website handoff.

## Concept boundaries

This is a concept preview, not an operating product. All demo records are synthetic. Inquiry forms generate local drafts; sign-in is a concept screen. There is no backend, payment collection, patient data or live EVV integration. Search indexing remains disabled intentionally. Images in the film are synthetic artwork animated with Remotion.

## Intro editing

```sh
npm run intro:studio
```

The intro is a 15-second Remotion Player composition. It hides navigation while active and fades into the hero. Pause, skip, replay and reduced-motion handling are included.

## Validation

`npm test` exercises the three synthetic decision-model tests. Final responsive QA covered 88 route/viewport combinations; evidence is in `deliverables/CareKiln-Website-Handoff/`. Physical-device and full cross-browser testing are not claimed.

Official Vercel references: https://vercel.com/docs/frameworks/frontend/vite and https://vercel.com/docs/git/vercel-for-github
