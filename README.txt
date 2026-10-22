CareKiln website — concept build
18 October 2026

CUSTOM DOMAIN
https://carekiln.com
The domain is purchased; its Hostinger connection is in progress. This is a concept website, not an operating home-care service. Deployment success is recorded in the separate website handoff.

RUN LOCALLY
Node 22.12+ or 24 LTS recommended.
  npm ci
  npm run dev
  npm test
  npm run build
  npm run preview

WHAT IS INCLUDED
- Approved orange editorial identity, outlined vector logo, favicon and locally hosted OFL fonts.
- React 19.3.1, React Router 7.18.4, Vite 8.3.4, GSAP 3.15.0.
- Native browser scrolling. GSAP ScrollTrigger for the desktop pinned narrative, scrubbed UI compositions, drawn travel paths, section headings and constraint/gate progression.
- Layered day-plan animation, five individually choreographed module illustrations, flowing evidence paths, orbit details, hover states and route entrances.
- Desktop pinning only above 960px wide and 699px tall. Smaller or shorter viewports use explicit story-step controls.
- Global motion pause, prefers-reduced-motion support, offscreen scene pausing and hidden-tab CSS animation pausing.
- 21 application routes; five product detail pages; a pricing alias; a research source page; branded not-found experience.
- Ten internally labeled synthetic queue records. Full source/constraint detail for the three principal cases.
- Explicit, local, reversible approval for DEMO-VIS-001 / Caregiver C only. Ambiguous and blocked records cannot be approved. No messages are sent.
- Inquiry form with browser validation and a downloadable local draft. It does not transmit or save a lead.
- Complete concept sign-in, privacy, terms and accessibility pages.

ROUTES
/ /products /products/visit-desk /products/visit-review /products/visit-proof
/products/visit-signal /products/visit-report /how-it-works /preview /use-cases
/ecosystem /evaluation /pilot /pricing /governance /company /request-pilot
/contact /sign-in /legal/privacy /legal/terms /accessibility /sources.html

SOURCE GUIDE
src/components.jsx — navigation, shared UI, motion lifecycle, pinned story, module scenes
src/Home.jsx — homepage narrative and case explorer
src/Pages.jsx — product, company, governance, pilot, form and legal routes
src/Preview.jsx — isolated synthetic workbench
src/model.mjs — fixture records, explicit decision reducer and feasibility checks
src/model.test.mjs — boundary, approval and fixture consistency checks
src/data.js — five exact offers, copy, official sources, readiness gates and route metadata
src/styles.css — approved design tokens, responsive layouts and motion choreography
scripts/routes.mjs — static route entries, page metadata, research page and noindex policy
public/assets — original icons/identity, local font files and license notices
qa.html — development-only responsive inspection harness; excluded from the built site
.openai/hosting.json — retained Sites project identity and static output configuration

VERIFICATION
Production build and all three decision-model tests pass. Browser layout audit checked
22 paths (21 routes plus the not-found path) at 1440x900, 768x1024, 390x844 and 320x740.
All 88 combinations had one H1, no page-level horizontal overflow and no broken images.
Desktop pinning, automatic step progression, manual approval, undo, blocked case,
mobile menu navigation, required form fields and local draft generation were checked.
The browser reported no runtime warning or error on the representative production flow.

LIMITS / LAUNCH CONNECTIONS
- No real lead endpoint, authentication, analytics, payment, EVV/EHR/ERP or outbound messages.
- No public sharing change, custom domain connection or Vercel/GitHub account setup.
- Actual OS reduced-motion preference handling is implemented; manual pause behavior
  was browser-tested. This is not an assistive-technology certification or load test.
- The static frontend requires JavaScript. Route entry HTML includes metadata and a
  truthful no-script explanation; it does not server-render the full React interface.
- Build emits React Router's non-fatal "use client" directive notices in this entirely
  client-rendered app; production build and browser operation pass.
- Before enabling real inquiry collection, supply the receiving endpoint, operator
  contact/deletion path, retention policy and approved notice. Keep sensitive data out.
- Before an operating pilot: eight interviews, two replay permissions, a confirmed EVV
  route, a paid branch pilot commitment, signed data/security/human-oversight approvals
  and the state/workforce rule owners described on the site.
- CareKiln is a working brand; trademark clearance is not asserted. The purchased carekiln.com domain connection is pending.

MOTION REFERENCE
The user's Stripe recordings informed independent dashboard sequences, layered evidence
panels and staged holds. UI, copy and brand assets are original to this CareKiln concept.
GSAP reference: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/

OCTOBER 2026 MOTION / COLOUR REVISION
- Adapted the user-supplied Meridian Mist component in src/components/ui/meridian-mist.tsx.
- Warm persimmon/apricot and forest presets; no new dependencies or Tailwind migration.
- Shader starts near the viewport, sleeps offscreen/hidden, caps DPR at 1.25 and render rate at 30 fps; global pause and OS reduced motion freeze it. CSS fallback if WebGL2 is unavailable.
- Upright cards throughout, shutter button hovers, card depth, icon flip, staged source rows, travel chips and a continuously coloured homepage.
- Additional styling in src/motion-refresh.css.
