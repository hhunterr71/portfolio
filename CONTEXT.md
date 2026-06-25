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
