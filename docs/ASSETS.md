# Asset Provenance

## Landing Restoration, October 7, 2026

The landing artwork and original light/dark/Arabic screenshots were restored
byte-for-byte from revision `d813c89`. Newer journal covers and article figures
are retained. Complete historical prompts and capture sources are recorded in the
[original asset manifest](https://github.com/Lord-shaban/OpenDownload-Website/blob/d813c89ddd42af770ac367d20c46a89e9443b7fc/docs/ASSETS.md).

Restored landing assets:

- `coast-editorial.png`: generated lighthouse illustration, 1536x1024.
- `glass-ribbon.png`: generated glass artwork, 1672x941.
- `liquid-glass.png`: generated glass artwork, 1672x941.
- `open-glass.png`: generated glass artwork, 1536x1024.
- `earthrise-nasa.jpg`: original NASA Lunar Orbiter 1 photograph, 2738x3584.
  [Source and credit](https://science.nasa.gov/resource/earthrise/);
  [NASA image usage](https://www.nasa.gov/nasa-brand-center/images-and-media/).
- `workspace-light.jpg`: native English light capture, 1280x720.
- `workspace-dark.jpg`: native English dark capture, 1239x873.
- `workspace-arabic.jpg`: native Arabic/RTL capture, 1239x873.

The historical screenshots were captured on October 1, 2026, using the
[project-owned sample](https://raw.githubusercontent.com/Lord-shaban/OpenDownload/d187d89cf24eb1908ee0098550d806b9da58dd6a/tests/assets/sample.mp4).
Restored artwork and screenshots have a separate 10 MB budget; the newer 15
assets retain their existing 1.7 MB budget. CI checks both sets.

## Original Editorial Artwork

Six independent images were generated with the built-in `image_gen` tool, with
`transparent_background: false`. The four initial images were generated October
3, 2026; the photo and design studies followed October 4. The originals remain in
Codex's generated-images directory. Final project assets use WebP quality 86 at
the original 1536x1024 resolution. No cropping, compositing or UI fabrication was
performed. The glass artwork and test-pattern screenshots have since been restored.

| Asset in `public/images/`    | Used for                                 |  Bytes |
| ---------------------------- | ---------------------------------------- | -----: |
| `media-desk-v2.webp`         | Retained editorial hero asset            | 131178 |
| `sources-collection-v2.webp` | LinkedIn/Pinterest/Threads article cover | 268764 |
| `video-studio-v2.webp`       | Release article cover                    | 274478 |
| `audio-studio-v2.webp`       | Retained editorial audio asset           | 163594 |
| `photo-studio-v2.webp`       | Source article body                      | 299858 |
| `design-desk-v2.webp`        | Design article cover                     | 146118 |

Artwork illustrates creative media and is not evidence of downloaded content.
The real application is shown only in the separately captured screenshots below.
Typography and platform marks are rendered in code, never baked into generated art.

### Hero Prompt

> Create an original premium editorial photograph for the open-source media downloader OpenDownload website HERO. Wide landscape 3:2 composition. A real sunlit contemporary white studio desk seen from directly overhead, restrained authentic magazine art direction. Keep the LEFT HALF and top left almost completely clear pale white desk for black web typography overlay (do NOT add any words yourself). On the RIGHT HALF, an artfully organized fan of three physical photographic prints: a crisp deep teal ocean surfer seen from above, a vibrant red-orange architectural staircase with hard natural shadows, a close-up green botanical leaf. Beside these prints one pair of small black wired earphones and a dark compact memory card, physically plausible, all objects lying flat on the desk. Edge of a silver laptop keyboard only barely enters from the far right edge, NO screen and NO fictional UI. Rich real photographic details, visible paper grain and realistic shadow edges, cool clear daylight, confident red teal and charcoal accents against white. No floating objects, no glass blobs, no gradients, no 3D render, no sci-fi, no bokeh, no logos, no text, no watermark. The mood is practical creative ownership, saving meaningful media, beautifully organized tangible media library. Clean sparse composition with sufficient negative space.

### Source Collection Prompt

> Original editorial cover photograph for an article announcing LinkedIn, Pinterest and Threads media support in OpenDownload. Landscape 3:2. Three beautiful physical photo contact sheets laid on a bright white studio table in a deliberately balanced graphic arrangement: on left a blue cyan architectural portrait contact sheet, in center a red architectural stairway and botanical collage contact sheet, on right a charcoal black and white city street photography contact sheet. Thin real dark teal cotton thread connects their corners to a single tidy white archival storage box at lower center, visual metaphor of three sources into one saved collection. Strict flat lay, geometrically pleasing real objects, gentle natural studio light, subtle paper fibers, strong blue/red/green accents, premium independent magazine photography, no digital UI, no platform logos, absolutely no text, no floating or transparent glass objects, no futuristic decoration, no gradient blobs, no watermark. Objects large enough for a blog thumbnail. Highly creative but physically believable, crisp fine photography.

### Video Prompt

> Original editorial photograph, landscape 3:2, close view of a classic silver and black handheld cinema camera resting on a white desk beside three actual 35mm film strips showing vivid teal ocean waves and red sunlit architecture. Crisp material detail, physically plausible lens, natural daylight, restrained contemporary independent film magazine art direction, graphic diagonal composition with cool silver charcoal and saturated small teal/red accents, no lettering, no logos, no watermarks, no imaginary futuristic objects, no transparent glass sculptures, no floating objects. The photograph represents saving public video and a release of an honest open source software tool. Make it look like a real photographer arranged and shot these real objects, slightly imperfect beautiful paper edges.

### Audio Prompt

> Create a beautiful original premium music editorial photograph, landscape 3:2. Close-up overhead composition of minimalist black wired over-ear headphones on a white desk, a small metallic portable audio recorder with authentic physical buttons but no readable text, beside one deep coral red square record sleeve and a black vinyl record partially sliding out. Hard clear natural daylight, elegant simple geometric arrangement, tactile matte paper and machined aluminum textures, editorial photograph for an open source audio downloader, warm human creative studio but WHITE neutral dominant surface with strong red black accents, highly detailed credible photographed real objects, absolutely no words, letters, logos, watermark, no glowing equalizer overlays, no fictional digital UI, no 3D glass, no flying objects, no bokeh blobs. Rich but restrained color, minimal clutter.

### Photo Prompt

> Original editorial photograph, landscape 3:2. Two large photographic prints on a crisp white studio surface: one vividly detailed red architectural staircase and one deep emerald monstera leaf with raindrops, arranged as a precise creative diptych. A clean silver photographic loupe resting in bottom right corner and small black binder clip attaching print edges, tactile paper fibers. Shot straight overhead, graphic composition filling most of frame, sophisticated creative magazine quality, clear natural daylight, red and green complement with black minimal accents. No laptops, screens, fake UI, no text or logos, no floating objects or glass sculpture, no gradients, no watermark. Intended as a beautiful picture for an image collection/download feature. Keep geometry credible and simple, highly detailed photographic prints themselves.

### Design Prompt

> Original editorial design journal cover, landscape 3:2. A minimal artist's organized desk, photographed directly from overhead on a white neutral surface. Large white grid notebook open in the center with simple hand-drawn clean rectangle wireframe shapes only, ABSOLUTELY NO letters, no words, no fake digital UI. To left three physical rectangular color chips in dark forest green, vermilion red, cool charcoal black. To right a silver straight ruler and a black graphite pencil, top edge a small physical ocean blue photography print clipped to paper. Thoughtful visual composition about designing an honest calm open source media app, subtle tactile details, razor-sharp clear daylight, premium independent design magazine photography, realistic real materials, restrained vivid accents, no beige dominant color, no glass sculptures, no floating objects, no gradients, no logos, no watermark.

## Real Product Captures

Captured October 4, 2026 using the in-app browser at
[the public app](https://opendownload.lord.blitz.cloud/). The deployed application
is running real extraction, not fixture mode, from the source update merged in
[application PR #39](https://github.com/Lord-shaban/OpenDownload/pull/39).

Native JPEG outputs are retained without editing or compositing. Screenshot
dimensions are the returned bitmap dimensions, not invented device frames.
Desktop captures are 1065x927; phone captures are 375x811. The screenshots are
viewport captures, not claims that every part of the document fits in one screen.
These newer captures remain available for documentation and article figures.
The restored landing preview instead uses the original light/dark/Arabic captures.

| Capture                          | State                                                      |
| -------------------------------- | ---------------------------------------------------------- |
| `workspace-video-v2.jpg`         | Public Threads video, English light mode                   |
| `workspace-dark-v2.jpg`          | Same public video, English dark mode                       |
| `workspace-audio-v2.jpg`         | LinkedIn MP3 selection, English dark mode                  |
| `workspace-images-v2.jpg`        | Original project WebP image, English light mode            |
| `workspace-arabic-v2.jpg`        | Public Threads video, Arabic dark mode                     |
| `workspace-video-mobile-v2.jpg`  | Public Threads video, Arabic light mode on a phone         |
| `workspace-audio-mobile-v2.jpg`  | LinkedIn MP3 selection, English light mode on a phone      |
| `workspace-images-mobile-v2.jpg` | Original project WebP image, English light mode on a phone |
| `workspace-arabic-mobile-v2.jpg` | Original project WebP image, Arabic dark mode on a phone   |

Public source URLs used:

- Video: `https://www.threads.com/@pubity/post/Cxd59tZLMrd`
- Audio: `https://www.linkedin.com/posts/the-mathworks_2_what-is-mathworks-cloud-center-activity-7151241570371948544-4Gu7`
- Images: `https://raw.githubusercontent.com/Lord-shaban/OpenDownload/cafeee0eba57e9e90de4be4349b9f34b90f8e709/docs/assets/studio-prints.webp`

Source thumbnails and titles remain attributed in the real application. They are
third-party media, not endorsements. The image source is the project's own generated
`studio-prints.webp`, used for real original-image analysis. Original UI and the six generated
editorial assets are distinct from third-party source content.

## Brand Marks And Fonts

LinkedIn, Pinterest and Threads use unchanged Simple Icons 11.15.0 SVGs (CC0),
from the versioned npm package on jsDelivr. TikTok, Instagram, X, Facebook, Reddit,
SoundCloud and GitHub use Simple Icons 14.0.0; Vimeo uses 16.0.0. Names and marks
identify sources, retain their trademark ownership and do not imply partnership.
Notices remain in `public/licenses/`. Interface icons use Lucide. The OpenDownload
wordmark and 1200x630 Open Graph typography are code-native.
See [font provenance](FONTS.md) for local font licenses.
