# Product Website Design

## Editorial Refresh, October 2026

OpenDownload is presented as a practical tool for keeping public media. The
website uses white space, charcoal typography, a forest-green action color,
and original photography-style imagery with red, blue and green accents.
There are no floating glass objects, gradients, decorative browser frames,
autoplay, pointer tilt, invented testimonials or usage counts.

The wordmark remains `OpenDownload.` in both reading directions. Local Manrope,
DM Sans and Readex Pro fonts retain their existing licenses. Dark mode has its
own contrast tokens; the photographic hero retains a light, readable surface.

## Structure

- A full-width photographic hero identifies the product and opens the real app.
- The actual workspace appears before the source selector. Preview controls show
  video, audio, image collections and Arabic using real, uncomposited captures.
- Eleven source controls distinguish verified samples from conditional adapters.
- Three photographic media stories show video, audio and image use cases.
- Self-hosting, three journal stories, FAQ and the final action remain first-class.
- Documentation, articles, resources and navigation share the same typography,
  borders and restrained layout. Page sections are not floating cards.

## Accessibility And Performance

Native FAQ disclosure and mobile navigation support keyboard input. Source and
preview controls expose their selected state. Copy commands report success or
failure. Localized routes preserve the page and reading direction; theme
preference remains local. Motion is limited to a small hover effect, disabled
under reduced motion. All content remains visible without an intersection observer.

Generated artwork uses WebP at original 1536x1024 resolution. Product captures
retain their native JPEG bytes. Images have reserved dimensions, meaningful
alternative text, responsive sizing and lazy loading below the hero. CI verifies
image encodings, dimensions, nonblank pixels and a combined asset budget.

## Honest Product Boundaries

Screenshots are evidence of the real application, not generated mockups. Editorial
artwork is illustration, not proof of downloaded media. See [asset provenance](ASSETS.md).
The current source and public application include LinkedIn, Pinterest and Threads;
the immutable v0.1.0 release retains its original scope. Source availability is
not a guarantee that every URL works. YouTube, private, authenticated, paywalled
and DRM-protected content remain excluded. No external analytics were added.
