import React, { useState, useEffect, useRef } from 'react';
import { CustomScrollbar } from './components/scrollbar/CustomScrollbar';
import { FloatingDock } from './components/nav/FloatingDock';
import { HeroVideo } from './components/hero/HeroVideo';
import { RecentlySection } from './components/editorial/RecentlySection';
import { CollectiveSection } from './components/editorial/CollectiveSection';
import { UpcomingSection } from './components/editorial/UpcomingSection';
import { Colophon } from './components/footer/Colophon';
import { ShowreelModal } from './components/player/ShowreelModal';
import { AsWeArePage } from './components/asweare/AsWeArePage';
import { WorkPage } from './components/pages/WorkPage';
import { EventsPage } from './components/pages/EventsPage';
import { PeoplePage } from './components/pages/PeoplePage';
import { AboutPage } from './components/pages/AboutPage';
import { FilmFestPage } from './components/pages/FilmFestPage';
import { Project, PageType } from './data/projects';
import './styles/main.css';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [showreelStartTime, setShowreelStartTime] = useState(0);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Synchronize with clean URL path-based routing & handle legacy hash auto-migration
  useEffect(() => {
    const parseRoute = (): PageType => {
      let pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
      const rawHash = window.location.hash.toLowerCase();

      // Check for legacy hash routes (e.g., /#/people, #/work, /film-fest#/people)
      // Exclude intentional in-page anchors like #roadmap
      if (rawHash && !rawHash.startsWith('#roadmap')) {
        const hashTarget = rawHash.replace(/^#\/?/, '');
        if (
          hashTarget.startsWith('work') ||
          hashTarget.startsWith('events') ||
          hashTarget.startsWith('people') ||
          hashTarget.startsWith('about') ||
          hashTarget.startsWith('film-fest') ||
          hashTarget.startsWith('as-we-are') ||
          hashTarget.startsWith('film-submission')
        ) {
          const cleanPath = `/${hashTarget}`;
          window.history.replaceState(null, '', cleanPath);
          pathname = cleanPath;
        }
      }

      const path = pathname.replace(/^\//, '');

      if (path.startsWith('film-submission')) {
        window.location.href = '/film-submission';
        return 'home';
      }
      if (path.startsWith('film-fest')) return 'film-fest';
      if (path.startsWith('as-we-are')) return 'as-we-are';
      if (path.startsWith('work')) return 'work';
      if (path.startsWith('events')) return 'events';
      if (path.startsWith('people')) return 'people';
      if (path.startsWith('about')) return 'about';
      return 'home';
    };

    const handleLocationChange = () => {
      const target = parseRoute();
      if (target !== currentPage) {
        performNavigation(target, false);
      }
    };

    const initialTarget = parseRoute();
    if (initialTarget !== 'home') {
      setCurrentPage(initialTarget);
    }

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [currentPage]);

  // Support intentional in-page anchor scrolling (e.g. #roadmap)
  useEffect(() => {
    if (window.location.hash === '#roadmap') {
      const el = document.getElementById('roadmap');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
      }
    }
  }, [currentPage]);

  // Synchronize Open Graph & Twitter Card metadata dynamically
  useEffect(() => {
    const updateMetaTag = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name="')) {
          el.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        } else if (selector.startsWith('meta[property="')) {
          el.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    if (currentPage === 'film-fest') {
      const title = '4K Film Festival 2026 | PlusNine';
      const description = 'A celebration of African and diaspora storytelling through film. November 12, 2026 at The Roxy Theatre, Edmonton. Free admission.';
      const url = 'https://www.plusnine.org/film-fest';
      const image = 'https://www.plusnine.org/images/og-filmfest.png';
      const imageAlt = '4K Film Festival 2026 — PlusNine';

      document.title = title;
      updateMetaTag('meta[name="description"]', 'content', description);
      updateMetaTag('meta[property="og:title"]', 'content', title);
      updateMetaTag('meta[property="og:description"]', 'content', description);
      updateMetaTag('meta[property="og:url"]', 'content', url);
      updateMetaTag('meta[property="og:image"]', 'content', image);
      updateMetaTag('meta[property="og:image:secure_url"]', 'content', image);
      updateMetaTag('meta[property="og:image:alt"]', 'content', imageAlt);
      updateMetaTag('meta[name="twitter:title"]', 'content', title);
      updateMetaTag('meta[name="twitter:description"]', 'content', description);
      updateMetaTag('meta[name="twitter:url"]', 'content', url);
      updateMetaTag('meta[name="twitter:image"]', 'content', image);
      updateMetaTag('meta[name="twitter:image:alt"]', 'content', imageAlt);
    } else {
      const title = 'PlusNine | Culture & Community';
      const description = 'An independent collective bringing people together through art, music, film, fashion, and shared cultural experiences.';
      const url = 'https://www.plusnine.org/';
      const image = 'https://www.plusnine.org/images/og-homepage.png';
      const imageAlt = 'PlusNine | Culture & Community';

      document.title = title;
      updateMetaTag('meta[name="description"]', 'content', description);
      updateMetaTag('meta[property="og:title"]', 'content', title);
      updateMetaTag('meta[property="og:description"]', 'content', description);
      updateMetaTag('meta[property="og:url"]', 'content', url);
      updateMetaTag('meta[property="og:image"]', 'content', image);
      updateMetaTag('meta[property="og:image:secure_url"]', 'content', image);
      updateMetaTag('meta[property="og:image:alt"]', 'content', imageAlt);
      updateMetaTag('meta[name="twitter:title"]', 'content', title);
      updateMetaTag('meta[name="twitter:description"]', 'content', description);
      updateMetaTag('meta[name="twitter:url"]', 'content', url);
      updateMetaTag('meta[name="twitter:image"]', 'content', image);
      updateMetaTag('meta[name="twitter:image:alt"]', 'content', imageAlt);
    }
  }, [currentPage]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const performNavigation = (nextPage: PageType, updateUrl: boolean = true) => {
    if (nextPage === currentPage && !isTransitioning) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setCurrentPage(nextPage);
    setIsTransitioning(true);

    if (updateUrl) {
      const nextPath = nextPage === 'home' ? '/' : `/${nextPage}`;
      if (window.location.pathname !== nextPath) {
        window.history.pushState(null, '', nextPath);
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const handleNavigate = (page: PageType) => {
    performNavigation(page, true);
  };

  const handleSelectProject = (project: Project) => {
    if (project.id === 'as-we-are') {
      handleNavigate('as-we-are');
      return;
    }
    setShowreelStartTime(0);
    setIsShowreelOpen(true);
  };

  const handleOpenShowreel = (_timestamp: number = 0) => {
    setShowreelStartTime(0);
    setIsShowreelOpen(true);
  };

  const renderPageContent = (page: PageType) => {
    switch (page) {
      case 'as-we-are':
        return <AsWeArePage onBackToHome={() => handleNavigate('home')} />;
      case 'work':
        return <WorkPage onSelectProject={handleSelectProject} onNavigate={handleNavigate} />;
      case 'events':
        return <EventsPage onNavigate={handleNavigate} />;
      case 'people':
        return <PeoplePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'film-fest':
        return (
          <FilmFestPage
            onNavigate={handleNavigate}
            onOpenShowreel={handleOpenShowreel}
          />
        );
      case 'home':
      default:
        return (
          <>
            {/* 1. Current feature hero (Dark #080808 + video texture) */}
            <HeroVideo
              onOpenShowreel={handleOpenShowreel}
              onNavigate={handleNavigate}
            />

            {/* 2. Recently at +9 (Pure white #ffffff · NOT A FEED / A POINT OF VIEW) */}
            <RecentlySection onNavigate={handleNavigate} />

            {/* 3. From the Collective (Near-black #080808 · Asymmetrical Releases) */}
            <CollectiveSection
              onSelectProject={handleSelectProject}
              onNavigate={handleNavigate}
            />

            {/* 4. Upcoming (Pure white #ffffff · Horizontal Editorial Rows) */}
            <UpcomingSection onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <div className="plusnine-app-root">
      {/* Custom Scrollbar */}
      <CustomScrollbar />

      {/* Persistent Navigation Dock Header */}
      <FloatingDock
        onOpenShowreel={handleOpenShowreel}
        onSelectProject={handleSelectProject}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {/* Main Viewport Content */}
      <main className={`plusnine-main-viewport ${isTransitioning ? 'is-fading' : ''}`}>
        <div className="page-static-view">
          {renderPageContent(currentPage)}
        </div>
      </main>

      {/* 5. Make Something With Us & Minimal Colophon Footer */}
      <Colophon onNavigate={handleNavigate} />

      {/* Fullscreen 2026 Showreel Modal Player */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        initialTime={showreelStartTime}
      />
    </div>
  );
};

export default App;
