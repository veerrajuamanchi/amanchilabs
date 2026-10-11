# Amanchi Labs

The Amanchi Labs company website is a responsive React and TypeScript site built with Vite. Primary navigation is Overview, Products, Principles, and Contact. The Products panel presents WealthPrivate and DermaPrivate; their individual panels remain accessible at `/#wealth` and `/#derma`. All six panels use native hash routing.

## Local development

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Vite prints the local development URL. To create and inspect a production build:

```sh
npm run build
npm run preview
```

## Browser regression checks

One focused Playwright suite covers routing, history, keyboard navigation, the mobile drawer, responsive layouts, fonts, and real browser zoom. Install Chromium once, then run:

```sh
npx playwright install chromium
npm run test:e2e
```

To use an existing Google Chrome installation instead:

```sh
PLAYWRIGHT_CHANNEL=chrome npm run test:e2e
```

To check a running production preview, set `SITE_TEST_URL` to its URL. Without that variable, the test config starts Vite on port 5174. Screenshots and traces in `test-results` are ignored.

## Deployment

The site is static and can be deployed to Render Static Sites, Vercel, Netlify, or GitHub Pages. On Render, create a Static Site connected to the repository and use the settings below.

- Build command: `npm run build`
- Publish directory: `dist`

For GitHub Pages, configure the Pages workflow to install dependencies, run `npm run build`, and publish `dist`. The Vite base is `/` for custom domains and root deployments; set `base` in `vite.config.ts` to the repository path if publishing under a project subpath.

## Updating the portfolio

Public discovery copy lives in `src/site/panels/ProductsPanel.tsx`. Only WealthPrivate and DermaPrivate are featured. Do not advertise speculative products or infer privacy capabilities from marketing copy. Product implementation evidence and publication approval remain required; see `docs/reviews/product-claim-verification.md`.

The Contact panel links to `founder@amanchilabs.com` and `support@amanchilabs.com`. Local implementation approval does not authorize merge, push, or deployment.
