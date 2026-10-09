import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, BookOpen, Mail } from 'lucide-react';
import { ExpandableSearch } from './ExpandableSearch';
import { HamburgerDrawer } from './HamburgerDrawer';
import { Project, PageType } from '../../data/projects';

interface FloatingDockProps {
  onOpenShowreel?: (timestamp?: number) => void;
  onSelectProject?: (project: Project) => void;
  onNavigate?: (page: PageType) => void;
  currentPage?: PageType;
}

export interface FeaturedNavEvent {
  page: PageType;
  title: string;
  metadata: string;
  arrow?: string;
}

export const FEATURED_NAV_EVENT: FeaturedNavEvent = {
  page: 'film-fest',
  title: '4K FILM FEST',
  metadata: 'NOV 12, 2026',
  arrow: '↗'
};

export const FloatingDock: React.FC<FloatingDockProps> = ({
  onOpenShowreel,
  onSelectProject,
  onNavigate,
  currentPage = 'home'
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (page: PageType, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        {/* Top Left: PlusNine +9 Emblem Mark */}
        <div className="site-header__left">
          <a
            href="#/"
            onClick={(e) => handleLinkClick('home', e)}
            className="site-header__logo-link"
            aria-label="PlusNine Home"
          >
            <img
              src="/logo/logo_oliseh.png"
              alt="PlusNine Emblem"
              className="site-header__logo-img"
            />
          </a>
        </div>

        {/* Top Center: Rounded Black Navigation Pill */}
        <div className="site-header__center">
          <nav className="floating-dock-pill" aria-label="Main Navigation">
            <a
              href="#/"
              onClick={(e) => handleLinkClick('home', e)}
              className={`floating-dock-pill__link ${currentPage === 'home' ? 'is-active' : ''}`}
            >
              Home
            </a>

            <a
              href="#/work"
              onClick={(e) => handleLinkClick('work', e)}
              className={`floating-dock-pill__link ${currentPage === 'work' ? 'is-active' : ''}`}
            >
              Work
            </a>

            <a
              href="#/events"
              onClick={(e) => handleLinkClick('events', e)}
              className={`floating-dock-pill__link ${currentPage === 'events' ? 'is-active' : ''}`}
            >
              Events
            </a>

            <a
              href="#/people"
              onClick={(e) => handleLinkClick('people', e)}
              className={`floating-dock-pill__link ${currentPage === 'people' ? 'is-active' : ''}`}
            >
              People
            </a>

            <a
              href="#/about"
              onClick={(e) => handleLinkClick('about', e)}
              className={`floating-dock-pill__link ${currentPage === 'about' ? 'is-active' : ''}`}
            >
              About
            </a>

            {/* Vertical Divider */}
            <span className="floating-dock-pill__divider" aria-hidden="true" />

            {/* Dynamic Featured Event: Subtle Outlined Pill */}
            <a
              href={`#/${FEATURED_NAV_EVENT.page}`}
              onClick={(e) => handleLinkClick(FEATURED_NAV_EVENT.page, e)}
              className={`floating-dock-pill__featured ${
                currentPage === FEATURED_NAV_EVENT.page ? 'is-active' : ''
              }`}
              aria-label={`${FEATURED_NAV_EVENT.title} ${FEATURED_NAV_EVENT.arrow} ${FEATURED_NAV_EVENT.metadata}`}
            >
              <span className="floating-dock-pill__featured-title">
                {FEATURED_NAV_EVENT.title}
                <span className="floating-dock-pill__featured-arrow">{FEATURED_NAV_EVENT.arrow}</span>
              </span>
              <span className="floating-dock-pill__featured-meta">
                {FEATURED_NAV_EVENT.metadata}
              </span>
            </a>
          </nav>
        </div>

        {/* Top Right: Search + Magazine + Contact + Mobile Hamburger */}
        <div className="site-header__right">
          <ExpandableSearch onSelectProject={onSelectProject} onNavigate={onNavigate} />

          <a
            href="https://www.instagram.com/plusnine.mag/"
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__magazine-btn"
            aria-label="PlusNine Magazine"
          >
            <BookOpen size={12} />
            <span>MAGAZINE</span>
            <ArrowUpRight size={11} />
          </a>

          <a
            href="mailto:plus9ineent@gmail.com"
            className="site-header__contact-btn site-header__contact-btn--expandable"
            aria-label="Contact PlusNine"
          >
            <Mail size={13} className="site-header__contact-icon" />
            <span className="site-header__contact-text">Contact</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="site-header__menu-btn"
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <HamburgerDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={onNavigate}
        currentPage={currentPage}
        onOpenShowreel={onOpenShowreel}
      />
    </>
  );
};

export default FloatingDock;
