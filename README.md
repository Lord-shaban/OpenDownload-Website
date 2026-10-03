# OpenDownload website

The standalone product website for [OpenDownload](https://github.com/Lord-shaban/OpenDownload).
[Live website](https://opendownload-website.vercel.app/en) · [العربية](https://opendownload-website.vercel.app/ar)

It contains a landing page, an interactive source guide, actual product screenshots, documentation, blog,
security, privacy, changelog and community pages in English and Arabic.

This is a **separate project**, served by Vercel. It has no downloader API,
extractor, download storage or dependency on the application's workspace.
The Open app action opens [the real application](https://opendownload.lord.blitz.cloud/).
YouTube remains outside OpenDownload v0.1.

The source guide now includes LinkedIn, Pinterest and Threads, with a bilingual
[announcement](https://opendownload-website.vercel.app/en/blog/linkedin-pinterest-threads)
dated October 3, 2026. These adapters require the current application source;
the website does not deploy the downloader and does not change v0.1.0 images.

## Develop

Node.js 24 and pnpm 11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3100. All 30 content routes are generated at build time.
English is `/en`, Arabic is `/ar`; switching language preserves the current page.
Content lives in `lib/content.ts`, resource pages in `components/resources.tsx`.
Blog posts carry their own publication dates, cover choices and source links.
`components/journal-card.tsx` renders the same post data on the landing page and
blog index; article metadata and the sitemap include the new bilingual routes.

## Verify

```sh
pnpm lint
pnpm build
pnpm typecheck
pnpm exec playwright install chromium
pnpm exec playwright test
pnpm audit --prod --audit-level high
```

The browser suite covers desktop/mobile, both locales, theme persistence,
source details, motion pause, preview controls, FAQ, documentation search, copy feedback, navigation,
all routes/canonicals, 404s, reduced motion and horizontal overflow.
These website checks do not certify media-source uptime.

## Vercel

Import this repository as its own Next.js project. Root directory: repository
root. Build: `pnpm build`. No API credentials, database or paid resources are
required. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS production origin when
using another domain; it is included in canonicals, language alternatives and
the sitemap. `/opengraph-image` creates the social card.

```sh
vercel link
vercel deploy
# After verification:
vercel deploy --prod
```

Git integration builds previews on branches and production from main.
Never commit `.env*`, `.vercel`, generated OIDC tokens or deployment credentials.

## Design and assets

- [Design notes and references](docs/DESIGN.md)
- [Asset sources and generation prompts](docs/ASSETS.md)

The logo is the text **OpenDownload.** only. Actual UI screenshots are separated
from decorative generated glass artwork. Two decorative hero cards float with a pause control; they stop outside the
viewport and under reduced motion. Other motion is finite. No newsletter, invented metrics or third-party
analytics scripts are added.

MIT applies to this project's original code. Upstream fonts and libraries retain
their own licenses. Manrope, DM Sans and Readex Pro use the SIL Open Font License; license notices
are in `app/fonts/`. Geist Mono retains its upstream font license. Brand icons
use Simple Icons (CC0). See [font provenance](docs/FONTS.md).
