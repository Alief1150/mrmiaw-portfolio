# DESIGN.md — MrMiaw Portfolio + Commission Site

> Reading this as: `single-page artist commission book` for `Roblox players and game owners who buy thumbnails and icons`,
> in a `dark cinematic editorial, artwork-first` visual language, dial ENERGY 2 / RHYTHM 3 / MOTION 1.

## Visual concept

An online commission book, not a developer portfolio. The GFX artwork supplies nearly all
color and visual interest. The surrounding UI is a quiet charcoal mount with gold identity
details, like a gallery frame: present everywhere in small doses, never louder than the art.

One memorable thing: full-bleed real GFX as the hero and oversized featured pieces.
Everything else defers to the artwork.

## Palette (gold / charcoal, from the MrMiaw character reference)

| Token        | Hex       | Use |
|--------------|-----------|-----|
| Ink/canvas   | `#11100E` | page background |
| Deep charcoal| `#24211D` | section surfaces, header |
| Warm charcoal| `#342E27` | borders, raised surfaces |
| Primary gold | `#E6C552` | accents, active states, key text highlights (large text only) |
| Bright gold  | `#F2DC73` | gradient start, focus rings, status dot |
| Amber midtone| `#B9802F` | gradient mid, secondary detail |
| Warm off-white| `#F4F0E5`| headings and body text |
| Muted text   | `#A7A095` | secondary text (checked 4.5:1+ on ink) |

Accent gradient (identity detail only, never a wash):

```css
linear-gradient(110deg, #F2DC73 0%, #D7AA43 38%, #9A6828 66%, #2A2520 100%)
```

Allowed gradient uses: 3px active-nav indicator, primary CTA hover/focus ring,
commission-status dot edge, gallery selected edge, thin dividers. Body copy never sits
directly on the gradient. No blue/purple/cosmic gradients anywhere.

## Typography

- Display: **Anton** (condensed poster grotesque, Google Fonts, via `next/font`).
  Reason: Roblox thumbnails and game key art use heavy condensed block type; the
  headlines echo the artwork's own vernacular instead of fighting it.
- Body/UI: **Archivo** (same superfamily as Anton, regular/medium/semibold).
  Reason: clearly related pairing, highly legible at small sizes, neutral enough to
  let the art lead.
- One `h1` (hero). Sentence case everywhere. No italic accent words, no tracked-out
  all-caps eyebrow labels, no `01 / 02 / 03` numbering (sections are not a sequence).
- Body 16-18px, line-height 1.6, max line length ~68ch.

## Spacing, container, grid

- Container max 1200px, side padding 20px mobile / 32px desktop.
- Sections separated by whitespace, not alternating background flips. One section
  (pricing) uses the deep-charcoal surface for contrast; the rest sit on ink.
- Featured work: oversized alternating editorial rows (image 7 cols / caption 5 cols).
- Gallery: mixed contact-sheet grid. Landscape spans 2 columns on desktop, squares take
  1 column. No uniform card spans, no SaaS bento with arbitrary tiles.
- Radius: images 4px, buttons 999px (pill = single deliberate shape for actions),
  surfaces 10px. Not everything shares one radius.

## Artwork treatment

- Source of truth `/GFX` untouched. Web copies live in `/public/gfx` (compressed only
  if quality stays representative).
- `next/image` everywhere, correct dimensions, `sizes` set, lazy below the fold.
- Preview cards use `object-cover` with per-image `object-position` so faces, focal
  characters, and logos are never cropped out.
- Lightbox shows the full uncropped original (`object-contain`), dark backdrop,
  Escape to close, prev/next buttons, focus management, background scroll lock.

## Navigation

Slim fixed bar: ink background with bottom hairline, monogram mark + "MrMiaw" left,
anchors (Work, Services, Pricing, About) center/right, gold `Commission` button right.
Active link gets a 3px gold underline bar. Mobile: hamburger toggling a full-width
panel (no hover dependency). Smooth anchor scrolling via Lenis with reduced-motion
fallback to native behavior.

## Buttons

- Primary: solid primary-gold fill, ink text, pill shape. Hover/focus: thin gradient
  ring. Label always names the action ("Commission on Discord", "View work").
- Secondary: transparent with warm-charcoal border, off-white text.
- Minimum touch target 44px. Visible gold focus ring on all interactive elements.

## Motion (MOTION 1)

- Lenis smooth scroll (disabled when `prefers-reduced-motion` is set).
- One controlled hero entrance (artwork settles, title rises once).
- Gallery hover: single 200ms image scale (1.03) on pointer devices only.
- Lightbox: 180ms fade/scale open and close.
- No scroll-reveal on every section, no marquees, no parallax, no loaders,
  no cursor effects.

## Gallery rules

- All 26 pieces browsable. Featured section curates 4-5 strongest cinematic scenes.
- Mixed orientation respected: landscape stays landscape, squares stay square.
- No title overlay that hides the art; caption sits below the frame.
- No fake clients, no invented descriptions. Titles derived from filenames.
- Touch: everything tappable, nothing hover-gated.

## Responsive

- 390px: single column, full-width frames, sticky bottom commission bar considered;
  final choice is a persistent commission button in the header plus final CTA section
  (simpler, no viewport theft). Header CTA always visible.
- 768px: two-column gallery, featured rows stack image over caption.
- 1024px+: full editorial grid, alternating featured rows.
- Never any horizontal overflow; crops rechecked at mobile widths.

## Accessibility

- Landmarks: header, main, footer. Logical heading order, one `h1`.
- Alt text describes what is actually visible in each piece.
- Lightbox is a `dialog` with labelled controls, Escape closes, focus returns to the
  opener, background inert while open.
- Icon-only controls (copy username, lightbox arrows, menu) have `aria-label`s.
- Contrast 4.5:1 minimum for body text; muted text only on ink.
- Discord username copy button announces "Copied" via live region.
- `prefers-reduced-motion` disables Lenis smoothing and entrance motion.

## Anti-patterns explicitly rejected

Blue/purple neon gradients, glow-everywhere, glass navbar, identical rounded cards,
eyebrow labels, numbered sections, italic headline words, monospace data labels,
fake stats/testimonials/clients, marquee text, fade-up on every section, generic
"creative developer" copy, em dashes in copy, generic CTAs ("Get started"),
blue-purple palette from the discarded design-system search, Inter-everywhere type.

## UI/UX Pro Max searches used

- `Roblox GFX artist portfolio commission dark cinematic editorial image-led`
  (result rejected: indigo/green SaaS system, wrong palette, wrong pattern).
- `dark editorial gallery portfolio display typography condensed serif artist`
  (accepted direction: condensed display type for artist identity).
- `cinematic gold amber dark luxury gallery lightbox minimal`
  (accepted: Swiss restraint, low motion cost, strict focus/keyboard checklist).

## Dials

ENERGY 2 (confident poster voice, artwork does the shouting), RHYTHM 3 (hero bleed,
editorial rows, contact-sheet grid, list, ledger, letter, finale all differ),
MOTION 1 (scroll smoothing plus small state transitions only).
