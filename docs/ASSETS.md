# Asset provenance

## Source update, October 3, 2026

LinkedIn, Pinterest and Threads brand masks are unchanged Simple Icons 11.15.0
SVGs (CC0), retrieved from the versioned npm package on jsDelivr:
`https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/{linkedin,pinterest,threads}.svg`.
They identify the sources; no affiliation is implied. The new article cover
reuses `liquid-glass.png` with HTML source labels and these masks.

## Actual product captures

Captured on 2026-10-01 using the in-app browser at
https://opendownload.lord.blitz.cloud/, reporting v0.1.0 and real mode:

- `public/images/workspace-light.jpg`: actual English light workspace, 1280×720.
- `public/images/workspace-dark.jpg`: actual English dark analysis, 1239×873.
- `public/images/workspace-arabic.jpg`: same analysis in Arabic/RTL, 1239×873.

The analyzed video is the project's owned test pattern:
https://raw.githubusercontent.com/Lord-shaban/OpenDownload/d187d89cf24eb1908ee0098550d806b9da58dd6a/tests/assets/sample.mp4

Captures are native JPEG outputs, retained without compositing or image edits.
Decorative browser frames and preview controls are HTML/CSS. No fixture screenshot
or invented generated interface is presented as the actual product.

## Generated artwork

Generated with the built-in **image_gen** model, copied into this standalone
project, with originals retained in Codex's generated-images directory. Artwork
is decorative; it does not prove application behavior. Text overlays are HTML.

### `public/images/glass-ribbon.png`

Final prompt:

> Use case: stylized-concept. Asset type: original hero artwork for OpenDownload open-source product landing page, wide landscape 16:9. Create an exquisitely quiet premium 3D material study: flowing translucent frosted-glass ribbons curl into a loose open loop across the lower half, suspended over a very light pearlescent lavender studio background. Subtle lilac and periwinkle refraction, soft natural diffused lighting, fine silky surfaces, light grain, elegant spacious composition. Top third and center mostly clear pale negative space for a real application screenshot to be layered later in code. Modern desktop-glass aesthetic, restrained editorial art direction. No screens, devices, interface, typography, logos, symbols, letters, numbers, watermarks, hands or people. This is background art, not a UI mockup. Preserve broad usable empty central area, avoid saturated purple, neon, chrome metallic gloss or dark space imagery.

### `public/images/open-glass.png`

Final prompt:

> Use case: stylized-concept. Asset type: editorial blog cover for the OpenDownload open-source media product, landscape 3:2. A sculptural open translucent violet glass ring resting upright on a matte dark charcoal plinth, one delicate translucent sheet passing through the ring, evoking media flowing freely and a clear open-source system. Premium studio product photograph rendered in 3D, very quiet composition, low contrast charcoal background, carefully lit lavender edges and diffuse soft lilac bounce light. Fine frosted texture, subtle organic asymmetry, wide negative space at left for editorial headline layered later in code. No screens, devices, arrows, UI, symbols, text, letters, numbers, logos, people, watermark, neon, chrome or galaxy effects. Cohesive with a pale lavender frosted-glass ribbon website hero. Single sculptural composition, sophisticated minimal open-source launch editorial aesthetic.

## Reusable image treatments

`Showcase` supplies the actual screenshot frame, view switch and caption.
`journal-image` supplies two editorial cover templates: dark release/wordmark and
pale design/title. Replace source image and HTML title together; keep alt text
for meaningful media and empty alt for purely decorative art. Dynamic Open Graph
cards use code-native typography at 1200×630.

The wordmark and vector interface icons are code-native, not generated bitmaps.

## Additional liquid glass and media assets

### `public/images/liquid-glass.png`

Final prompt:

> Original premium 3D background artwork for OpenDownload, a public media download product. Landscape 16:9. A large clear liquid glass loop bends into a flowing folded sheet, physically accurate strong refraction, rounded polished glass edges, transparent center, delicate lavender and ice blue highlights, small peach caustic, resting over a lilac-to-warm-pearl studio surface. Composition on right two thirds, left quarter calm but not blank white, luminous depth, tactile translucent glass, editorial product photography quality, contemporary desktop liquid glass material. Broad central area to layer real HTML cards later. No typography, UI, screens, devices, icons, logos, letters, arrows, people or watermarks. Clear refractive glass, not matte frosted plastic, no chrome or neon. Sophisticated, dramatic yet airy.

### `public/images/coast-editorial.png`

Final prompt:

> Original editorial nature photograph for media library illustrations on the OpenDownload product website. Landscape 3:2. A solitary cream lighthouse on a lush green headland above deep teal Atlantic ocean, soft distant surf, lavender dusk sky, tiny warm interior light, shot on medium format film, organic grain, striking tasteful contemporary travel photography, rich teal, muted lilac and earthy olive palette, believable natural detail, pleasing asymmetrical composition with lighthouse at right third, no people, no text, logos, screens, watermarks, borders or graphic overlays. This is an original photographic-style illustrative asset, not a screenshot.

The coast is generated illustrative media, not a claimed downloaded video.
The hero explicitly labels its media illustration; actual app screenshots are
presented separately. Original generated files are retained in Codex.

### `public/images/earthrise-nasa.jpg`

Real photograph, credit NASA, Lunar Orbiter 1. Source and visible credit:
https://science.nasa.gov/resource/earthrise/
Downloaded from the image link on that page on 2026-10-01; original bytes retained.
No NASA endorsement or affiliation is implied.

## Brand icons

TikTok, Instagram, X, Facebook, Reddit, SoundCloud and GitHub use original
Simple Icons 14.0.0 vectors (CC0). Vimeo uses Simple Icons 16.0.0 (CC0):
https://github.com/simple-icons/simple-icons/blob/16.0.0/icons/vimeo.svg

The names and marks identify media sources. They do not imply partnerships.
They retain their respective trademark ownership. Generic interface controls
use Lucide; direct URLs use a link icon. OpenDownload's own logo is its name
followed by the accent period.

NASA usage reference: https://www.nasa.gov/nasa-brand-center/images-and-media/
Icon license notices are retained in `public/licenses/`.
