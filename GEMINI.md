# PlusNine — Creative Studio & Visual Culture Platform

## Overview
PlusNine is an independent creative development house, film production studio, and cultural magazine platform based in Edmonton, Alberta and operating globally. The website is engineered as a cinematic editorial platform for a Black-led creative collective: visual, tactile, cultured, and current. It features deliberate visual alternation between near-black (`#080808`), pure white (`#ffffff`), and signal orange-red (`#ff3b16`), paired with a signature typography contrast of **Arial Black** uppercase display, **Georgia** italic serif emphasis, and **Arial/Helvetica** editorial metadata.

## Production & Repository URLs
- **Live Site**: [https://plusnine.vercel.app](https://plusnine.vercel.app)
- **GitHub Repository**: [https://github.com/SAINtElliss/plusnine](https://github.com/SAINtElliss/plusnine)

## Tech Stack
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Vanilla CSS with modern custom properties and typography tokens
- **Icons**: `lucide-react`
- **Deployment**: Vercel (Production)
- **Media Optimization**: Custom FFmpeg pipeline (WebM VP9/VP8, MP4 H.264 FastStart, 480p analog noise textures)

## Project Structure
```
PlusNine/
├── index.html                   # HTML entry with Google Fonts
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # Strict TypeScript configuration
├── package.json                 # Project dependencies & scripts
├── vercel.json                  # Vercel deployment configuration & caching
├── GEMINI.md                    # Project definition & handoff reference
├── project_history.md           # Session activity log
├── scripts/
│   └── generate-meta-pages.js   # Pre-render generator for social crawler HTML pages
├── public/
│   ├── images/
│   │   ├── og-homepage.png      # 1200x630 Homepage social preview (logo on black)
│   │   ├── og-filmfest.png      # 1200x630 4K Film Festival social preview (theatre artwork)
│   │   ├── hero_poster.jpg      # Hero 480p video poster image
│   │   ├── noise.png            # 16mm analog grain texture map
│   │   └── projects/            # Extracted project still frames
│   ├── videos/
│   │   ├── hero_loop.webm       # 480p WebM loop with film noise (~4MB)
│   │   ├── hero_loop.mp4        # 480p MP4 H.264 loop with film noise (~2.5MB)
│   │   └── showreel_web.mp4     # Optimized 6-minute web showreel
│   └── logo/
│       └── logo_oliseh.png      # Primary logo emblem
└── src/
    ├── main.tsx                 # Application entry point
    ├── App.tsx                  # Root orchestrator & HTML5 History router (clean path routes)
    ├── styles/
    │   ├── tokens.css           # Color tokens (#080808, #ffffff, #ff3b16), typography
    │   └── main.css             # Main stylesheet, editorial moments & responsive rules
    ├── data/
    │   ├── projects.ts          # PlusNine project metadata & PageType union
    │   ├── heroSlides.ts        # Modular hero slides data configuration
    │   └── members.ts           # PlusNine 11-member roster & profile data
    ├── utils/
    │   └── eventbrite.ts        # Official Eventbrite modal checkout widget integration
    └── components/
        ├── scrollbar/
        │   └── CustomScrollbar.tsx # Bespoke PlusNine scrollbar with drag & seek
        ├── nav/
        │   ├── FloatingDock.tsx # Black pill nav (Work, Events, People, About | Film Fest)
        │   ├── HamburgerDrawer.tsx # Mobile fullscreen black drawer with Arial Black links
        │   └── ExpandableSearch.tsx # Instant project search dropdown
        ├── hero/
        │   └── HeroVideo.tsx    # Section 1: Film Fest feature hero + 16mm noise loop
        ├── editorial/
        │   ├── RecentlySection.tsx # Section 2: Warm paper magazine spread (As We Are)
        │   ├── CollectiveSection.tsx # Section 3: Near-black asymmetrical member releases
        │   └── UpcomingSection.tsx # Section 4: Warm paper horizontal row with orange hover fill
        ├── pages/
        │   ├── WorkPage.tsx     # /work: Asymmetrical numbered archive
        │   ├── EventsPage.tsx   # /events: Next-event feature & chronological archive
        │   ├── PeoplePage.tsx   # /people: Editorial circular directory & profile view
        │   ├── AboutPage.tsx    # /about: Studio manifesto statement & practices
        │   └── FilmFestPage.tsx # /film-fest: Immersive festival programme & passes
        ├── filmfest/
        │   └── FestivalRoadmap.tsx # 4K Film Festival vertical timeline roadmap
        ├── asweare/
        │   └── AsWeArePage.tsx  # /as-we-are: Dedicated editorial issue showcase
        ├── player/
        │   └── ShowreelModal.tsx# Fullscreen showreel modal player & continuous controls
        └── footer/
            └── Colophon.tsx     # Section 5: "MAKE SOMETHING WITH US." & live MST clock
```

## Commands
- **Development Server**: `npm run dev` (starts on `http://localhost:3001/`)
- **Typecheck**: `npm run typecheck` (`tsc --noEmit`)
- **Production Build**: `npm run build` (`tsc && vite build`)
- **Deploy to Vercel**: `npx -y vercel --prod --yes --scope folajinmi13-1183s-projects`

## Continuous Deployment Protocol (Mandatory)
- **Always Deploy**: Every implemented change, fix, or update must be immediately built, verified, and deployed to Vercel production without waiting for a separate deploy request:
  1. `npm run typecheck`
  2. `npm run build`
  3. `npx -y vercel --prod --yes --scope folajinmi13-1183s-projects`
  4. Provide the live production and alias URLs in the response.
