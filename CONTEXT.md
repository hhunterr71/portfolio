# Portfolio Site

A personal site unifying three areas — professional resume, project portfolio, and creative (photo/video) content — under one cohesive design and navigation, built as a static Astro site.

## Language

**Hub**:
The minimal-nav landing page at `/`. Introduces the person and links to Resume, Projects, and Creative with no traditional navbar — none of the three sections is "more home" than another.
_Avoid_: Home page (ambiguous with the Resume page, which some visitors think of as "home")

**Resume**:
The page covering About, Skills, and Employment History — the professional-background page, not the site's entry point.

**Project**:
A portfolio entry (software or hands-on engineering work) shown on the Projects page. Modeled as a Markdown content collection entry with a freeform `tags` array (e.g. `coding`, `engineering`, `craft`, `personal`, `professional`) driving in-page filter chips.
_Avoid_: Post (reserved for Creative content)

**Post**:
A Creative-page entry — photo(s) and/or an embedded video link, with an optional write-up. Modeled as a Markdown content collection entry, independent from Projects.
_Avoid_: Project

**Featured**:
A Post manually flagged (`featured: true`) to appear in the showcase row at the top of the Creative page, independent of how recent it is.
_Avoid_: Pinned, recent (featured is curated, not automatic)

**Tag**:
A freeform classifier on a Project (e.g. `coding`, `engineering`, `craft`, `personal`, `professional`) used for in-page chip filtering. Deliberately not a rigid single-value category — a Project can carry multiple tags across independent dimensions (what kind of work it is, and who it was for).
_Avoid_: Category (implies a single rigid classification, which was explicitly rejected)

## Visual Language

**Band**:
A full-width, alternating-color section used on the Hub and Resume pages, bounded by a Dimension Line. Confined to those two pages — Projects and Creative keep a single continuous background since their content is a filterable grid rather than discrete narrative sections.
_Avoid_: Section (too generic — every page has sections; Band specifically means a colored, bounded region)

**Dimension Line**:
The thin horizontal rule with perpendicular tick marks at each end, rendered in the sand accent color, marking the boundary between two Bands.
_Avoid_: Divider, seam

**Assemble-in**:
The entrance motion where page elements animate into place on load or scroll, evoking engineering parts coming together. Full/elaborate on the Hub; a lighter, consistent fade-and-slide version on Resume, Projects, and Creative. Disabled entirely under `prefers-reduced-motion`.
_Avoid_: Reveal animation, fade-in

**Water-light**:
The single ambient, continuously-looping accent effect, confined to the Hub hero Band, evoking light moving on water. The only motion on the site that doesn't stop once triggered. Disabled under `prefers-reduced-motion`.
_Avoid_: Hero animation, ambient background
