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

  // Synchronize with URL hash routing
  useEffect(() => {
    const parseHash = (): PageType => {
      const hash = window.location.hash.toLowerCase().replace('#/', '').replace('#', '');
      if (hash.startsWith('film-submission')) {
        window.location.href = '/film-submission';
        return 'home';
      }
      if (hash.startsWith('as-we-are')) return 'as-we-are';
      if (hash.startsWith('work')) return 'work';
      if (hash.startsWith('events')) return 'events';
      if (hash.startsWith('people')) return 'people';
      if (hash.startsWith('about')) return 'about';
      if (hash.startsWith('film-fest')) return 'film-fest';
      return 'home';
    };

    const handleHashChange = () => {
      const target = parseHash();
      if (target !== currentPage) {
        performNavigation(target, false);
      }
    };

    const initialTarget = parseHash();
    if (initialTarget !== 'home') {
      setCurrentPage(initialTarget);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const performNavigation = (nextPage: PageType, updateHash: boolean = true) => {
    if (nextPage === currentPage && !isTransitioning) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setCurrentPage(nextPage);
    setIsTransitioning(true);

    if (updateHash) {
      window.location.hash = nextPage === 'home' ? '/' : `/${nextPage}`;
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

            {/* 2. Recently at +9 (Warm paper #f1f0eb · NOT A FEED / A POINT OF VIEW) */}
            <RecentlySection onNavigate={handleNavigate} />

            {/* 3. From the Collective (Near-black #080808 · Asymmetrical Releases) */}
            <CollectiveSection
              onSelectProject={handleSelectProject}
              onNavigate={handleNavigate}
            />

            {/* 4. Upcoming (Warm paper #f1f0eb · Horizontal Editorial Rows) */}
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
