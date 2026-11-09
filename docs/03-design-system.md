# 03 — Design system

## Brand

Brand: Heroic Tales. Tagline: “Every Hero Has a Story”. Direction: tactile fantasy character journal.

The primary experience should feel like the user is physically writing a character into an old adventure book. The interface uses an aged-paper reading surface, clear writing areas, restrained ink-like controls, and a sourcebook-inspired hierarchy. It should feel authored and tactile without becoming cluttered or imitating a specific published book layout.

Use the exact H/T intertwined serif monogram supplied by the user: antique gold lettering on a deep purple-black background. Do not redesign it or add swords, shields, crests, magical circles, runes, or decorative substitutes.

## Official logo usage

The supplied image is the authoritative Heroic Tales logo reference: an intertwined serif H/T monogram in Antique Gold on the Brand Background (`#100C20`). The image must be used as provided, preserving its letterforms, proportions, colors, and negative space.

Approved uses include the Next.js site header, landing page, authentication surfaces, loading/splash state, and other brand-level surfaces. The logo may be placed over the Brand Background or an equivalent approved dark brand surface. It must not be placed over the Old Parchment writing canvas unless a future logo variant is explicitly approved.

Do not redraw, retype, trace, animate, recolor, crop into a new mark, add effects, or combine the logo with swords, shields, crests, circles, runes, borders, or other ornaments. The canonical asset file, responsive variants, minimum size, clear-space rule, and light-background variant are `TBD`; until then, agents must use the supplied asset without modification and must not invent a replacement.

## Tokens

| Token | Value | Intended use |
|---|---|---|
| Brand Background | `#100C20` | Logo, navigation, and dark brand surfaces |
| Midnight Stone | `#17191D` | Elevated dark surfaces |
| Dark Slate | `#292B30` | Borders and secondary surfaces |
| Antique Gold | `#B99755` | Brand accent and focus treatment |
| Old Parchment | `#E9DFC9` | Primary page background and writing surface |
| Muted | `#A5A5A5` | Secondary text on dark surfaces, subject to contrast checks |
| Royal Burgundy | `#713B3D` | Destructive or warning-adjacent accent, subject to contrast checks |
| Forest Green | `#496052` | Success and accepted-state accent |

Typography uses Cinzel for headings/branding and Inter for interface/body text. Font delivery and fallback stack are `TBD`.

## Old-paper writing experience

The default character-creation canvas should use Old Parchment as its background rather than a dark full-page background. The visual treatment should suggest a well-used fantasy journal:

- Use a warm parchment field with a very subtle paper grain or tonal variation. Texture implementation and asset source are `TBD`; it must remain lightweight, accessible, and optional for users who prefer reduced visual effects.
- Use dark ink-like text with Antique Gold, Royal Burgundy, and Forest Green for restrained accents and state changes.
- Present major wizard stages as pages or sections of a character journal, with generous writing space and clear margins.
- Make text inputs feel like intentional writing areas: calm surfaces, visible focus states, comfortable line height, and enough height for free-form character notes.
- Keep controls modern and legible. Avoid excessive scrollwork, faux handwriting for body text, ornamental borders, parchment stains that reduce contrast, or decorative elements that compete with the user’s writing.
- Use the exact H/T monogram on the dark Brand Background treatment where branding is shown; do not place an altered or newly ornamented version on the paper canvas.

## Sourcebook-inspired hierarchy

Cinzel should establish chapter titles, wizard stage names, and brand moments. Inter remains the primary typeface for instructions, labels, inputs, AI suggestions, validation, and body content. A display scale, line-height scale, page width, paper texture, and any handwriting accent font are `TBD` and must be decided with accessibility testing.

The visual language may take broad inspiration from classic tabletop fantasy sourcebooks—chapter structure, ink-and-paper contrast, editorial spacing, and restrained gold accents—but must not reproduce a specific publisher’s trade dress, illustrations, page templates, or protected logo treatment. Licensing and exact reference boundaries are `TBD`.

## Character-writing states

The design system must make authorship visible:

| State | Visual intent |
|---|---|
| Draft | Paper writing surface with a neutral ink treatment and clear unsaved indicator |
| AI suggestion | Distinct inset card or annotation treatment, clearly labeled as a suggestion |
| User-edited | Same writing surface with visible user ownership and no claim of official status |
| Accepted | Forest Green state treatment with an explicit accepted action result |
| Rejected | Muted, collapsed, or hidden suggestion that remains recoverable through history where supported |
| Approved | Strong but restrained border/marker indicating authoritative character information |

Exact components and state tokens are `TBD` until the frontend architecture task defines them.

## Interaction guidance

Every AI result must visually distinguish suggested, user-edited, accepted, rejected, and approved states. Responsive behavior, spacing scale, component catalog, and exact accessibility conformance are `TBD`; do not invent them in a task without recording a decision. Contrast must be checked for parchment text, dark brand surfaces, gold accents, and all state treatments.
