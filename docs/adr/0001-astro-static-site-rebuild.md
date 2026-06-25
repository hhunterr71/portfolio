# Rebuild on Astro instead of plain static HTML/CSS/JS

The site is currently a single hand-written `index.html` (Bootstrap + jQuery) where every new project means copy-pasting ~80 lines of accordion markup. We're rebuilding on Astro to get components and Markdown content collections for Projects and Creative posts, while still shipping plain static HTML/CSS/JS to GitHub Pages with zero runtime framework cost. Considered staying with plain HTML for simplicity, but the repeated-markup problem would only get worse as more projects and creative posts are added.
