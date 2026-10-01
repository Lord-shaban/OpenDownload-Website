# Contributing to the website

Use a focused branch and pull request. Run lint, build, typecheck and the browser
suite before requesting review. Keep translations, metadata and localized route
links aligned. Product capability claims must match the released application's
documentation and actual evidence. Never imply every extractor URL works.

This repository deploys the product website, not the download engine. Application
changes belong in [OpenDownload](https://github.com/Lord-shaban/OpenDownload).

Prefer server-rendered static content. Add client components only for interaction.
Preserve reduced-motion behavior, keyboard access, visible focus, contrast,
English/Arabic layout and a useful no-JavaScript fallback. Keep assets local and
document their provenance and image prompts in `docs/ASSETS.md`.

Do not commit build outputs, environment files or Vercel credentials. Do not
change the application's release tag as part of a website update. CI must pass
on the current PR commit; identify solo maintainer review when applicable.
