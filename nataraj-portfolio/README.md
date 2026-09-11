# Nataraj Javvaji — Portfolio site

A single scrolling portfolio (`index.html`) with one deep-dive case study
(the Centrica project) built as an in-page view rather than a separate file,
so the whole site works from one HTML/CSS/JS bundle with no build step.

## File structure

```
nataraj-portfolio/
├── index.html            # the whole site: 9 sections + the case study view
├── styles.css            # design tokens + all styles
├── script.js             # nav, scroll reveals, case-study open/close
├── README.md             # this file
├── resume/
│   └── NatarajJavvaji_Resume.pdf   # linked from the "Résumé ↓" nav pill
└── assets/
    └── work/              # drop real project thumbnails here (see below)
```

## Running it locally

No build step. Open `index.html` in a browser, or serve the folder:

```
cd nataraj-portfolio
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

Push the folder to a GitHub repo and turn on **GitHub Pages** (Settings →
Pages → deploy from branch), or drag the folder into **Netlify**. No
framework, no build command needed.

## Replacing the placeholder thumbnails

The six project cards in "Selected work" currently use simple abstract SVG
placeholders (drawn inline in `index.html`) instead of real screenshots,
because the source portfolio's images live on WordPress.com and weren't
available to pull in directly. To swap in the real work:

1. Save real screenshots from `https://natarajj.wordpress.com/portfolio/`
   (or newer project shots) into `assets/work/`.
2. In `index.html`, find the `.work-thumb` block for that project and
   replace the inline `<svg>...</svg>` with an `<img src="assets/work/your-file.jpg" alt="...">`.
3. Keep the 16:10 aspect ratio for the grid to stay aligned — `object-fit: cover`
   is already set up if you add `.work-thumb img { width:100%; height:100%; object-fit:cover; }`
   to `styles.css`.

## Adding a second full case study

The Centrica case study lives entirely inside `index.html`, as a
`<div class="case-view" id="caseCentrica">…</div>` that's hidden until its
work card is clicked (see `script.js`, the `caseViews` map). To add another:

1. Duplicate the `case-view` block and give it a new `id`, e.g. `caseVirgin`.
2. Add `virginmobile: document.getElementById('caseVirgin')` to the
   `caseViews` object in `script.js`.
3. On the matching work card in the "Selected work" grid, change the link
   to `<a class="work-card" data-case="virginmobile">`.

## Updating the résumé

Replace `resume/NatarajJavvaji_Resume.pdf` with a new export — the nav
pill link doesn't need to change as long as the filename stays the same.

## Content checklist before going live

- [ ] Swap placeholder SVG thumbnails for real project imagery
- [ ] Confirm every metric mentioned is real (none are currently claimed —
      no adoption/impact numbers were available in the source material)
- [ ] Add real "Thinking" articles once written (the section currently
      says "More writing coming soon")
- [ ] Add LinkedIn / Behance / Dribbble links in the Contact section once
      you have the URLs — they were intentionally left out rather than
      guessed
- [ ] Re-check the résumé PDF opens correctly from the nav pill
- [ ] Test at 375px mobile width
