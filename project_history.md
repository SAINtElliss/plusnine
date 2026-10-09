# PlusNine Project History

## Session Log

### 2026-10-09 — 4K Film Festival Roadmap Scheduled Release & Secure Curator Preview
- **Zero Client-Side Data Leakage & Server-Side Schedule Architecture (`api/roadmap.ts`)**:
  - Completely decoupled the master festival schedule (`MASTER_ROADMAP_ITEMS`) from client-side bundles and relocated it into a standalone serverless function (`/api/roadmap`).
  - Audited and verified production JavaScript bundle (`dist/assets/*.js`): 0% traces of unreleased films, titles, synopses, directors, or schedule items.
  - Implemented timezone-aware evaluation in `America/Edmonton` (MST) against configurable release timestamp `2026-11-10T09:00:00-07:00` (overridable via `ROADMAP_RELEASE_DATE` environment variable).
- **Secure Curator Preview & Authentication**:
  - Engineered dual authentication channels for private preview access:
    1. Direct URL query parameter: `#/film-fest?admin=plusnine2026` or `?key=plusnine2026`.
    2. Discrete passkey modal (`AdminPreviewModal.tsx`) triggered from the placeholder card with autofocus, input masking, and ESC dismissal.
  - Supported authentication via `Authorization: Bearer <key>`, `x-admin-key` header, and query parameters. Passkey overridable via `ROADMAP_ADMIN_KEY` environment variable.
  - Added session persistence (`sessionStorage`) with an ambient "Curator Preview" status banner and 1-click "Exit Preview" reset control.
- **Warm Paper Coming Soon Placeholder (`RoadmapComingSoon.tsx`)**:
  - Designed an editorial warm paper (`#f1f0eb`) placeholder card matching PlusNine visual identity.
  - Features dynamic release date formatting in Edmonton time (`Nov 10, 2026 · 9:00 AM MST`), ambient breathing glow, and discreet curator preview access lock.
- **Autonomous Release & Smooth Navigation (`FilmFestPage.tsx`, `FestivalRoadmap.tsx`)**:
  - Implemented 15-second background polling timer on pre-release states that automatically fetches and reveals the full roadmap the instant release time arrives without requiring page refresh or deployment.
  - Floating centered `VIEW ROADMAP` button smoothly scrolls to the `#roadmap` section target in both locked (placeholder) and unlocked (full timetable) states.
  - Vite dev server middleware added to `vite.config.ts` for local offline parity.
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed in 2.28s.
  - Verified live production endpoints on `https://plusnine.vercel.app/api/roadmap`:
    - Public unauthenticated: `released: false`, `items: []` (0 items returned).
    - Curator authenticated: `isAdminPreview: true`, 10 complete timetable items returned.
    - Invalid passkey: `isAdminPreview: false`, `items: []`.
  - Deployed live to Vercel production: https://plusnine.vercel.app.

### 2026-10-09 — Comprehensive Site-Wide Icon & Mobile Emoji Audit (SVG Unification)
- **Codebase Icon Audit & Discovery**:
  - Audited all `.tsx`, `.ts`, `.html`, and `.css` files across `src/` for Unicode characters and symbols with emoji-presentation properties on iOS (Apple Color Emoji) and Android (Google Noto Color Emoji).
  - Identified that the top floating navigation dock (`FloatingDock.tsx`) rendered a raw Unicode character (`↗` / `U+2197`) inside `FEATURED_NAV_EVENT` and `.floating-dock-pill__featured-arrow`. While displaying as a monochrome character on desktop, `U+2197` on iOS/Android triggered colorful emoji rendering, clashing with the monochrome aesthetic.
  - Verified that all other interactive buttons, page controls, player modals, and roadmap stops already utilized standard vector SVG icons from `lucide-react`.
- **Lucide SVG Replacement (`FloatingDock.tsx`, `main.css`)**:
  - Replaced the Unicode arrow string in `FEATURED_NAV_EVENT` with `<ArrowUpRight size={11} strokeWidth={2.5} className="floating-dock-pill__featured-arrow" aria-hidden="true" />` from `lucide-react`.
  - Refined `.floating-dock-pill__featured-arrow` CSS to use `display: inline-flex`, `align-items: center`, `justify-content: center`, `flex-shrink: 0`, and smooth color and transform transitions.
  - Set `stroke="currentColor"` so the SVG arrow seamlessly transitions from pure white (`#ffffff`) to pitch black (`#000000`) on hover (`.floating-dock-pill__featured:hover`) and when active (`.is-active`), matching the typography.
  - Cleaned `aria-label` to `${FEATURED_NAV_EVENT.title} — ${FEATURED_NAV_EVENT.metadata}` for accessibility.
- **Copyright Typography Protection (`Colophon.tsx`)**:
  - Protected the colophon copyright notice (`&copy;&#xFE0E;`) with Unicode Variation Selector-15 (`U+FE0E`), explicitly enforcing text presentation and preventing iOS Safari from substituting the copyright mark with the blue Apple emoji.
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed in 2.36s.
  - Verified with browser subagent on desktop (`1536x730`) and mobile (`390x844`): confirmed DOM renders `<svg class="lucide lucide-arrow-up-right ...">` with 11px dimensions, crisp 2.5px stroke width, zero Unicode arrow text, and flawless hover color transitions.
  - Deployed to Vercel production: https://plusnine.vercel.app and https://www.plusnine.org.
  - Pushed to GitHub repository: https://github.com/SAINtElliss/plusnine (commit `6bbcfd8`).

### 2026-10-09 — Homepage SEO Update & Categorized Site-Wide Search
- **Homepage SEO & Social Sharing Previews (`index.html`, `src/App.tsx`)**:
  - Updated title to exactly `PlusNine | Culture & Community` for browser tabs, SEO title, Open Graph (`og:title`), and Twitter Cards (`twitter:title`).
  - Updated description to: `"An independent collective bringing people together through art, music, film, fashion, and shared cultural experiences."` for `<meta name="description">`, `og:description`, and `twitter:description`.
  - Preserved existing PlusNine logo preview image (`og-homepage.png`) unchanged.
- **Categorized Site-Wide Search (`ExpandableSearch.tsx`, `FloatingDock.tsx`, `main.css`)**:
  - Expanded search beyond Work archive into a site-wide search engine covering 4 distinct categories:
    1. **Work**: Original films, campaigns, editorials, and recaps (`PROJECTS_DATA` with title, category, year, client, description, tags, credits).
    2. **Events**: 4K Film Festival 2026 (The Roxy Theatre, free admission passes, roadmap) and past releases (AS WE ARE launch).
    3. **People**: 11 collective members (Lucy, Ezinne, Oliseh, Alfred, Denzel, Ellis, Nani, Nicole, Philip, Timi, Jimi) with roles, disciplines, and creative practice.
    4. **Pages**: About PlusNine, Work Archive, Events & Gatherings, People Directory, 4K Film Festival Page, Film Submission (`/film-submission` redirect), and PlusNine Magazine.
  - Organized results into labeled categories (`WORK`, `EVENTS`, `PEOPLE`, `PAGES`) with match count badges.
  - Case-insensitive, partial keyword matching across all real content.
  - Directly routes on selection to project, event, member profile (`#/people/${id}`), or external link (`/film-submission`).
  - Styled with a dark glassmorphism dropdown matching PlusNine visual identity.
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed in 2.38s.
  - Verified in real browser with browser subagent: verified title in tab and live HTML, tested search for "film", "lucy", and "submission", verified navigation to Lucy's profile, and captured screenshots.
  - Deployed to Vercel production: https://plusnine.vercel.app and https://www.plusnine.org.
  - Pushed to GitHub repository: https://github.com/SAINtElliss/plusnine (commit `8d81805`).


### 2026-10-09 — People Section Clean-Up & Member Roles Update
- **Removed Member Profile Navigation & Contact Buttons (`PeoplePage.tsx`)**:
  - Removed "CONNECT WITH [NAME]" email CTA buttons from all individual member profile pages.
  - Removed "BACK TO PEOPLE DIRECTORY" header breadcrumb button and "BACK TO PEOPLE" profile navigation buttons from all individual member profile pages.
  - Kept bottom open call strip ("Submit Film" & "Submit Treatment") and top persistent navigation dock intact.
- **Member Role Updates (`members.ts`)**:
  - Updated **Lucy's** PlusNine role to **Editorial & Outreach** (with disciplines: Editorial Direction, Outreach, Writing).
  - Updated **Ezinne's** PlusNine role by removing Outreach, leaving **Co-Editor-in-Chief** (with disciplines: Editorial Direction, Event Hosting).
  - Ensured consistent rendering across both the circular People directory and individual member profile detail cards.
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed in 2.26s.
  - Verified in real browser with browser subagent: inspected directory cards for Lucy and Ezinne, navigated to both individual profile pages, verified absence of back buttons and connect buttons, and captured visual screenshots.
  - Deployed to Vercel production: https://plusnine.vercel.app and https://www.plusnine.org.
  - Pushed to GitHub repository: https://github.com/SAINtElliss/plusnine (commit `09f0f1a`).


### 2026-10-09 — 4K Film Festival Swapped Button Color Schemes (VIEW ROADMAP & RESERVE FREE PASS)
- **VIEW ROADMAP Floating Button (`main.css`)**:
  - Restyled `.fest-floating-roadmap-btn` to feature a solid near-black background (`var(--color-black)` / `#080808`), black border, signal-orange text (`var(--color-orange)` / `#ff3b16`), and signal-orange down-arrow icon.
  - Updated `@keyframes floatRoadmapPulse` with a refined black shadow and subtle ambient orange glow (`rgba(255, 59, 22, 0.45)`).
  - Maintained existing centered fixed floating position, smooth entrance animation, auto-hide when intersecting `#roadmap`, and smooth scroll interaction.
- **RESERVE FREE PASS Primary Button (`main.css`)**:
  - Restyled `.fest-editorial-btn--primary` to feature a solid signal-orange background (`var(--color-orange)` / `#ff3b16`), matching orange border, crisp white text (`#ffffff`), and white ticket icon (`#ffffff`).
  - Preserved existing pill shape, sizing, mobile ordering, and Eventbrite modal checkout popup connection (`#filmfest-eb-trigger-pass`).
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed in 2.44s.
  - Verified in real browser with DevTools / subagent: confirmed exact computed colors (Roadmap: `rgb(8,8,8)` bg + `rgb(255,59,22)` color/icon; Reserve: `rgb(255,59,22)` bg + `rgb(255,255,255)` color/icon) and verified smooth scrolling.
  - Deployed to Vercel production: https://plusnine.vercel.app and https://www.plusnine.org.
  - Pushed to GitHub repository: https://github.com/SAINtElliss/plusnine (commit `68a6f06`).


### 2026-10-09 — Social Sharing Previews (Open Graph & Twitter Card Metadata)
- **Homepage Social Preview (`index.html`, `public/images/og-homepage.png`)**:
  - Configured clean, high-resolution 1200×630 preview card centered with the official PlusNine emblem on a solid black background (`rgb(0, 0, 0)`), avoiding project artwork.
  - Set static `<title>`: `PlusNine — An Independent Creative Collective`.
  - Set `<meta name="description">`: `A collective of creatives shaping culture through film, music, fashion, editorial, art, and shared experiences.`.
  - Integrated Open Graph tags (`og:title`, `og:description`, `og:url` = `https://www.plusnine.org/`, `og:image` = `https://www.plusnine.org/images/og-homepage.png`, `og:image:width` = `1200`, `og:image:height` = `630`, `og:type` = `website`).
  - Integrated Twitter Card tags (`twitter:card` = `summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`).
- **4K Film Festival Social Preview (`scripts/generate-meta-pages.js`, `public/images/og-filmfest.png`, `vercel.json`)**:
  - Created 1200×630 preview card cropped from master 4K asset preserving The Roxy Theatre, central 4K logo, and admission tickets.
  - Set `<title>`: `4K Film Festival 2026 | PlusNine`.
  - Set `<meta name="description">`: `A celebration of African and diaspora storytelling through film. November 12, 2026 at The Roxy Theatre, Edmonton. Free admission.`.
  - Built pre-render build script (`scripts/generate-meta-pages.js`) creating `dist/film-fest/index.html` with static Open Graph and Twitter tags for social crawlers (iMessage, Twitter, WhatsApp, Facebook, LinkedIn, Discord).
  - Added explicit edge rewrite in `vercel.json` routing `/film-fest` and `/film-fest/` to `/film-fest/index.html`.
- **Client-Side SPA Synchronization (`src/App.tsx`)**:
  - Enhanced hash and pathname routing to detect direct `/film-fest` visits.
  - Added dynamic head metadata synchronization effect updating `document.title`, `meta[name="description"]`, `og:*`, and `twitter:*` tags during in-app navigation.
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed, generating `dist/film-fest/index.html`.
  - Deployed to Vercel production: https://plusnine.vercel.app and https://www.plusnine.org.
  - Verified live HTTP response headers and tags via `curl` on both domains.
  - Pushed to GitHub repository: https://github.com/SAINtElliss/plusnine (commit `1179bef`).


### 2026-10-09 — Venue & Admission Reserve Free Pass Black Button & Mobile Section Ordering
- **Reserve Free Pass Solid Black Button (`FilmFestPage.tsx`, `main.css`)**:
  - Restyled `.fest-editorial-btn--primary` to feature a solid near-black background (`var(--color-black)` / `#080808`), black border, signal-orange text (`var(--color-orange)` / `#ff3b16`), and signal-orange ticket icon.
  - Distinguishes the primary pass reservation action from adjacent white, orange-outlined buttons ("Add to Calendar", "View on Map", "Submit Your Film").
  - Preserved identical shape (`border-radius: 999px`), sizing (`padding: 8px 18px`), and Eventbrite modal checkout integration trigger (`id="filmfest-eb-trigger-pass"`).
- **Mobile Section Reordering (`FilmFestPage.tsx`, `main.css`)**:
  - Added semantic modifier classes `.fest-editorial-card--admission` and `.fest-editorial-card--venue`.
  - Configured mobile responsive layout (`@media (max-width: 960px)`): Free Admission (ticket illustration, description, Reserve Free Pass CTA, and Submit Your Film link) appears first (`order: 1`), followed by Date & Venue (Roxy Theatre illustration, description, calendar, and map links) (`order: 2`).
  - Preserved desktop 2-column layout and horizontal alignment unchanged.
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed in 2.56s.
  - Verified in real browser on desktop (1440x900) and mobile (390x844): confirmed solid black button styling and reversed mobile card hierarchy.
  - Deployed to Vercel production: https://plusnine.vercel.app.
  - Pushed to GitHub repository: https://github.com/SAINtElliss/plusnine.

### 2026-10-09 — 4K Film Festival Page Floating VIEW ROADMAP Button & Live Countdown
- **Floating VIEW ROADMAP Action Button (`FilmFestPage.tsx`, `main.css`)**:
  - Relocated the "VIEW ROADMAP" button from the static document flow into a fixed floating position centered horizontally near the bottom of the viewport (`bottom: max(24px, calc(env(safe-area-inset-bottom, 0px) + 20px))`).
  - Added a spring entrance animation (`@keyframes floatRoadmapEnter`) when mounting the festival page.
  - Added an ambient heartbeat pulse animation (`@keyframes floatRoadmapPulse`) cycling every 4.5 seconds with signal-orange glow to encourage interaction.
  - Implemented an `IntersectionObserver` targeting `#roadmap` to automatically hide the floating button via smooth slide-down and fade-out whenever any part of the Roadmap section is visible on screen.
  - Ensured the button smoothly fades and slides back into view whenever the user scrolls away from the Roadmap section in either direction (upwards into the venue/hero or downwards into the colophon footer).
  - Maintained full reduced-motion accessibility (`@media (prefers-reduced-motion: reduce)`) disabling pulse and transform animations.
- **Editorial Festival Countdown Component (`FestivalCountdown.tsx`, `main.css`)**:
  - Replaced the original static in-flow VIEW ROADMAP button position with a dedicated live countdown to November 12, 2026, calculated against Edmonton local time (`America/Edmonton` / MST UTC-7).
  - Displays tabular **DAYS : HOURS : MINUTES : SECONDS** updating every 1000ms, with blinking signal-orange separator colons and a live status indicator dot.
  - Styled with PlusNine typography (Arial Black uppercase display, Helvetica body tags) and warm paper glassmorphism (`backdrop-filter: blur(10px)`).
  - Does not invent an unconfigured start time; targets the beginning of November 12, 2026 in Edmonton (00:00:00 MST).
  - Maintained all existing content, layouts, venue cards, and roadmap timetable stops unchanged.
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed in 2.72s.
  - Verified in real browser with DevTools: entrance animation, pulse, smooth scroll to `#roadmap`, auto-hiding when `#roadmap` intersects, and reappearance when scrolling away.
  - Deployed to Vercel production: https://plusnine.vercel.app.
  - Pushed to GitHub repository: https://github.com/SAINtElliss/plusnine.

### 2026-10-09 — Route-Specific Temporary 307 Redirect for /film-submission & Site Route Verification
- **Route-Specific Temporary 307 Redirect (`vercel.json`)**:
  - Replaced `"permanent": true` with `"permanent": false` in `vercel.json` for both `/film-submission` and `/film-submission/`.
  - Configured edge routing to emit an `HTTP 307 Temporary Redirect` to prevent aggressive browser caching while preserving request body and method.
  - Confirmed only `/film-submission` and `/film-submission/` point to `https://submit.plusnine.org`.
  - Confirmed absence of any wildcard, catch-all, or domain-wide redirects to Wix in `vercel.json`, headers, or client SPA routing.
- **Apex and Route Integrity Verification**:
  - Verified `https://plusnine.org` preserves the apex-to-www redirect (`308 Permanent Redirect` → `https://www.plusnine.org/`).
  - Verified `https://www.plusnine.org` and all child routes (`/`, `/work`, `/events`, `/people`, `/about`, `/film-fest`, `/as-we-are`) return `200 OK` and cleanly serve the PlusNine website on Vercel without redirecting to Wix.
  - Verified in real browser via browser subagent: `https://www.plusnine.org` renders the full creative studio platform and `https://www.plusnine.org/film-submission` routes to `https://submit.plusnine.org`.
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed in 2.33s.
  - Deployed to Vercel production: https://plusnine.vercel.app.
  - Pushed to GitHub repository: https://github.com/SAINtElliss/plusnine (commits `2bd90dc` & auto-deployment to `saint-ellis` production).


### 2026-10-09 — Root Container Restoration & Defensive Mounting Safeguard
- **Root Cause**:
  - `<div id="root"></div>` was missing from `index.html`, causing `ReactDOM.createRoot(null)` to throw `Target container is not a DOM element` and resulting in a blank screen.
- **Fix & Hardening (`index.html`, `src/main.tsx`)**:
  - Restored `<div id="root"></div>` in `index.html`.
  - Added a defensive fallback in `src/main.tsx` that programmatically creates and appends `<div id="root">` to `document.body` if absent, ensuring the app can never fail to mount even if HTML templates vary.
- **Verification & Deployment**:
  - Built and deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-3x8qakug2-folajinmi13-1183s-projects.vercel.app).
  - Verified live rendering in a real browser via Chrome DevTools / browser subagent with 0 console errors and full video/artwork rendering.
  - Pushed commit `f5fc659` directly to `https://github.com/SAINtElliss/plusnine.git`.

### 2026-10-08 — Eventbrite Official Modal Checkout Integration (Homepage & 4K Film Festival Page)
- **Official Script & Integration Engine (`index.html`, `src/utils/eventbrite.ts`)**:
  - Preloaded the official script `https://www.eventbrite.ca/static/widgets/eb_widgets.js` in `index.html`.
  - Built `src/utils/eventbrite.ts` configuring `window.EBWidgets.createWidget()` with `widgetType: 'checkout'`, `eventId: '2002603444812'`, and `modal: true`.
  - Tracked initialized element IDs via a persistent `Set<string>` to enforce strict single-initialization per trigger across the application lifecycle.
  - Implemented DOM readiness checks ensuring elements exist prior to widget attachment, plus `useEventbriteModal(elementId)` React hook.
- **Homepage Hero Button Integration (`src/components/hero/HeroVideo.tsx`)**:
  - Connected the "Reserve Free Passes" action button with `id="hero-eb-trigger-passes"`.
  - Intercepted click action to trigger the Eventbrite checkout modal popup immediately without navigating away from the homepage.
  - Preserved existing button styling, layout, typography, ticket icon, and "Reserve Free Passes" label.
- **4K Film Festival Page Button Integration (`src/components/pages/FilmFestPage.tsx`)**:
  - Connected the "Reserve Free Pass" button in the Venue & Admission section with `id="filmfest-eb-trigger-pass"`.
  - Replaced the legacy email RSVP modal state and overlay with Eventbrite's official checkout popup.
  - Preserved existing button styling, layout, typography, ticket icon, and "Reserve Free Pass" label.
- **CSS Stacking & Responsiveness (`src/styles/main.css`)**:
  - Added `z-index: 2147483647 !important` for `#eventbrite-widget-modal-overlay` and `iframe[id^="eventbrite-widget-modal"]`.
  - Added mobile responsive rules guaranteeing edge-to-edge modal display without horizontal overflow.
- **Verification & Deployment**:
  - Tested in real browser via browser subagent: verified popup opens on homepage and festival page with event `2002603444812` without navigation.
    - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.75s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-a1se6n1z3-folajinmi13-1183s-projects.vercel.app).
- **GitHub Private Repository Publishing**:
  - Initialized Git repository, staged all project assets and source files.
  - Created private GitHub repository: https://github.com/JimiR3d/plusnine.
  - Pushed main branch with entire codebase, public media, audio, and visual assets.
  - Transferred repository ownership to `SAINtElliss`: https://github.com/SAINtElliss/plusnine.

### 2026-10-08 — Mobile Hero 85–90vh Cinematic Composition & Removal of Back to Overview
- **Mobile Homepage Hero Cinematic Composition (`main.css` & `HeroVideo.tsx`)**:
  - Restructured the mobile hero into a unified, immersive ~88vh tall composition (`min-height: 85vh; height: 88vh; max-height: 90vh`).
  - Positioned the master festival artwork background layer with `position: absolute; inset: 0;` and `object-fit: cover; object-position: center 25%`, extending behind the title, logo, metadata, and CTA buttons across the entire hero.
  - Eliminated stacked/divided section blocks, integrating all content within one cohesive stage.
  - Layered a buttery, multi-stop black gradient (`.hero-editorial-video-wrap::after`) that stays transparent across the upper hero and gradually fades into the site's solid black background (`#080808` / `var(--color-black)`) behind the content near the bottom.
  - Positioned the event details ("FEATURED EVENT" badge, 4K logo, description, and action buttons) cleanly over the darkened lower area with `justify-content: flex-end` and bottom padding.
  - Desktop hero layout, carousel functionality, buttons, and typography remain completely preserved.
- **Removed "Back to Overview" Across the Website**:
  - `src/components/pages/WorkPage.tsx`: Removed the "Back to Overview" button and unused `ArrowLeft` icon from the archive header.
  - `src/components/pages/EventsPage.tsx`: Removed the "Back to Overview" button and unused `ArrowLeft` icon from the events header.
  - `src/components/pages/AboutPage.tsx`: Removed the "Back to Overview" button and unused `ArrowLeft` icon from the studio manifesto header.
  - `src/components/pages/PeoplePage.tsx`: Removed the "Back to Overview" button from the main directory header while preserving directory back-navigation when inspecting individual member profile cards.
  - Main navigation dock, hamburger menu, and all other interactive pathways remain 100% functional and intact.
- **Verification & Deployment**:
  - Live CDP mobile screenshot (390×844) confirmed the unified 88vh cinematic composition with background image behind text/buttons and smooth progressive fade.
  - Live CDP desktop screenshot (1440×900) confirmed desktop hero remains completely untouched and pristine.
  - Live CDP route screenshots (`/#/work`, `/#/events`, `/#/about`, `/#/people`) confirmed all "Back to Overview" buttons are removed while leaving clean metadata tags.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (3.24s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-ihawj28af-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — Mobile Homepage Hero Seamless Gradient Refinement
- **Mobile Homepage Hero Seamless Gradient (`main.css`, `HeroVideo.tsx`, `4k_film_festival_promo_mobile.webp`)**:
  - Eliminated the horizontal cutoff line and abrupt transition between the festival artwork and the black content area on mobile viewports (`max-width: 768px`).
  - Extended the festival artwork downward behind the black content area by supplying a dedicated mobile media source (`4k_film_festival_promo_mobile.webp` / `.png`) with seamless continuation of the dark red velvet cinema seats.
  - Sized the mobile video wrap with an exact matching aspect ratio (`16 / 14.375`, extending natural artwork coverage to ~350px on standard mobile screens).
  - Positioned `.hero-editorial-container` with negative margin (`-104px`) and `background: transparent`, preserving the exact vertical placement of the "FEATURED EVENT" badge, 4K logo, metadata tags, description, and action buttons.
  - Implemented a soft, progressive, 180px multi-stop vignette gradient (`.hero-editorial-video-wrap::after`) that starts subtly over the lower cinema seats and gradually reaches 100% solid `#080808` (`var(--color-black)`) behind the event details.
  - Preserved original 100% image scaling (all three essential artwork elements—The Roxy Theatre, 4K Film Festival logo, and Free Admission tickets—remain uncropped, sharp, and at identical proportions).
  - Desktop layout, dedicated 4K Film Festival event page (`/#/film-fest`), and overall hero height remain 100% untouched.
- **Verification & Deployment**:
  - Mobile (390×844) screenshot inspection confirmed zero horizontal cutoff line, progressive darkening into `#080808`, and identical button/text positioning.
  - Desktop (1440×900) screenshot inspection confirmed desktop hero remains completely untouched and pristine.
  - Dedicated festival event page (`/#/film-fest`) screenshot inspection confirmed zero regression.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (3.41s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-rkzv6hr8f-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — Mobile Hamburger Redesign & 12-Hour AM/PM Time Format
- **Mobile Hamburger Menu Redesign (`HamburgerDrawer.tsx` & `main.css`)**:
  - Transformed the mobile navigation drawer into a modern, minimal, editorial overlay (`rgba(8, 8, 8, 0.98)` with `24px` backdrop blur).
  - Streamlined vertical navigation: **HOME, WORK, EVENTS, PEOPLE, ABOUT**, a subtly highlighted **4K FILM FEST** link (with glowing signal-orange indicator dot and refined `NOV 12` pill tag), and an accessible **MAGAZINE** link (direct access to dedicated issue showcase).
  - Eliminated all verbose subtitles beneath navigation items and removed heavy 1px divider lines under every link and thick orange bars.
  - Refined typography from oversized 4.5rem Arial Black to a balanced `clamp(1.45rem, 5.2vw, 1.95rem)` with smooth hover/tap translation and signal-orange active states.
  - Replaced bulky pill button with a sleek circular close button (`38px`, minimal `X` icon, touch-friendly).
  - Redesigned footer into a single-line, clutter-free utility row featuring live Edmonton time (`MST [Time]`), direct inquiry email (`plus9ineent@gmail.com`), and Instagram channel (`@plusnine.ca`).
  - Total vertical height fits comfortably on all mobile viewports without requiring scrolling.
- **Site-Wide 12-Hour AM/PM Time Formatting**:
  - `FestivalRoadmap.tsx`: Converted all timetable entries to 12-hour format with AM/PM (`17:30` → `5:30 PM`, `18:00` → `6:00 PM`, `18:30` → `6:30 PM`, `19:00` → `7:00 PM`, `19:15` → `7:15 PM`, `19:45` → `7:45 PM`, `20:15` → `8:15 PM`, `20:45` → `8:45 PM`, `21:15` → `9:15 PM`, `21:45 – LATE` → `9:45 PM – LATE`).
  - `Colophon.tsx`: Switched Edmonton studio clock formatting to `en-US` with `hour12: true` and `hour: 'numeric'` (e.g. `2:58:29 AM`, `4:30:00 PM`).
  - `HamburgerDrawer.tsx`: Switched Edmonton mobile clock to `en-US` with `hour12: true` and `hour: 'numeric'`.
- **Verification & Deployment**:
  - Verified in mobile viewport via Chrome DevTools Protocol: drawer opens cleanly, renders all links with zero subtitles/excessive dividers, and closes on button tap.
  - Verified live Edmonton clock displays in 12-hour AM/PM format.
  - Verified Festival Roadmap displays all 10 stops with 12-hour AM/PM timestamps.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.30s).
  - Deployed live to Vercel production: https://plusnine.vercel.app.

### 2026-10-08 — Festival Roadmap Finish Marker & Format Specs Removal
- **Festival Roadmap Finish Marker (`main.css`)**:
  - Re-architected vertical timeline spine pseudo-element so the vertical connecting line is attached to `.roadmap-entry:not(:last-child)::before` rather than spanning the entire container track (`.roadmap-spine-track::before`).
  - Vertically constrained each spine segment to start at `top: 19px` and end at `bottom: -19px` (and `top: 17px; bottom: -17px` on mobile), connecting consecutive node centers.
  - The final entry (FINISH flag node) has `:last-child` and therefore generates no downward line. The spine line terminates precisely at the center coordinate of the FINISH flag icon circle with zero extension below it.
- **Removed Technical Format Specifications Across Entire Site**:
  - `src/components/editorial/RecentlySection.tsx`: Removed the `<div className="magazine-spec-item"><span className="magazine-spec-label">Format</span>...</div>` displaying "35mm / Medium Format / Print", and removed "Shot across 35mm and medium format," from the descriptive copy.
  - `src/data/projects.ts`: Removed `'35mm / Digital / Print'` from `tags` and removed the `{ label: 'Format', value: '35mm / Digital / Print' }` entry from `credits`.
  - `src/components/filmfest/FestivalRoadmap.tsx`: Removed technical film stock specifications from demo film genre strings (`Narrative · 35mm` -> `Narrative Feature`, `Visual Poetry · 16mm Analog` -> `Visual Poetry`, `Experimental · Digital / Analog` -> `Experimental`).
  - `src/components/about/StudioBio.tsx`: Removed "heavy 35mm grain, precise digital optics," from manifesto copy and removed the `Mediums` spec section listing film stocks.
  - `src/components/pages/EventsPage.tsx`: Renamed table column header from `FORMAT` to `TYPE` to distinguish event categorization from technical recording formats.
  - No technical specifications were substituted; all existing layouts, styling, buttons, and responsive behaviors were preserved intact.
- **Verification & Deployment**:
  - Browser inspection confirmed spine line terminates exactly at the FINISH icon center, with no line extending below.
  - Verified editorial "As We Are" section displays clean Curation metadata with zero format specifications.
  - Verified `/film-fest` roadmap demo film cards display clean genre descriptions.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (3.60s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-asxcpbxxf-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — 4K Film Festival Hero Mobile Artwork Moderate Zoom
- **Mobile Artwork Scaling & Alignment**:
  - Moderately increased the hero artwork scale (`transform: scale(1.24)`) on mobile viewports (`@media (max-width: 640px)`) in `main.css`, enlarging The Roxy Theatre details, central 4K logo, and Free Admission tickets by 24% for effortless readability on phones.
  - Positioned dead-center (`center center`) with generous edge clearance (~25px to ~45px), ensuring neither the venue details nor the ticket graphics are cut off on narrow (360px) or standard (390px/430px) screens.
  - Sized the hero section to a compact, reasonably short height (`clamp(260px, 36vh, 285px)`) with `overflow: hidden;`, allowing the velvet seats to meet the off-white paper of the Venue & Admission section seamlessly with zero black letterbox gaps.
  - Desktop festival layout, Venue & Admission section, Festival Roadmap, and homepage carousel remain 100% untouched.
- **Verification & Deployment**:
  - Captured and inspected mobile screenshots across multiple viewports (360×780, 390×844, 430×932) and desktop (1440×900).
  - Confirmed homepage mobile and desktop layouts remain completely unchanged.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.33s).
  - Deployed live to Vercel production: https://plusnine.vercel.app/#/film-fest (deployment: https://plusnine-5d14hctls-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — Homepage Hero Mobile Layout Optimization
- **Mobile Stacked Editorial Presentation**:
  - Restructured `.hero-editorial-section` on mobile viewports (`max-width: 768px`) to resolve portrait cropping of the 16:10 master festival artwork.
  - Set `.hero-editorial-video-wrap` to `aspect-ratio: 16 / 10.075` with `width: 100%` and `object-fit: contain;`, ensuring all three essential artwork components are 100% visible: The Roxy Theatre illustration and address on the left, central 4K Film Festival logo in the middle, and Free Admission double tickets on the right.
  - Added a subtle bottom vignette gradient (`.hero-editorial-video-wrap::after`) that softly blends the lower cinema velvet seats into the near-black background (`#080808`) of the content group below.
  - Positioned the editorial content group directly beneath the artwork stage with compact padding, preserving the intentional duplicate festival logo (`hero-slide-logo`), category badge, metadata tags, description, and action buttons (`RESERVE FREE PASSES ↗`, `EXPLORE PROGRAMME`).
  - Reduced total mobile hero height from full-viewport `844px` to ~`480px`, giving visitors an immediate visual cue of the next editorial section ("Recently at +9").
  - Desktop homepage and dedicated festival event page remain 100% untouched.
- **Verification & Deployment**:
  - Automated Playwright tests verified mobile button click navigation to `/#/film-fest`.
  - Captured and inspected mobile (390×844) and desktop (1440×900) screenshots across homepage and festival page.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.29s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-l81rsdkk2-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — 4K Film Festival Hero Clean Artwork Presentation
- **Hero Overlay Removal**:
  - Removed all overlaid DOM elements from `.fest-hero-section` in `FilmFestPage.tsx`: metadata date (`NOV. 12, 2026`), venue (`THE ROXY THEATRE · EDMONTON`), description paragraph, and the "Reserve Free Admission Pass" CTA button.
  - Removed `.fest-hero-gradient` so the master artwork and velvet cinema seats display completely unobstructed, unshadowed, and pristine.
  - Preserved master hero dimensions, image positioning, 4K WebP/PNG image quality, 16mm noise texture, and floating dock navigation.
  - Preserved the Venue & Admission and Festival Roadmap sections below without modification.
  - Adjusted mobile styling (`main.css`) to naturally fit the artwork aspect ratio without empty black letterboxing.
- **Verification & Deployment**:
  - Captured and inspected desktop (1440×900) and mobile (390×844) screenshots confirming 100% clean artwork presentation.
  - Confirmed homepage hero carousel remains completely untouched and unaffected.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.40s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-fy7jbko9w-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — 4K Film Festival Section Background Colour Swap
- **Colour Treatment Swap**:
  - **Venue & Admission (`.fest-editorial-details-section`)**: Swapped from black back to the site's signature off-white warm paper (`var(--color-paper)` / `#f1f0eb`), dark body text (`#1a1a1a`), natural black line-art illustrations (removed invert filter), and signal orange outline/fill buttons.
  - **Festival Roadmap (`.fest-programme-section`)**: Swapped from off-white to near-black (`var(--color-black)` / `#080808`), with white headings (`#ffffff`), Georgia italic subtitles, muted light-grey descriptions (`var(--text-secondary)` / `#a1a1aa`), illuminated vertical spine line (`rgba(255, 255, 255, 0.18)`), dark outlined and filled nodes, bordered film screening cards, and signal orange accents.
  - Preserved all layouts, typography, spacing, graphics, buttons, and interaction behaviors.
- **Verification & Deployment**:
  - Automated interaction tests verified RSVP modal trigger and smooth scrolling to `#roadmap`.
  - Desktop (1440×900) and mobile (390×844) screenshots captured and verified across both sections.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.95s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-oihl2uarg-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — 4K Film Festival Venue & Admission Dark Background Theme
- **Theme & Palette Update**:
  - Transitioned the Venue & Admission section (`.fest-editorial-details-section`) to PlusNine's established near-black palette (`var(--color-black)` / `#080808`), seamlessly blending with the cinematic hero banner.
  - Added subtle dark-mode hairline borders: `border-top: 1px solid rgba(255, 255, 255, 0.08)` and `border-bottom: 1px solid rgba(255, 255, 255, 0.08)`.
  - Updated editorial body text color to `rgba(255, 255, 255, 0.88)` for high contrast and readability without glare.
  - Applied `filter: invert(1)` and dark drop-shadows to both the Roxy Theatre building and vintage ticket illustrations, rendering them as crisp, luminous white line art on near-black.
  - Preserved all signal orange accents (`#ff3b16`), outlined pill buttons, solid orange "View Roadmap" CTA, layout, and functionality.
- **Verification & Deployment**:
  - Automated interaction tests verified RSVP modal trigger and smooth scrolling to `#roadmap`.
  - Desktop (1440×900) and mobile (390×844) screenshots captured and verified.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.98s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-o7a7jbouq-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — 4K Film Festival Editorial Venue & Admission Section Redesign
- **Creative Editorial Redesign**:
  - Replaced the compact strip with a bespoke two-column editorial magazine section on warm paper (`var(--color-paper)` / `#f1f0eb`), inspired by the user's reference mockup.
  - Positioned directly below the cinematic hero banner and immediately prior to the Festival Roadmap.
  - **Group 1 (Date & Venue)**: Integrated high-resolution line-art illustration of The Roxy Theatre (`roxy_venue_graphic.png`), welcoming copy for the November 12, 2026 Edmonton event, and two functional outlined pill buttons (`ADD TO CALENDAR` linking to Google Calendar and `VIEW ON MAP` linking to Google Maps).
  - **Group 2 (Free Admission)**: Integrated vintage double-ticket illustration (`free_ticket_graphic.png`) with playful hover rotation, copy highlighting free entry and complimentary treats, and an outlined pill button (`RESERVE FREE PASS`) opening the dedicated RSVP modal.
  - **Section Anchor**: Centered, solid signal orange (`#ff3b16`) pill button (`VIEW ROADMAP ↓`) that smoothly scrolls to the festival schedule timetable (`#roadmap`).
- **Styling & Responsiveness**:
  - Balanced optical weights of both graphics with subtle analog print drop shadows and smooth micro-hover transitions.
  - Set a centered `max-width: 1280px` grid for desktop and an elegant centered vertical stack for mobile viewports (`max-width: 640px`).
  - Preserved the existing hero banner, Festival Roadmap schedule component, and all other website pages.
- **Verification & Deployment**:
  - Automated interaction tests verified modal opening/closing and smooth scrolling.
  - Desktop and mobile screenshots captured and visually verified.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (3.32s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-qparlmd96-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — 4K Film Festival Compact Venue & Admission Strip Redesign
- **Section Relocation & Streamlining**:
  - Moved Venue & Admission Details from after the roadmap to directly beneath the hero banner and immediately prior to the Festival Roadmap in `FilmFestPage.tsx`.
  - Replaced the three large cards with a compact, refined horizontal information strip (`.fest-strip-section`, ~70px height) featuring tight padding (`16px 0`) and subtle hairline borders.
  - Included Free Admission badge with RSVP note, The Roxy Theatre address linking to Google Maps, a prominent yet balanced `RESERVE FREE PASS` button, and a subtle `Contact organizers` mail link.
  - Removed the "JOIN THE MOVEMENT" promotional card and unsupported facility/reception claims.
- **Verification & Deployment**:
  - Verified visual rendering on 2x Retina desktop (1536×864) and mobile (390×844) viewports: Festival Roadmap appears immediately without long scrolling.
  - Verified ticket modal triggers properly on button click.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.59s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-a1oazwx57-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — 4K Film Festival Hero Height 20% Expansion
- **Proportional Banner Height Expansion**:
  - Increased `.fest-hero-section` height in `src/styles/main.css` by exactly 20%: from `clamp(380px, 50vh, 480px)` with `max-height: 480px` to `clamp(456px, 60vh, 576px)` with `max-height: 576px`.
  - Allowed significantly more velvet seat texture and vertical presence for the cinematic artwork while preserving visibility of the Festival Roadmap section cue right at the bottom of the initial viewport.
  - Left the homepage hero carousel (`.hero-editorial-*`) and mobile layouts 100% untouched.
- **Verification & Deployment**:
  - Verified visual rendering on 2x Retina desktop (1536×864) and mobile (390×844) viewports.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.29s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-r4cchfo11-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — 4K Film Festival High-Resolution Artwork Upgrade (Homepage & Event Page)
- **Master 8K Asset Integration**:
  - Located the user's master 8000 × 5038 source artwork (`web_backgroun2.png`, 21.3MB) and resolved the 1024px downsampling introduced by web chat uploads.
  - Generated true 4K (3840 × 2418) replacements: lossless master PNGs (`4k_film_festival_hero.png`, `4k_film_festival_promo.png`, `4k_film_festival.png`) and optimized 428KB WebPs (`4k_film_festival_hero.webp`, `4k_film_festival_promo.webp`, `4k_film_festival.webp`).
- **Picture Elements & Dual-Format Web Delivery**:
  - Implemented `<picture>` elements in `FilmFestPage.tsx` and `HeroVideo.tsx` for instant WebP rendering with 4K PNG fallback.
  - Added optional `srcWebp` property to `HERO_SLIDES_DATA` in `heroSlides.ts`.
- **CSS Smoothing & High-DPI Filtering**:
  - Removed `image-rendering: -webkit-optimize-contrast` in `main.css` to eliminate jagged edge aliasing and compression ringing.
  - Added full-width block styles for `.fest-hero-picture` and `.hero-editorial-picture` across desktop and mobile.
- **Verification & Deployment**:
  - Verified visual sharpness on 2x Retina desktop (1536×864) and mobile (390×844) viewports with zero blurriness and zero text clash.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.31s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-in3i9ivxo-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — Homepage Hero Carousel Sizing & Independent Styling Restoration
- **Scope & Independence**:
  - Restored homepage hero (`.hero-editorial-*`) independent sizing and positioning without touching the 4K Film Festival event page (`.fest-hero-*`).
  - Confirmed the 4K Film Festival page hero remains 100% intact, shorter, and uncropped.
- **Homepage Artwork Visibility & Sizing**:
  - Restored `.hero-editorial-section` to its independent `min-height: 100vh` presentation with `object-position: center center`.
  - Displayed the festival promotional artwork with full clarity, zero pixelation, and zero cropping.
- **Non-Obscuring Bottom-Left Content Group**:
  - Re-positioned and calibrated the bottom-left carousel content group (`.hero-editorial-content-group`) to sit comfortably in the lower-left corner below the background artwork.
  - Sized the foreground logo (`max-height: clamp(50px, 7vh, 72px)`) and metadata cleanly to prevent any overlap with the background Roxy Theatre illustration, 4K logo, or tickets.
  - Applied a subtle localized black radial gradient (`ellipse 52% 48% at 0% 100%`) behind the text for effortless legibility while keeping the central and right-side artwork radiant and unobstructed.
- **Verification & Deployment**:
  - Verified across desktop (1440x900) and browser viewports (755x788) via headless browser screenshots.
  - Verified 4K Film Festival event page remains completely unchanged and working.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.87s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-5fbaef3m7-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — Homepage & 4K Film Festival Hero Image Quality & Shorter Banner Fix
- **Image Quality & Asset Resolution**:
  - Confirmed usage of the original uncompressed full-resolution asset (`media_1791433002616.png`, 1024x644 PNG) across all placements (`public/images/events/4k_film_festival_hero.png`, `4k_film_festival_promo.png`, and `4k_film_festival.png`).
  - Added `-webkit-optimize-contrast` image rendering to prevent fuzzy scaling.
- **4K Film Festival Page Hero**:
  - Re-calibrated hero to a shorter, full-width banner (`height: clamp(380px, 50vh, 480px)`), completely eliminating full-screen height.
  - Centered image focal point (`object-position: center center; object-fit: cover;`) within the banner to ensure 100% visibility of all artwork elements without cropping:
    - Left: Roxy Theatre illustration + "NOV. 12 2026", "THE ROXY THEATRE", address.
    - Center: "4K FILM FESTIVAL" clapperboard logo + subtitle "A CELEBRATION OF AFRICAN & DIASPORA STORYTELLING THROUGH FILM."
    - Right: Vintage "FREE ADMISSION" admission tickets.
  - Restored compact bottom-left event details (date, venue, synopsis, and RSVP button) with localized radial gradient overlay over the lower seats.
  - Guaranteed immediate visibility of the Festival Roadmap timetable in the initial desktop viewport without scrolling.
- **Homepage Hero**:
  - Re-architected homepage hero from `min-height: 100vh` to a shorter, full-width banner (`height: clamp(460px, 60vh, 580px)`).
  - Preserved the existing carousel layout (metadata badges, title block logo, description, and action buttons).
  - Enhanced localized lower-left radial gradient (`ellipse 62% 68% at 0% 100%`) ensuring crisp text legibility and clean separation from background artwork without double-text clash.
- **Verification & Deployment**:
  - Verified across desktop (1440x900) and user viewport (755x788) via headless browser screenshots.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.62s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-3zz4lx2ya-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — 4K Film Festival Event Page Hero Artwork & Layout Fix
- **New Replacement Hero Asset**:
  - Implemented the newly provided 4K Film Festival hero asset (`media_1791433002616.png`, 1024x644, aspect ratio 1.59:1) at `public/images/events/4k_film_festival_hero.png`.
- **Zero-Cropping Aspect-Ratio Driven Layout**:
  - Eliminated clamped/fixed container heights and `object-fit: cover` that previously cropped off the bottom of the artwork.
  - Implemented responsive fluid dimensions (`width: 100%; height: auto; aspect-ratio: 1024 / 644;`) spanning the entire browser width edge-to-edge without letterboxing or side margins.
  - Completely preserved original artwork composition:
    - Left: Roxy Theatre illustration + "NOV. 12 2026", "THE ROXY THEATRE", address.
    - Center: "4K FILM FESTIVAL" clapperboard logo + subtitle "A CELEBRATION OF AFRICAN & DIASPORA STORYTELLING THROUGH FILM."
    - Right: Vintage "FREE ADMISSION" admission tickets.
    - Top & bottom red velvet cinema seats.
- **Localized Radial Gradient & Overlay**:
  - Replaced broad linear/radial gradients with a subtle, localized lower-left radial gradient (`ellipse 46% 42% at 0% 100%`) behind the overlay text and button, keeping all central and right-side graphics untouched.
  - Maintained compact event metadata (Date, Venue, Description, Reserve Admission Pass CTA) positioned over the lower seats area without interfering with embedded artwork.
- **Mobile & Tablet Refinements**:
  - On mobile (`<= 640px`), positioned the event details directly below the image on `#080808` to prevent covering the artwork on narrow screens.
  - Refined mobile metadata layout to stack cleanly without truncation.
- **Roadmap Integration**:
  - Reduced top padding on `.fest-programme-section` to bring the Festival Roadmap timetable seamlessly into view directly below the hero.
- **Verification & Deployment**:
  - Verified across desktop (1440x900), tablet (768x1024), and mobile (390x844) viewports via headless browser screenshots.
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.59s).
  - Deployed live to Vercel production: https://plusnine.vercel.app (deployment: https://plusnine-h4ccqw0ma-folajinmi13-1183s-projects.vercel.app).

### 2026-10-08 — People Directory 6-Column Desktop Grid Refinement
- **Desktop Layout Adjustment**:
  - Configured directory grid to display **6 profiles on a row** on desktop screens (`grid-template-columns: repeat(6, 1fr)`) with an expanded `max-width: 1560px`.
  - Calibrated card dimensions (`max-width: 210px`) and circular avatar wrap dimensions (`clamp(120px, 10vw, 150px)`) to provide optimal horizontal and vertical balance across 6 columns.
  - Proportional typography tuning:
    - Name: `clamp(1.05rem, 1.2vw, 1.25rem)` (bold Arial Black display).
    - Role: `0.82rem` (weight 700, dark `#080808`, clean line wrapping).
    - Secondary identity: `0.74rem` (muted `#6b6a65`).
  - Preserved responsive flow:
    - Laptops (900px – 1200px): 4 columns (`repeat(4, 1fr)`).
    - Tablets (600px – 900px): 3 columns (`repeat(3, 1fr)`).
    - Mobile (<= 600px): 2 columns (`repeat(2, 1fr)`).
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.40s).
  - Deployed live to Vercel production: https://plusnine.vercel.app.

### 2026-10-08 — People Directory 4-Column Refinement & Three-Level Text Hierarchy
- **Layout Refinement**:
  - Re-architected desktop directory grid from 6 columns to a spacious 4-column layout (`repeat(4, 1fr)`) with `max-width: 1280px` and generous horizontal/vertical breathing room (`gap: clamp(48px, 5.5vw, 76px) clamp(24px, 3.5vw, 48px)`).
  - Configured responsive breakpoints: 3 columns on tablet (`max-width: 1080px`) and 2 columns on mobile (`max-width: 768px`).
  - Preserved alphabetical ordering and neutral circular blank profile images.
- **Three-Level Text Hierarchy**:
  - Implemented exact three-tier typography hierarchy per member card:
    1. **NAME**: Bold, visually prominent uppercase display font (`#080808`).
    2. **PLUSNINE ROLE**: Readable, slightly emphasized main subtitle in bold weight (`0.88rem`, `700`, `#080808`), taking precedence over independent work and wrapping naturally where needed.
    3. **OTHER CREATIVE IDENTITIES**: Smaller secondary line in muted grey (`0.78rem`, `#6b6a65`), hidden entirely when no additional identity is listed.
  - Reserved consistent vertical height (`min-height: 94px`) so cards align cleanly across each row regardless of title lengths or missing secondary lines.
- **Member Data & Roles Updated**:
  - Alfred: `External, Internal & Oversight` · `Clothing Brand Owner`
  - Denzel: `Sound Engineer` · `Music Producer`
  - Ellis: `Graphic Design, SMM & Editing` · `Musician`
  - Ezinne: `Co-Editor-in-Chief & Outreach` · `Event Host`
  - Lucy: `Magazine & Editorial` (no secondary line)
  - Nani: `Logistics Chair` · `Musician`
  - Nicole: `Finance Chair & Digital Creator` (no secondary line)
  - Oliseh: `Content Director & Marketing` · `Clothing Brand Owner`
  - Regina: `Events Chair` · `Photographer · Beauty Entrepreneur`
  - Sekani: `Scriptwriting & Outreach` · `Musician`
  - Toluwani: `Co-Chair Finance & Co-Editor-in-Chief` · `Musician`
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (6.17s).
  - Deployed live to Vercel production: https://plusnine.vercel.app.

### 2026-10-08 — People Directory & Dedicated Profiles Roster Reorganization
- **Architecture & Data**:
  - Created [`src/data/members.ts`](file:///c:/Users/Jimi/Downloads/The%20Anti-Gravity/New%20Gravity/PlusNine/src/data/members.ts) containing strongly-typed definitions for all 11 PlusNine members, sorted alphabetically by first name:
    1. Alfred (`Leadership & Operations`)
    2. Denzel (`Music Production & Sound`)
    3. Ellis (`Design & Music`)
    4. Ezinne (`Editorial & Events`)
    5. Lucy (`Magazine & Editorial`)
    6. Nani (`Music & Operations`)
    7. Nicole (`Finance & Digital Content`)
    8. Oliseh (`Creative Direction & Marketing`)
    9. Regina (`Events & Photography`)
    10. Sekani (`Music & Writing` — consolidated from JJ / Sekani)
    11. Toluwani (`Music & Editorial` — consolidated from Wani / Toluwani)
- **Directory Layout**:
  - Implemented strictly minimal Apple Music-inspired structure: `Circular Image → Name (bold) → Role/Expertise (smaller, lighter text)`.
  - Removed all stock images and generated photographs; all 11 profiles utilize a consistent neutral circular disc placeholder (`#e4e3dc`) until real photography is supplied.
  - Centered names and roles beneath each circle with crisp `#080808` text and orange hover transitions.
  - Eliminated any long bios, skill lists, location tags, or overlapping elements from the main directory view.
- **Individual Member Profiles**:
  - Designed flexible, data-driven profile page template that renders only populated fields (never inventing bios, projects, brands, or social links).
  - Integrated deep-linking and browser navigation via URL hash (`#/people/${member.id}`).
  - Added dedicated support for additional creative identities and independent ventures (Alfred's clothing brand, Denzel's beats/music, Ellis's design/editing/music, Ezinne's UK events, Nani's music, Oliseh's clothing brand, Regina's Onwemma braiding business, Sekani's music/scripts, Toluwani's music/finance/editorial, and Lucy's magazine/editorial work).
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.37s).
  - Deployed live to Vercel production: https://plusnine.vercel.app.

### 2026-10-08 — People Directory Member Name Text Colour Fix
- **Problem Fixed**: Member names underneath circular profile images on `/people` were rendering white against the off-white paper background (`#f1f0eb`) due to missing dark text color definitions in button inheritance and undefined token fallback.
- **Implementation**:
  - In `tokens.css`: Added `--paper-text-main: #080808;` under `--paper-text: #080808;`.
  - In `main.css`:
    - Updated `.people-directory-section` and `.people-circle-item` to enforce `color: var(--color-black);`.
    - Set explicit `color: var(--color-black);` on both `.people-circle-name-sans` (bold first name in Arial Black) and `.people-circle-name-serif` (italic surname in Georgia).
    - Preserved existing font sizes, weights, center alignment, and vertical layout.
    - Added high-contrast `:hover`, `:focus-visible`, and `:active` transitions to signal orange (`var(--color-orange)`: `#ff3b16`) for strong readability on interactions.
    - Updated `.people-profile-name`, `.people-name-sans`, and `.people-name-serif` to ensure individual profile view names are consistently black.
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (2.70s).
  - Deployed live to Vercel production: https://plusnine.vercel.app.

### 2026-10-07 — Batch Editorial & Experience Refinements (Tasks 1–7)
- **Task 1: Video Chapters / Timestamps Removal**:
  - Removed chapter/timestamp navigation from `ShowreelModal.tsx` (`01 Opening`, `02 As We Are`, `03 Loca Q`, etc.).
  - Retained standard continuous video scrub bar, play/pause, restart, and volume/mute controls.
- **Task 2: Events Page Introduction Update**:
  - Updated small top-right crumb label to `EVENTS / PLUSNINE`.
  - Updated page heading to `GATHERINGS & events.`.
  - Updated editorial description to `Screenings, parties, pop-ups, showcases, and whatever else we come up with.`.
- **Task 3: 4K Film Festival Hero CTA Streamlining**:
  - Completely removed `2026 REEL` CTA from `heroSlides.ts`.
  - Hero now displays exclusively `RESERVE FREE PASSES ↗` and `EXPLORE PROGRAMME` sitting naturally together.
- **Task 4: Official 4K Film Festival Logo on Events Page**:
  - Replaced typographic text heading on `/events` with the official 4K Film Festival logo asset (`/images/events/4k_film_festival_logo.png`).
  - Preserved aspect ratio with `.events-feature-logo-wrap` and maintained structure: `Date & Location → Festival Logo → Description → CTA`.
- **Task 5: "From the Collective" Homepage Clean-up**:
  - Streamlined `CollectiveSection.tsx` to strictly contain only `AS WE ARE` (EDITORIAL) and `WE WEREN’T ASLEEP` (RECAP).
  - Removed fictional Directorial Lab & Artist Grants card and bottom numbering strip (`FROM THE COLLECTIVE · 02`).
  - Reflowed layout into an intentional 2-column grid (`repeat(2, 1fr)`) ready for future additions.
- **Task 6: People Directory Redesign (Apple Music Reference)**:
  - Redesigned `/people` directory into a clean responsive circular avatar grid with names centered underneath.
  - Removed profile numbering, rectangular cards, location labels, skill pills, bios, and role overlays from the main directory view while preserving underlying member data.
  - Added interactive profile view upon clicking any member circle.
  - Updated heading description to `The people behind PlusNine and the collaborators we create with.` and removed `EDITORIAL ROSTER · 2026`.
- **Task 7: 4K Film Festival Schedule Roadmap Redesign**:
  - Built data-driven `FestivalRoadmap.tsx` component with continuous vertical spine line and circular nodes.
  - Outlined nodes for standard stops, filled nodes for START (`Doors Open / Guest Arrival` with door icon) and FINISH (`Closing Celebration & Mixer` with flag icon).
  - Compact stops for Intermission, Games, Voting, and Prize Giving using Lucide icons (`Coffee`, `Sparkles`, `Vote`, `Trophy`).
  - Substantially larger film screening stops displaying poster (3:4 ratio), title, runtime pill, director, genre, and synopsis.
  - Integrated into `FilmFestPage.tsx` and styled in `main.css`, preserving the continuous vertical roadmap on mobile screens without converting back into detached cards.
- **Verification & Deployment**:
  - `npm run typecheck` passed (0 errors).
  - `npm run build` passed (5.64s).
  - Vercel production deployment initiated.

### 2026-10-07 — Global Numbering/Index Removal & "AS WE ARE" Online Publication Update
- **Site-Wide Numbering/Index System Removal**:
  - Removed sequential index prefixes (`01`, `02`, `03`, `04`, `05`, `01 — 08`) across the entire website while strictly preserving years (`2025`, `2026`), dates, quantities, and runtimes.
  - **Work Page (`WorkPage.tsx`)**: Removed `01` before *VERNACULAR MAGAZINE × PLUSNINE* and `02` before *PLUSNINE RECAP*. Adjusted spacing so metadata starts naturally flush left.
  - **People Page (`PeoplePage.tsx`)**: Removed `01`, `02`, etc. prefixes from roster cards; aligned location metadata flush left.
  - **About Page (`AboutPage.tsx`)**: Removed practice index numbers `01`, `02`, `03` above practice column headings.
  - **Recently Section (`RecentlySection.tsx`)**: Updated label from `RECENTLY AT +9 · 01` to `RECENTLY AT +9`.
  - **Collective Section (`CollectiveSection.tsx`)**: Updated header to `FROM THE COLLECTIVE` (removed `· 02`) and removed `01`/`05` strip index numbers.
  - **Upcoming Section (`UpcomingSection.tsx`)**: Removed `· 03` from section headers (`UPCOMING GATHERINGS` / `RECENT GATHERINGS`).
  - **Events Page (`EventsPage.tsx`)**: Retained chronological date display without arbitrary numbering prefixes.
  - **Showreel Modal (`ShowreelModal.tsx`)**: Removed chapter number prefixes (`01 Opening`, `02 As We Are`, etc.) to clean chapter titles.
  - **Project Grid (`ProjectGrid.tsx`)**: Cleaned `Selected Archive · 01 — 08` to `Selected Archive`.
  - **Film Fest Page (`FilmFestPage.tsx`)**: Cleaned `FEATURE SCREENING BLOCK 01` to `FEATURE SCREENING BLOCK`.
- **"AS WE ARE" Online Publication Details Update**:
  - Updated date from August 28 to **February 17, 2025**.
  - Updated format and venue from physical event (*Studio PlusNine Stage 2 · Edmonton, AB*) to **Digital Release · Online** in both `EventsPage.tsx` and `UpcomingSection.tsx`.
- **Verification & Deployment**:
  - Typechecked with `npm run typecheck` (0 errors).
  - Built with `npm run build` (success in 3.41s).
  - Verified across all pages in browser.
  - Deployed live to Vercel production: https://plusnine.vercel.app.

### 2026-10-07 — "WE WEREN'T ASLEEP" Authentic Collective Thumbnail Integration
- **Integrated Authentic Collective Photo Asset**:
  - Saved the user-provided group photograph of the PlusNine collective seated together in the studio lounge to `public/images/projects/we_werent_asleep.jpg` and `public/images/projects/just.jpg`.
  - Updated `image: '/images/projects/we_werent_asleep.jpg'` in `src/data/projects.ts` for `we-werent-asleep`.
  - Automatically updates the work archive card on `/work` and the collective card on the homepage.
- **Verification & Deployment**:
  - Validated with `npm run build` (`tsc && vite build` passed with 0 errors).
  - Deployed live to Vercel production.
- **Recategorized "WE WEREN'T ASLEEP"**:
  - In `src/data/projects.ts`, added `'Recap'` to `Project['category']` union type.
  - Reassigned `we-werent-asleep` category from `'Film'` to `'Recap'`.
- **Updated Work Page Filter Navigation (`WorkPage.tsx`)**:
  - Added `RECAP` to filter pills: `['ALL', 'FILM', 'EDITORIAL', 'RECAP']`.
  - `WE WEREN'T ASLEEP` accurately appears under `ALL` and `RECAP`, and no longer appears under `FILM`.
  - Retained all existing pill styling, interactions, animations, and active state transitions unchanged.
- **Verification & Deployment**:
  - Validated with `npm run build` (`tsc && vite build` passed with 0 errors).
  - Deployed live to Vercel production.
- **Updated Project Metadata & Narrative in `projects.ts`**:
  - Replaced inaccurate references ("PlusNine Motion", "a cinematic study on nocturnal rhythm", "Production", "Cinematography", "Soundtrack").
  - Set Top Metadata: `client: 'PLUSNINE RECAP'`, `year: '2025'` (rendering as `02   PLUSNINE RECAP   2025`).
  - Set Narrative Description: `"A look back at what we were building while things seemed quiet."`.
  - Added dedicated Tags: `['2025 RECAP', 'ARCHIVE FOOTAGE', '+9 COLLECTIVE']`.
  - Set CTA Button Label: `ctaLabel: 'WATCH THE FILM'` (rendering as `WATCH THE FILM ↗`).
- **Updated Work Page Archive List (`WorkPage.tsx`)**:
  - Rendered `project.tags` in `.archive-item-specs` using existing `.archive-spec-chip` styling.
  - Dynamically wired `project.ctaLabel` so `WE WEREN'T ASLEEP` displays `WATCH THE FILM ↗` while maintaining the design, typography, spacing, and showreel modal video play functionality.
- **Verification & Deployment**:
  - Validated with `npm run build` (`tsc && vite build` passed with 0 errors).
  - Deployed live to Vercel production.
- **Architected Reusable Hero Slide Data System**:
  - Created [`src/data/heroSlides.ts`](file:///c:/Users/Jimi/Downloads/The%20Anti-Gravity/New%20Gravity/PlusNine/src/data/heroSlides.ts) with `HeroSlideData` and `HeroSlideAction` interfaces enforcing the standard slide hierarchy: `Metadata → Project/Event Logo → Description → CTA Buttons`.
  - Configured slide structure so each future slide references its own image asset, background media, metadata, description, and CTA actions without hardcoding logos into the carousel component.
- **4K Film Festival Official Title Logo Integration**:
  - Ingested the authentic high-resolution transparent white graphic (`4k_film_festival_logo.png`, 1024×301) to `public/images/events/4k_film_festival_logo.png` and `public/images/logos/4k_film_festival_logo.png`.
  - Replaced the text headline `4K FILM FESTIVAL` with the dedicated title logo.
- **Aspect Ratio Preservation & Responsive Bounding Box**:
  - Implemented `.hero-logo-wrap` and `.hero-slide-logo` with `width: auto; height: auto; object-fit: contain; object-position: left center;`.
  - Enforced responsive max-width (`clamp(280px, 36vw, 480px)`) and max-height (`clamp(84px, 13vh, 140px)`), with mobile media queries down to `min(88vw, 290px)` / `clamp(54px, 9vh, 80px)`.
  - Preserved intrinsic proportions with zero stretching, distortion, or forced fixed dimensions across varying aspect ratios.
- **Verification & Deployment**:
  - Validated with `npm run build` (`tsc && vite build` passed with 0 errors).
  - Deployed to Vercel production.
- **Hero Foreground Content Group Repositioning**:
  - Moved the entire hero content block (`.hero-editorial-content-group` containing metadata badge/date row, title block, description, and CTA buttons) to sit in the bottom-left of the hero viewport rather than vertically centered.
  - Set `.hero-editorial-container` to `justify-content: flex-end; align-items: flex-start;`.
  - Added fluid, comfortable negative space above the bottom navigation / bottom edge using `padding-bottom: clamp(48px, 8vh, 84px);` on desktop and `clamp(32px, 5vh, 48px);` on mobile.
  - Maintained left alignment and clean padding (`padding-left: clamp(20px, 4vw, 48px);`).
- **Proportional ~20% Scale Reduction**:
  - Reduced **4K FILM FESTIVAL** headline font size by ~20% from `clamp(3.4rem, 10vw, 9.2rem)` to `clamp(2.7rem, 8vw, 7.3rem)`.
  - Reduced metadata row font size from `0.72rem` to `0.58rem`, badge padding to `2.5px 7px`, and presents tag to `0.62rem`.
  - Scaled description font size down to `clamp(0.82rem, 1.1vw, 1rem)` and max width to `480px`.
  - Reduced CTA buttons height to `38px` (from 48px), padding to `0 20px`, font size to `0.68rem`, and Lucide icon sizes to 12px/10px.
- **Visual Balance & Carousel Slide Consistency**:
  - The video/visual layer is now the dominant cinematic focal point, with the typography acting as an elegant, compact editorial caption block.
  - Applied the exact same bottom-left positioning and 20% scale reduction to `.hero-slide-content` and `.hero-center-card` for visual consistency across any slide.
- **Verification & Deployment**:
  - Validated with `npm run build` (`tsc && vite build` passed with 0 errors).
  - Deployed live to Vercel production.
- **Curated Events Archive to Single Interactive Entry**:
  - Pruned all historical entries in `EventsPage.tsx` (`PAST_EVENTS`) down to a single row: **"AS WE ARE"** (August 28, 2025 · Studio PlusNine Stage 2 · Edmonton, AB · Archived).
  - Renamed title from `"VERNACULAR as we are issue launch"` to **`"AS WE ARE"`**.
  - Configured the entire row to be clickable with full keyboard accessibility (`Enter` / `Space`), navigating directly to the dedicated **AS WE ARE** page (`#/as-we-are`).
  - Added visual affordances: cursor pointer, hover color accent, and `ArrowUpRight` indicator.
  - Pruned `UpcomingSection.tsx` on the home page down to the 4K Film Festival and AS WE ARE.
- **Renamed "JUST — Movement & Form" to "WE WEREN'T ASLEEP"**:
  - Updated `PROJECTS_DATA` in `src/data/projects.ts` with `id: 'we-werent-asleep'`, `title: "WE WEREN'T ASLEEP"`, and cinematic nocturnal study description.
  - Updated `CollectiveSection.tsx` lookup to seamlessly reference `we-werent-asleep`.
- **Quality Verification & Production Deployment**:
  - Verified with `npm run build` (`tsc && vite build` passed with 0 errors).
  - Deployed to Vercel production.
- **Curated Work Archive to Two Key Works**:
  - Filtered `PROJECTS_DATA` down to strictly **"AS WE ARE"** and **"JUST — Movement & Form"**, deleting all extraneous project listings.
  - Updated category filter pills in `WorkPage.tsx` to `['ALL', 'FILM', 'EDITORIAL']`.
  - Updated `CollectiveSection.tsx` and `ProjectGrid.tsx` to safely reference the curated works without dead index errors.
  - Verified in browser with 0 console errors and deployed to Vercel production.
- **AS WE ARE CRT TV Placeholder Integration**:
  - Saved the user-provided retro CRT television artwork ("AS WE ARE", PLUS IX MAG, Vernacular 'V') to [`public/images/projects/as_we_are.jpg`](file:///c:/Users/Jimi/Downloads/The%20Anti-Gravity/New%20Gravity/PlusNine/public/images/projects/as_we_are.jpg) and [`public/images/projects/as_we_are.png`](file:///c:/Users/Jimi/Downloads/The%20Anti-Gravity/New%20Gravity/PlusNine/public/images/projects/as_we_are.png).
  - Automatically updates the video poster in `AsWeArePage.tsx`, video player modal poster, the editorial magazine spread in `RecentlySection.tsx`, and project index thumbnails.
  - Verified with `npm run typecheck`, `npm run build`, and browser testing. Deployed live to Vercel production.
- **Authentic 4K Film Festival Flyer Integration**:
  - Located the genuine high-resolution user-uploaded poster graphic (`.user_uploaded/media_1791342977536.png`) featuring the red cinema seats, The Roxy Theatre illustration, Nov. 12 2026 date, and Free Admission tickets.
  - Copied to `public/images/events/4k_film_festival.png` and `public/images/events/4k_film_festival.jpg`.
- **Reverted Broken 2-Column Grid Layout on Film Festival Page**:
  - Restored `FilmFestPage.tsx` and `src/styles/main.css` (`.fest-hero-container`), removing the injected nested card and returning to the full-bleed cinematic hero background.
- **Home Screen Hero Static Image**:
  - Replaced the home hero background video in `HeroVideo.tsx` with the static 4K Film Festival poster image (`/images/events/4k_film_festival.png`), preserving 16mm analog grain and vignette overlays.
  - Removed obsolete video refs and hooks to ensure clean compilation.
- **Verification & Deployment**:
  - Validated with `npm run typecheck` (0 errors), `npm run build` (success in 2.26s), and browser subagent visual testing.
  - Deployed live to Vercel production: https://plusnine.vercel.app.

### 2026-08-17 / 2026-08-18 — Initial Production Build & Full Deployment
- **Exploration & Asset Analysis**:
  - Analyzed `Logo/logo_oliseh.png`, `mouseIcon.png`, and `PlusNine 2026 (2025 Comp)_Re.mp4` (1920x1440 4:3 compilation).
  - Studied reference sites (Stink Films India Harris, A24, Iconoclast) and editorial context (*Vernacular: As We Are*).
- **Media Optimization Pipeline**:
  - Extracted 8 high-resolution 4:3 project stills from video compilation.
  - Encoded lightweight 4:3 WebM & MP4 hero teaser loops (`public/videos/hero_loop.*`).
  - Encoded full 6-minute web showreel (`public/videos/showreel_web.mp4`) with AAC stereo audio for smooth on-demand streaming.
- **Genuine 3D WebGL Brand Ident**:
  - Extracted 65 normalized polygon vertices from `logo_oliseh.png` to construct authentic `THREE.ExtrudeGeometry` with chamfered bevels.
  - Implemented dual-material shaders: white titanium front lacquer + polished liquid chrome side bevels with studio key/rim lighting.
  - Built coordinated `IntroLoader` with asset readiness detection and seamless camera dissolve into the hero video.
- **Custom Mouse Cursor & Design System**:
  - Implemented custom cursor using `mouseIcon.png` with contextual badges (`"WATCH REEL"`, `"VIEW"`, `"AUDIO"`, `"SEEK"`).
  - Created bespoke design tokens and typography hierarchy (Syne, Space Grotesk, Instrument Serif, Plus Jakarta Sans).
- **Editorial Showcase & Interactions**:
  - Built Stink Films-inspired `ProjectGrid` with corner brackets on hover, metadata badges, and split layout rhythms.
  - Implemented fullscreen `ShowreelModal` with clickable timecode scrubber, chapters, and keyboard shortcuts.
  - Built `StudioBio` manifesto and `Colophon` footer.

### 2026-08-18 — Targeted Refinements & Live Vercel Production Deployment
- **Oversized Bottom "PlusNine" Text Refinement**:
  - Corrected `.footer-big-title` typography scaling using `clamp(2.4rem, 11vw, 10rem)` and strict `overflow: hidden; max-width: 100%;`.
- **Deterministic 3D Logo Intro Refinement**:
  - Extended the 3D logo ident display duration to a deliberate 3.8-second cinematic rotation.
- **Bespoke Custom Scrollbar Implementation**:
  - Built `src/components/scrollbar/CustomScrollbar.tsx` with pointer-capture drag physics and global native scrollbar suppression.

### 2026-08-19 / 2026-08-20 — Physical Horizontal Carousel Track, asWeAre_final_trailer.mp4 & Production Deployment
- **4K Film Festival Official Poster & Details Integration**:
  - Integrated the official high-resolution static poster image (`/images/events/4k_film_festival.png`) for the 4K Film Festival hero section.
  - Updated festival details: `NOV. 12 2026`, `THE ROXY THEATRE · 10708 124 ST, EDMONTON AB T5M 0H1`, `FREE ADMISSION`, and `A celebration of African & Diaspora storytelling through film.` across `FilmFestPage.tsx`, `EventsPage.tsx`, and `FloatingDock.tsx`.
- **Home Navigation Button Added & AS WE ARE Video-Extracted Thumbnail**:
  - Added **`Home`** to the header navigation bar pill (`Home`, `Work`, `Events`, `People`, `About`) and mobile drawer.
  - Extracted high-resolution 1440x1080 thumbnail frames directly from `public/videos/asWeAre_final_trailer.mp4` for all project cards and preview cards.
- **AS WE ARE Dedicated Video Player Modal**:
  - Clicking **`WATCH VIDEO`** on the **`AS WE ARE`** page opens a dedicated 4:3 video player modal with full audio, playback scrubber timeline, real-time timecode (`00:14 / 00:36`), restart button, volume mute/unmute control, fullscreen toggle, and close controls.
  - Pauses background header video and **+9 Radio** on modal open; restores both automatically on close.
- **Removed Body Images from AS WE ARE Page**:
  - Cleaned up the body layout on the **AS WE ARE** page, removing the image gallery strip to present a pure editorial and typographic layout.
- **Submenu Preview (00:08 Frame & Live Hover)**:
  - When hovering over **`AS WE ARE`** in the `Work` submenu, transitions the homepage carousel to the `AS WE ARE` slide, seeks video to `00:08` (`currentTime = 8`), keeps the video playing without freezing, holds the carousel from auto-swiping while hovered, displays a floating glassmorphic `00:08 PREVIEW` thumbnail, and smoothly resumes carousel auto-advancing when unhovered.
- **Always Restart Video from Beginning on Slide Entry**:
  - Updated `HeroVideo.tsx` so when a video is swiped out of and later returns to the front, `video.currentTime = 0` is set to ensure it starts freshly from the beginning / start point and never resumes from where it stopped.
- **Dedicated AS WE ARE Page & Seamless Routing**:
  - Created dedicated editorial page `src/components/asweare/AsWeArePage.tsx` with full-width video header, large Montserrat Black title, **`WATCH VIDEO`** button, volume mute/unmute control.
  - Configured client-side hash routing (`#/as-we-are`) with smooth page transitions.
- **Audio & Media Coordination with +9 Radio**:
  - Video autoplays muted without pausing +9 Radio.
  - Unmuting video or clicking "Watch Video" automatically pauses +9 Radio.
  - Muting, pausing, or reaching the end of the video automatically resumes +9 Radio (only if it was playing beforehand).
- **Continuous Editorial Featured Works Section**:
  - Implemented single continuous editorial paragraph without cards, grids, or lists.
  - Individually hyperlinked each italicized piece to its official Vernacular publication article in a new tab (`target="_blank" rel="noopener noreferrer"`), leaving creator names unlinked.
  - Added primary **`EXPLORE AS WE ARE ↗`** CTA linking to `https://vernacularmag.ca/as-we-are`.
- **Hover Submenu with Star Removed**:
  - Configured **`Work`** submenu to open on hover on desktop with a 240ms debounce tolerance and invisible hit bridge.
  - Removed star icon (pure text: **`AS WE ARE`**).
  - Retained tap/click interaction for touch devices.
- **Persistent Global +9 Radio**:
  - Lifted `<HeroMusicPlayer />` to root `App.tsx` layout for continuous Spotify playback across all pages.
- **"AS WE ARE" Single Button Refinement**:
  - Changed the action button to **`Explore As We Are`** (navigates directly to the dedicated page).
  - Removed the `Watch` button from the **AS WE ARE** spotlight slide for a clean, focused single pill layout.
- **Work Submenu Nav Glass Effect**:
  - Applied the exact glass effect from the navigation dock to `.dock-popup-menu` (`var(--bg-glass)`, `backdrop-filter: blur(24px) saturate(180%)`, and `var(--border-medium)`).
- **"Radio" Removal from Navigation**:
  - Removed the `Radio` button from the bottom navigation dock and menu drawer.
  - Pinned `PlusNine Radio` on the bottom-left remains accessible for continuous Spotify listening.
- **Global Drop Shadow & Box Shadow Elimination**:
  - Completely removed all `box-shadow`, `drop-shadow`, and `text-shadow` across all buttons, header elements, navigation menu drawer, search bar, chips, controls, and dialogs.
- **Upgraded Hero Video 1 to Full 1920x1440 HD**:
  - Re-encoded `public/videos/hero_loop.mp4` directly from the master source at pristine **1920x1440 HD** 4:3 resolution with FastStart web streaming.
  - Extracted a high-definition poster frame (`public/images/hero_poster.jpg`).
- **"AS WE ARE" Title & Subtitle Width Optimization**:
  - Updated Slide 2 headline to **`AS WE ARE`** in Montserrat Black.
  - Reduced description textbox width to `max-width: clamp(260px, 34vw, 400px);` for a clean, compact editorial layout.
- **Montserrat Black Typography Update**:
  - Upgraded `.hero-center-title` across all video headers to **Montserrat Black** (`font-weight: 900`, `letter-spacing: -0.02em`).
  - Integrated `Montserrat:wght@800;900` via Google Fonts.
- **Infinite Same-Direction Carousel Looping**:
  - Engineered circular track cloning architecture so that when advancing past the last slide, the carousel continues swiping smoothly in the exact same forward direction instead of rewinding / swiping backwards.
- **Static Pagination Indicators with Active Video Progress Fill**:
  - Pinned the pagination controls to `.hero-static-pagination` at the viewport overlay level.
  - Indicators remain completely static while videos, titles, subtitles, and CTA buttons translate horizontally beneath them.
  - Active expanded pill contains an animated linear progress bar (`.hero-dot-progress`) displaying the current 8-second video countdown and pausing on user pause.
- **Desktop Drag-to-Swipe Removal**:
  - Removed desktop mouse drag swipe listeners and grab cursor icons from the home screen hero section.
  - Custom luxury cursor now moves seamlessly across the viewport without triggering slide shifts on mouse clicks/drags.
  - Retained mobile touch gesture swipe support.
- **Timestamps & Time Offsets Removal**:
  - Removed all `startTime` and seeking offsets from all hero video slides and showreel triggers. All videos play cleanly from `00:00`.
- **asWeAre_final_trailer.mp4 Replacement & FastStart Web Optimization**:
  - Replaced the AS WE ARE background video with `asWeAre_final_trailer.mp4` (1440x1080 4:3, 36.1s duration).
  - Processed with `+faststart` for instant 0.05s bufferless web streaming.
  - Deployed to Vercel production.
- **Refined Editorial Description for *AS WE ARE***:
  - Concise subtitle: *"Reflecting on the beauty, strength, and quiet rhythms of Black life."*
  - Updated across hero carousel spotlight and project catalog.
- **Circular Progress Play/Pause Countdown Button**:
  - Replaced the standard play button with a circular countdown ring button that visually fills clockwise over 8 seconds.
  - Removed the mute/unmute button from the bottom-right transport controls.
- **8-Second Auto-Advance Hero Carousel**:
  - Configured home screen spotlight carousel to automatically advance every 8 seconds when the background video is playing.
  - Manual slide navigation (`<` / `>` or pagination dots) automatically resets the 8-second countdown timer.
  - Pausing video loop (`⏸`) pauses the auto-advance cycle; resuming (`▶`) resumes it.
- **Nav Separator Line Removal**:
  - Permanently removed the vertical separator line between **Production** and **World** in both `FloatingDock.tsx` markup and `main.css`.
- **Left-Side Radio Placement**:
  - Moved the pinned **PlusNine Radio** Spotify player pill to the bottom-left (`bottom: 24px; left: 28px;`) with a left-anchored expanded card popover.
- **Hero Headline Update**:
  - Updated primary spotlight title to **`"WE WEREN'T ASLEEP"`** with tagline *"A cinematic study on nocturnal rhythm, presence, and motion."*
- **Text-Only Bottom Dock**:
  - Removed all icons from the bottom floating dock buttons for an ultra-clean, minimalist editorial typography presentation (`Home`, `Work`, `Events`, `People`, `Production`, `World`).
- **Studio Fleece / Stink Films Home Screen Restructure**:
  - Rebuilt `HeroVideo.tsx` and `main.css` to match the exact Nike Studio Fleece visual hierarchy.
- **MAGAZINE Header Button**:
  - Replaced the hamburger menu button with a dedicated glassmorphic **`MAGAZINE`** pill button on the top-left of the header.
  - Linked to PlusNine's official magazine Instagram: `https://www.instagram.com/plusnine.mag/` (`target="_blank"`).
- **Loading Screen Removal**:
  - Removed `IntroLoader` from `App.tsx` so the home page and 480p opening film video load and play instantly on arrival.
- **PlusNine Radio (Direct Spotify Integration)**:
  - Streamlined audio player with official Spotify Web Player embeds for Nachel, Naní, Sekani., and Whatistoluwani.
- **Vercel Production Deployment**:
  - Deployed to Vercel production at `https://plusnine.vercel.app`.

### 2026-10-08 — Authentic Multidisciplinary Collective About Page Refinement
- **Replaced Director-Led Studio Framing with Multidisciplinary Collective Identity**:
  - Maintained the signature visual design: oversized Arial Black uppercase display headings, contrasting Georgia italic serif typography, warm paper background (`#f1f0eb`), black typography (`#080808`), and editorial magazine aesthetic.
  - Removed outdated studio disciplines (35mm/16mm film directing claims, physical stage rental references, invented agency capabilities).
- **Updated Opening Header**:
  - Preserved `ABOUT plusnine.` title and updated tag to `CREATIVE COLLECTIVE · EDMONTON`.
  - Replaced subtitle with: *"An independent, multidisciplinary creative collective rooted in African culture and the diaspora. Based in Edmonton, Canada, and connected by people, ideas, and experiences that extend far beyond it."*
- **Refined Section 1: OUR POINT OF VIEW**:
  - Headline: `DIFFERENT MINDS.` / *`SHARED CULTURE.`* / `ENDLESS WAYS TO` / *`create.`*
  - Authentic 3-paragraph narrative on founding intent, evolving African culture, and cross-disciplinary collaboration across music, fashion, photo, film, design, editorial, marketing, and events.
- **Added Section 2: WHAT WE DO (Asymmetrical Split Layout)**:
  - Headline: `WE CREATE THINGS.` / *`WE BRING PEOPLE TOGETHER.`* / `WE MAKE ROOM FOR` / *`more.`*
  - Styled with editorial pull-quote: *"Our work takes different forms because our interests do too."* with signal orange left accent line.
  - Details print magazine, screenings, music projects, campaigns, and creative community relationships.
- **Added Section 3: THE PEOPLE BEHIND IT**:
  - Headline: `INDIVIDUAL VOICES.` / *`ONE COLLECTIVE.`*
  - Highlights members' individual pursuits (music, fashion, design, brands) alongside shared collective identity.
  - Interactive subtle text CTA: `MEET THE COLLECTIVE ↗` navigating directly to `#/people`.
- **Added Section 4: WHY IT MATTERS**:
  - Headline: `OUR CULTURE.` / *`OUR COMMUNITY.`* / `OUR STORIES TO` / *`tell.`*
  - Lead quote: *"Representation matters, but so does having the freedom to tell our stories in our own ways."* followed by celebratory narrative.
- **Added Section 5: Closing Statement Pedestal**:
  - Concluding pedestal with generous spacing and monumental typography: `THIS IS OUR CULTURE.` / `OUR COMMUNITY.` / *`Welcome home.`*
- **Verification & Deployment**:
  - Verified with `npm run typecheck` (0 errors).
  - Verified with `npm run build` (clean 2.3s Vite build).
  - Browser subagent verified on desktop and mobile viewports (zero overflow, zero clipping, smooth responsiveness).
  - Deployed live to Vercel production: https://plusnine.vercel.app.

### 2026-10-08 — 4K Film Festival Event Hero Refinement (Artwork-First Focus)
- **Artwork-First Hero Presentation**:
  - Removed the oversized HTML heading `4K FILM FESTIVAL` that obscured the background artwork.
  - Preserved the festival background artwork in its original aspect ratio (1024x644) without aggressive cropping or heavy darkening filters.
  - Prioritized the embedded artwork elements: The Roxy Theatre illustration and venue text on the left, the official 4K FILM FESTIVAL logo in the center, and the vintage free admission tickets on the right are 100% visible and unblocked.
- **Hero Height Reduction**:
  - Reduced desktop hero section height to ~520px (from previous 85vh / ~820px), allowing the Festival Roadmap section to be visible immediately above the fold / upon light scrolling.
- **Compact Essential Information Bar**:
  - Replaced multiple oversized chips, tags, and large synopsis blocks with a compact, glassmorphic dock:
    - Date: `NOV. 12, 2026`
    - Venue: `THE ROXY THEATRE · EDMONTON`
    - Short description: `A celebration of African & Diaspora storytelling through film.`
    - Compact admission button: `Reserve Free Admission Pass ↗` (retaining full RSVP modal functionality).
  - Removed redundant decorative badges (`FREE ADMISSION · OFFICIAL EVENT`) and the `BACK TO OVERVIEW` button.
- **Responsive Mobile Layout**:
  - Set the artwork to scale responsively with natural proportions on mobile devices.
  - Positioned the compact event info card cleanly below the artwork rather than overlaying it, preventing any text obstruction.
- **Verification & Deployment**:
  - Verified with `npm run typecheck` (0 errors).
  - Verified with `npm run build` (clean 2.27s build).
  - Verified via browser subagent on both desktop (1440x900) and mobile (390x844) viewports.
  - Deployed to Vercel production: https://plusnine.vercel.app.

### 2026-10-08 — Full-Width Cinematic Banner Hero & Localized Gradient Hero Refinement
- **4K Film Festival Full-Width Hero**:
  - Expanded festival hero to span full browser width edge-to-edge (`width: 100%`), eliminating narrow centered containers and black side margins.
  - Set desktop height to `clamp(480px, 64vh, 620px)`, significantly shorter than full viewport height (`not 100vh`).
  - The top of the Festival Roadmap section is immediately visible on the initial desktop viewport.
  - Aligned the background artwork (`object-position: center 2%`) so the Roxy Theatre illustration, 4K FILM FESTIVAL logo, and tickets remain prominent and unobstructed.
  - Positioned the event details (date, venue, short synopsis, and `Reserve Free Admission Pass` button) as a compact bottom-left overlay.
  - Implemented a localized black radial gradient behind the bottom-left text (`radial-gradient(ellipse 65% 55% at 0% 100%, ...)`) that fades upward and to the right, leaving the central festival logo and tickets completely un-darkened.
  - Preserved responsive mobile layout (<= 640px) placing the compact event info card directly below the artwork.
- **Homepage Hero Localized Gradient & Brightness**:
  - Replaced the heavy full-screen dimming overlay (`brightness(0.68)`) with brighter, more vibrant media (`brightness(0.92) contrast(1.06)`).
  - Implemented the identical localized bottom-left radial gradient behind the content group, keeping text, tags, and action buttons crisp while letting the background video/imagery shine across all carousel slides.
- **Verification & Deployment**:
  - Verified with `npm run typecheck` (0 errors).
  - Verified with `npm run build` (clean 2.58s build).
  - Browser testing verified both desktop (1440x900) and mobile (390x844) viewports for both pages.
  - Deployed live to Vercel production: https://plusnine.vercel.app.

### 2026-10-08 — 4K Film Festival Promotional Imagery Update (Center-Focused Placement)
- **Saved New User Artwork**:
  - Copied user-uploaded artwork `media_1791430267487.png` (1024x644) to `public/images/events/4k_film_festival_promo.png`.
- **Homepage Hero Carousel**:
  - Updated slide `4k-film-festival` in `src/data/heroSlides.ts` to use `/images/events/4k_film_festival_promo.png`.
  - Enforced `object-position: center center` in `HeroVideo.tsx` and `src/styles/main.css` (`.hero-editorial-video`) ensuring even cropping around the exact center of the artwork.
- **Events Page Featured Card**:
  - Updated `FEATURED_EVENT.image` in `src/components/pages/EventsPage.tsx` to use `/images/events/4k_film_festival_promo.png`.
  - Configured `object-position: center center` in `.events-feature-img` in `src/styles/main.css`.
- **Dedicated 4K Film Festival Page Preserved**:
  - Left `FilmFestPage.tsx` and its existing hero artwork (`/images/events/4k_film_festival.png`) completely unchanged.
- **Verification & Deployment**:
  - Verified with `npm run typecheck` (0 errors).
  - Verified with `npm run build` (clean 2.66s Vite build).
  - Verified across browser viewports (homepage, events page, and festival page).
  - Deployed live to Vercel production: https://plusnine.vercel.app.
