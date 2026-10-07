# Product Website Design

## Previous Landing Restored, October 7, 2026

At the owner's request, the landing layout, shared visual tokens, media scene,
motion behavior and product preview have been restored from `d813c89`, the
revision immediately before the editorial redesign. This is a presentation
rollback, not a rollback of supported sources or application documentation.

The restored design uses the original lavender/charcoal palette, glass artwork,
animated illustrative media scene, source selector, light/dark/Arabic screenshots,
media bento, self-hosting section, journal, FAQ and final action. No invented
testimonials or usage counts are added.

The wordmark remains `OpenDownload.` in both reading directions. Local Manrope,
DM Sans and Readex Pro fonts retain their existing licenses. Dark mode has its
own contrast tokens. The original application README and Arabic guide are unchanged.

## Structure

- The original hero and animated illustration open the real app.
- The source selector precedes the actual workspace. Preview controls show
  light, dark and Arabic views using the original real, uncomposited captures.
- Eleven source controls distinguish verified samples from conditional adapters.
- The media bento shows video, audio and image use cases.
- Self-hosting, journal stories, FAQ and the final action use the previous layout.
- Newer original journal covers and article figures remain available.
- Documentation, articles, resources and navigation share the same typography,
  shared visual tokens restored from the previous revision.

## Accessibility And Performance

Native FAQ disclosure and mobile navigation support keyboard input. Source and
preview controls expose their selected state. Copy commands report success or
failure. Localized routes preserve the page and reading direction; theme
preference remains local. The hero animation can be paused, stops offscreen and
respects reduced motion. Reveal effects use the restored intersection observer.

Historical landing artwork and JPEG screenshots were restored byte-for-byte from
Git. Newer WebP artwork and product captures are retained for the journal,
documentation and provenance. Their 1.7 MB budget is checked separately from the
restored historical assets' 10 MB budget. CI checks encodings, dimensions and
nonblank pixels for both sets.

## Honest Product Boundaries

Screenshots are evidence of the real application, not generated mockups. Editorial
artwork is illustration, not proof of downloaded media. See [asset provenance](ASSETS.md).
The current source and public application include LinkedIn, Pinterest and Threads;
the immutable v0.1.0 release retains its original scope. Source availability is
not a guarantee that every URL works. YouTube, private, authenticated, paywalled
and DRM-protected content remain excluded. No external analytics were added.
