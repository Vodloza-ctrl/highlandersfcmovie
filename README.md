# Bosso Movie — bossomovie.com

Official website for **Born into the Black and White** ("The Bosso Movie"), an officially licensed Highlanders Football Club feature film produced by Ya-Sibo Media (Private) Limited, trading as Junza Studios, in co-production with the club.

The site does three jobs:

1. **Builds awareness** of the film (homepage, story teaser, community pop-ups, theme song, press links).
2. **Sells brand partnerships** (`partners.html`): partnership tiers, on-screen placement rate card, downloadable prospectus and rate cards, partner enquiry form.
3. **Sells fan and diaspora packages** (`fan-access.html`): local and diaspora packages, the public Wall of Bosso, downloadable brochures.

It is a static site (plain HTML, CSS and vanilla JavaScript). There is no build step, no framework and no package manager.

---

## Contents

- [Quick start](#quick-start)
- [Project structure](#project-structure)
- [Pages](#pages)
- [Contacts and key facts](#contacts-and-key-facts)
- [Where dates appear](#where-dates-appear)
- [Pricing visibility rules](#pricing-visibility-rules)
- [JavaScript features](#javascript-features)
- [Backend, forms and the Wall of Bosso](#backend-forms-and-the-wall-of-bosso)
- [Styling and design tokens](#styling-and-design-tokens)
- [PDF downloads](#pdf-downloads)
- [Images and media](#images-and-media)
- [SEO, sharing and sitemap](#seo-sharing-and-sitemap)
- [Deployment](#deployment)
- [Common edits: step by step](#common-edits-step-by-step)
- [Pre-publish checklist](#pre-publish-checklist)
- [Known open items](#known-open-items)

---

## Quick start

Because the site is static, you can preview it without installing anything.

```bash
# from the repository root
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly in a browser also works, with two exceptions: the partner form and the Wall of Bosso call a live API (see below), and the `/media/` route only exists when deployed.

---

## Project structure

```
.
├── index.html                  Homepage
├── partners.html               Brand partnerships, rate card, partner enquiry form
├── fan-access.html             Fan and diaspora packages, Wall of Bosso
├── style.css                   All styling for all pages
├── script.js                   All behaviour for all pages
├── favicon.ico / favicon.svg   Site icons
├── robots.txt                  Allows all crawlers, points to the sitemap
├── sitemap.xml                 Generated automatically (see SEO section)
├── assets/
│   ├── poster.png              Official artwork (hero + share image)
│   ├── highlanders-logo.svg    Club crest (nav, logo rows)
│   ├── junza-studios-logo.webp Studio logo
│   ├── theme-song.mp3          "TSHILA" by Boy Nino (floating player)
│   ├── favicon/                apple-touch-icon.png
│   ├── carousel/               Slide graphics for partners and fan carousels
│   ├── popups/                 Community pop-up photos (pop-01 … pop-07)
│   └── *.pdf                   Five downloadable PDFs (see PDF section)
├── functions/media/[[path]].js Cloudflare Pages Function that serves /media/*
└── .github/workflows/sitemap.yml  Regenerates sitemap.xml on every push to main
```

---

## Pages

### `index.html` — Homepage

| Section | What it is |
|---|---|
| Nav | Sticky navigation with a "Partner With Us" call to action. Collapses to a MENU button on mobile. |
| Hero | Headline, one-line pitch, two buttons (Partner With The Film, Fan & Diaspora Access), poster artwork. On mobile the poster sits above the copy. |
| Collaboration | Explains the Highlanders FC × Junza Studios co-production. |
| Trust strip | One-line fact strip (officially licensed, premiere date and cities). |
| The Story | Deliberately withheld teaser. Full synopsis and cast are not published until closer to premiere. Keep it that way unless told otherwise. |
| Community (`#community`) | Pop-up photo gallery with lightbox. |
| The Sound | Theme song presentation (the audio itself plays from the floating player). |
| Press (`#press`) | Press and social links. |
| Split CTA | Two cards sending visitors to Partners or Fan Access. |
| Footer (`#contact`) | Partnerships email and legal line. |

### `partners.html` — Brand Partners

Sections in page order:

1. **Subhero**: headline, producer description, club and studio logos.
2. **Talk to the producer strip**: WhatsApp (with a pre-filled message), email, and a jump link to the downloads.
3. **Why This Partnership**: three short reasons.
4. **Value carousel**: four swipeable slides with tap-to-enlarge graphics.
5. **Schedule and release**: one table covering pre-production through the final YouTube window, plus the companion content line.
6. **Partnership tiers**: Principal, Official, Product Placement and Event. Investment ranges sit behind Reveal buttons.
7. **Advertising rate card**: a "View placement rates & bundles" button reveals the slot and bundle tables. A PDF download sits beside it.
8. **Downloads** (`#downloads`): prospectus, corporate rate card, advertising rate card, press kit placeholder (coming soon).
9. **Contact** (`#contact`): partner enquiry form and contact details.

### `fan-access.html` — Fan & Diaspora Access

Fan carousel, **Wall of Bosso** (live from the API), local fan packages with price reveals, diaspora packages, diaspora business option, terms, downloads, and how to get a package, with the contact block.

---

## Contacts and key facts

Keep these identical everywhere (site, PDFs, form fallbacks, outreach).

| Item | Value |
|---|---|
| Producer and partnerships contact | Lenni Mdawini Sibanda |
| Phone and WhatsApp | +263 77 518 6743 |
| Partnerships email | partnerships@bossomovie.com |
| Highlanders FC marketing reference (shown on the diaspora and fan PDFs) | Minenhle Tshuma, +263 77 881 1721, marketing@highlandersfc.co.zw |
| Legal entity | Ya-Sibo Media (Private) Limited, trading as Junza Studios |
| Rights | Letter of Authorization from Highlanders Football Club |

Where contact details live:

- `partners.html`: talk strip (WhatsApp link, email), contact block at the bottom.
- `fan-access.html`: contact block in the "How to get a package" section.
- `index.html`: footer.
- `script.js`: the `mailto:` fallback for the partner form.
- PDFs: last page or last block of each of the five PDFs.

If the contact person changes, search the whole project (including PDF text) for the old name, number and email.

---

## Where dates appear

There is no single source of truth in the code, so a date change means editing several places. Current key dates:

| Milestone | Date |
|---|---|
| Pre-production | 24 Aug – 11 Oct 2026 |
| Brand Lock (partner placements confirmed) | 10 Oct 2026 |
| Principal photography | **20 Oct – 11 Nov 2026** |
| Post-production | 11 – 18 Nov 2026 |
| Premieres (Bulawayo and Harare) | 4 Dec 2026 |
| Paid streaming | Dec 2026 – Mar 2027 onward |
| Television (if a broadcast licence is signed) | Dec 2026 – Mar 2027 |
| Community screenings | May 2027 |
| YouTube | Final window |

To change the filming start or end, edit:

- `index.html`: hero line and the story section.
- `partners.html`: carousel slide 04, schedule table, and the Brand Lock mentions.
- `fan-access.html`: the cameo and background appearance note.
- PDFs: Prospectus (campaign window text and schedule table), Advertising Rate Card (payment terms), Fan Packages Brochure (cameo note).

Search tip: `grep -rn "20 Oct" *.html` and `pdftotext file.pdf - | grep "20 Oct"`.

---

## Pricing visibility rules

Pricing is **intentionally not shown in headlines or open text**.

- Headlines, carousel copy, homepage cards and download cards do not quote amounts.
- Tier investment ranges are inside `<span class="price-value">` elements. They are hidden until the visitor clicks **Reveal Investment** (see `.reveal-btn` in `script.js`).
- The slot and bundle tables are inside `<div class="rates-body" id="rates" hidden>` and open with the **View placement rates & bundles** button (`.gate-btn`).
- Full numbers are also in the downloadable rate card PDFs.

When adding new content, do not put prices into headings, meta descriptions, share text, `alt` text or paragraph copy. Put them inside a gated element or a PDF.

Note that gated content is still present in the page source. This is a presentation choice, not security. If a price must be genuinely private, keep it out of the HTML and in the PDF or a conversation.

---

## JavaScript features

Everything is in `script.js`, with no dependencies.

| Feature | How it works |
|---|---|
| Scroll reveal | Elements with `.reveal` or `.reveal-stagger` fade in using `IntersectionObserver`. Falls back to visible if unsupported. Respects reduced-motion settings in the CSS. |
| Theme song player | The floating player (`#player`) toggles `assets/theme-song.mp3`. Audio is `preload="none"`, so it only downloads when pressed. |
| Price reveal | `.reveal-btn` shows the sibling `.price-value` in the same card. |
| Rate card gate | `.gate-btn` with `data-gate="rates"` toggles the element with that id and updates `aria-expanded` and the button label. |
| Mobile menu | `.menu-toggle` opens and closes the nav list. |
| Partner form | `handleForm()` posts JSON to the API, with a `mailto:` fallback (below). |
| Wall of Bosso | Fetches contributor names from the API and renders chips. |
| Lightbox | Any element with `data-lightbox="group-name"` opens a full-size viewer. Elements sharing a group name can be browsed as a set. Uses `data-caption` for captions. |
| Carousels | Any element with `data-carousel` becomes a swipeable carousel with dots, previous and next buttons, and a counter. |

---

## Backend, forms and the Wall of Bosso

The website itself has no server code. Two features call an API that lives **outside this repository**:

```js
const API_BASE = "https://api.bossomovie.com";
```

| Feature | Endpoint | Notes |
|---|---|---|
| Partner enquiry form (`#partner-form` in `partners.html`) | `POST /api/public/partner-lead` | Sends the form fields as JSON: `company`, `contact_name`, `email`, `tier`, plus any other fields in the form. |
| Wall of Bosso (`#wall-grid` in `fan-access.html`) | `GET /api/public/wall` | Returns a list of contributors (name, tier, city). Names only, never amounts. |

**Fallbacks (important):**

- If the form submission fails, the visitor's browser opens an email draft to partnerships@bossomovie.com containing their details, so an enquiry is never silently lost.
- If the wall request fails, a friendly "loading slowly" message is shown.
- If the wall is empty, it shows "Be the first name on the wall".

**Wall tier labels** are mapped in `TIER_LABELS` in `script.js` (for example `ezikabosso` shows as "Bosso Believer"). If the backend adds a new tier id, add a label there. Unknown ids display as a tidied-up version of the id.

---

## Styling and design tokens

All CSS is in `style.css`. Colours, radii and shadows are CSS variables at the top of the file:

| Token | Use |
|---|---|
| `--bg`, `--surface` | Page background and cards |
| `--ink`, `--ink-soft`, `--muted` | Text levels |
| `--accent`, `--accent-deep`, `--accent-soft` | Highlanders red, used for buttons and highlights |
| `--gold`, `--gold-soft` | Premium and highlight cards |
| `--line` | Borders |

Fonts (loaded from Google Fonts at the top of `style.css`):

- **Bebas Neue**: headings
- **Plus Jakarta Sans**: body text
- **JetBrains Mono**: small labels, eyebrows and prices

Useful class names: `.btn`, `.btn-primary`, `.btn-outline`, `.card`, `.eyebrow`, `.section-title`, `.lede`, `.table-card`, `.data-table`, `.tier-card`, `.talk-strip`, `.gate-row`.

Breakpoints used: roughly 900px (hero stacks), 780px (grids collapse), 640px (mobile spacing and the talk strip buttons stack).

---

## PDF downloads

Five PDFs live in `assets/` and are linked from the Downloads sections.

| File | Linked from | Purpose |
|---|---|---|
| `Born-into-the-Black-and-White-Partnership-Prospectus.pdf` | Partners | Overview, tiers, schedule, next steps |
| `Corporate-Partnership-Rate-Card.pdf` | Partners | Principal and Official Partner tiers and terms |
| `Advertising-Product-Placement-Rate-Card.pdf` | Partners | 56 on-screen slots, bundles, payment terms |
| `Fan-Packages-Brochure.pdf` | Fan Access | Local fan packages |
| `Diaspora-Packages.pdf` | Fan Access | Diaspora packages |

**Editing PDFs.** The original source documents are not stored in this repository. The contact and date changes of October 2026 were made directly in the PDF files, which leaves the replacement text in a close but not identical font. **The best practice is to edit the original source document and re-export**, then replace the file in `assets/` using the same file name so links keep working. If the source docs are updated, make sure they carry the same contact details and dates as the website.

**After replacing a PDF**, browsers and CDNs may cache the old copy. Purge the cache if the change doesn't appear.

---

## Images and media

| Folder or file | Notes |
|---|---|
| `assets/carousel/` | Pre-designed slide graphics (text is baked into the images, so editing the words means re-exporting the image). Referenced from `partners.html` and `fan-access.html`. |
| `assets/popups/` | Community photos used by the homepage gallery with lightbox. `pop-07.jpg` is currently an unused spare. |
| `assets/poster.png` | Used in the hero and as the social share image. Keep it at a size that works for link previews. |
| `assets/theme-song.mp3` | About 4.4 MB. It is the heaviest asset, which is why it only loads on click. |

**Adding a community photo:**

1. Save the image in `assets/popups/` (JPEG, portrait or similar to the existing ones, ideally under 250 KB).
2. Copy an existing `<div class="popup-photo" data-lightbox="community">` block in `index.html`, change the `src`, `alt` text and caption.
3. Keep `data-lightbox="community"` so it joins the gallery viewer.

**Large videos** should not be added to the repository. The `/media/<file>` route (below) serves files from a private storage bucket instead.

---

## SEO, sharing and sitemap

- Every page has a `<title>`, meta description, canonical URL, Open Graph tags and Twitter card tags. The homepage also includes `Movie` structured data (schema.org JSON-LD).
- Share image for all pages: `assets/poster.png`.
- `robots.txt` allows all crawling.
- **`sitemap.xml` is generated automatically** by the GitHub Action in `.github/workflows/sitemap.yml` on every push to `main`, and committed back. Don't hand-edit it.
- When adding a new page, add the same head block as the existing pages (title, description, canonical, Open Graph, Twitter, favicons, stylesheet) and link the page from the nav in all pages.
- Keep prices out of meta descriptions and share text.

---

## Deployment

The project is set up for **Cloudflare Pages**:

- The static files are served as-is. There is no build command and the output directory is the repository root.
- `functions/media/[[path]].js` is a **Pages Function** that serves files at `/media/<object-key>` from a private storage bucket. It only returns the exact key requested and never lists the bucket. It supports range requests so audio and video can seek.
  - It needs an R2 bucket binding named **`ASSETS`** (Pages project → Settings → Functions → R2 bucket bindings). Without the binding, `/media/*` will fail.
  - Keys with spaces must be URL-encoded in the `src`, for example `/media/My%20Video.mp4`.
- The GitHub Action updates `sitemap.xml` after pushes to `main`. Make sure workflow permissions allow it to commit.
- The API at `api.bossomovie.com` is deployed and maintained separately from this repository.

**Release flow:** edit → preview locally → commit to `main` → Pages deploys automatically → check the live site on a phone and a desktop.

**Removing files:** unzipping or copying a new version over the repo does not delete files you have removed. Use `git rm` for deletions.

---

## Common edits: step by step

**Change the contact person or number.** Search all three HTML files, `script.js`, and the five PDFs for the old details (see [Contacts and key facts](#contacts-and-key-facts)). For the WhatsApp button, update the number in the `https://wa.me/<number>` link on `partners.html` (country code, no plus or spaces).

**Change a date.** See [Where dates appear](#where-dates-appear).

**Edit a partnership tier.** Tier cards are in the `tier-grid` block of `partners.html`. Keep the investment range inside `<span class="price-value">`, hidden until revealed.

**Edit a slot or bundle price.** Open the `#rates` block in `partners.html`, change the table cell, then change the matching figure in the Advertising Rate Card PDF so the two agree. Update "Priced separately", "Bundle price" and "You save" together for bundles.

**Add a new partnership tier.** Copy a `tier-card` inside the `tier-grid`, update the text and add a price reveal if needed. If it appears in the prospectus and corporate PDFs too, update those.

**Add a download.** Place the PDF in `assets/`, then copy a `dl-card` block in the Downloads section of the relevant page and point its `href` at the file.

**Change the theme song.** Replace `assets/theme-song.mp3` (keep the name) and update the track and artist text in the player block at the bottom of each page.

**Add a carousel slide.** Copy an existing `<article class="carousel-slide">` in the page's `data-carousel` block. Dots and counters build themselves.

**Change colours.** Edit the variables at the top of `style.css`.

---

## Pre-publish checklist

- [ ] Names, numbers and emails match across the three pages, the five PDFs and the form fallback.
- [ ] Dates match across the site and PDFs.
- [ ] No prices in headlines, carousel text, meta descriptions or open paragraphs.
- [ ] All Reveal buttons and the rate card button open and close correctly.
- [ ] WhatsApp button opens a chat with the right number.
- [ ] Partner form submits (or the email fallback opens).
- [ ] Wall of Bosso loads on the fan page.
- [ ] Theme song plays from the floating player.
- [ ] Lightbox and carousels work with touch on a phone.
- [ ] Every download opens the correct, latest PDF.
- [ ] Nothing unfinished is visible (placeholder text, "coming soon" where it shouldn't be).
- [ ] The page looks right at phone width (about 375px) and desktop.

---

## Known open items

- The Advertising Rate Card PDF still spells out the deposit and reservation terms that the website no longer states. Update the source document and re-export.
- The Corporate Rate Card and the Prospectus should be updated to match the Official Partner inclusions shown on the website (Premium logo appearance and digital billboard), and the Prospectus still says placements are final at Brand Lock.
- Pre-production ends 11 Oct while filming starts 20 Oct. Confirm whether the gap is intentional or the pre-production end date should move.
- No audience reach figures are published yet (followers, attendance, supporter groups). A proof strip should be added once real numbers are confirmed.
- The Media & Press EPK download is a placeholder marked "coming soon".
- `assets/popups/pop-07.jpg` is unused. Add it to the gallery or delete it.
- `index.html` contains a developer comment near the community gallery with instructions for adding photos. It's invisible on the page but can be removed.
