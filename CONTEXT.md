# Portfolio Site

A personal site unifying three areas — professional resume, project portfolio, and creative (photo/video) content — under one cohesive design and navigation, built as a static Astro site.

## Language

**Hub**:
The landing page at `/`. Introduces the person and links to Projects and Creative, with the Résumé reachable only as a footer PDF link (see below). As of the terminal/console redesign, it carries the same persistent NavBar as Projects and Creative — it is now a long-scroll page (hero, methodology, project previews, personal section, footer) rather than a single-screen landing view, so it needs on-page wayfinding like the other pages.
_Avoid_: Home page

**Résumé**:
As of the terminal/console redesign, no longer a site page. It's a downloadable PDF file, linked from the Hub's footer (and nowhere else in the nav). The Hub itself now carries the professional-credibility content (Consulted-With, Methodology, Projects) that the old Resume page used to hold — the site is a single hub aimed at landing consulting/contract work, not a traditional personal-site-plus-resume-page structure.
_Avoid_: Resume page, About page (the page no longer exists — don't reintroduce a route for it without an explicit decision to do so)

**Project**:
A portfolio entry (software or hands-on engineering work) shown on the Projects page. Modeled as a Markdown content collection entry with a freeform `tags` array (e.g. `coding`, `engineering`, `craft`, `personal`, `professional`) driving in-page filter chips.
_Avoid_: Post (reserved for Creative content)

**Post**:
A Creative-page entry — photo(s) and/or an embedded video link, with an optional write-up. Modeled as a Markdown content collection entry, independent from Projects.
_Avoid_: Project

**Featured**:
A manual curation flag (`featured: true`), independent of recency or Rank. On a Project, it means appearing in the Hub's Selected Projects section (exactly 6, hand-picked — a Project can rank well and still not be Featured, e.g. Portfolio Site Rebuild, which is deliberately left off the Hub as too self-referential for a consulting-facing highlight reel). On a Post, the field still exists in the schema but as of the terminal/console redesign has no visual effect — the Creative page is now a single date-sorted list with no Showcase row.
_Avoid_: Pinned, recent (featured is curated, not automatic)

**Rank**:
The manually curated ordering across all Projects (stored in the existing `order` field), driving the default sort on the Projects archive page. Independent of chronological date and independent of Featured — a Project's Rank position has no bearing on whether it's Featured on the Hub.
_Avoid_: Order by date, priority (Rank is a deliberate curation, not automatic)

**Tag**:
A freeform classifier on a Project (e.g. `coding`, `engineering`, `craft`, `personal`, `professional`, `hardware`) used for in-page chip filtering. Deliberately not a rigid single-value category — a Project can carry multiple tags across independent dimensions (what kind of work it is, and who it was for). `hardware` specifically signals embedded/physical computing projects distinct from pure software or mechanical engineering work.
_Avoid_: Category (implies a single rigid classification, which was explicitly rejected)

## Visual Language

**Section Marker**:
Retired Band and Dimension Line in the terminal/console redesign. A numbered eyebrow label (e.g. "02 — METHODOLOGY", "03 — SELECTED PROJECTS") paired with a hairline rule, replacing the old alternating-color Band structure. Used on the Hub to divide its long-scroll content into named, numbered regions. The whole site now sits on a single continuous dark background — no page uses alternating-color bands anymore.
_Avoid_: Band, Dimension Line (retired terms — the site no longer has alternating-color sections; don't reintroduce without an explicit decision to do so)

**Assemble-in**:
The entrance motion where page elements animate into place on load or scroll. Survives the terminal/console redesign as-is (fade-and-slide mechanics, `prefers-reduced-motion` handling) — only its visual theming changes to match the new dark palette, not its behavior. Used below the Hub's hero (Methodology, Selected Projects, Outside the Blueprint) and on Projects and Creative.
_Avoid_: Reveal animation, fade-in

**Water-light**:
Retired by the terminal/console redesign. Was the single ambient, continuously-looping accent effect confined to the Hub hero, evoking light moving on water. Replaced by two new Hub-hero-only effects: **Boot Sequence** (one-time typed-text intro, see below) and **Scrolling Data** (the continuous ambient replacement, decorative/randomized telemetry-style text drifting behind the hero).
_Avoid_: Hero animation, ambient background

**Boot Sequence**:
The Hub hero's one-time entrance: name and role lines type out character-by-character (role lines faster than the name), a blinking cursor that stops once typing finishes, then a `// READY` line and scroll-down cue fade in. Plays on every page load (not gated to once-per-session). Skippable — a scroll or keypress before it finishes jumps straight to the finished state. Under `prefers-reduced-motion`, skips straight to the finished state with no typing animation, consistent with how Assemble-in behaves elsewhere.
_Avoid_: Typewriter effect, hero animation (ambiguous with Scrolling Data)

**Scrolling Data**:
The Hub hero's continuous ambient background effect — decorative, randomized telemetry-style text (fake sensor readings) drifting slowly, replacing Water-light as the site's one continuously-looping accent. Confined to the Hub hero. Disabled under `prefers-reduced-motion`.
_Avoid_: Hero animation, ambient background, telemetry (it is not real data — purely decorative)
