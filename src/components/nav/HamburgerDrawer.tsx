import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { PageType } from '../../data/projects';

interface HamburgerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: PageType) => void;
  currentPage?: PageType;
  onOpenShowreel?: (timestamp?: number) => void;
}

interface NavItem {
  page: PageType;
  label: string;
  isFeatured?: boolean;
  badge?: string;
  isMagazine?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { page: 'home', label: 'HOME' },
  { page: 'work', label: 'WORK' },
  { page: 'events', label: 'EVENTS' },
  { page: 'people', label: 'PEOPLE' },
  { page: 'about', label: 'ABOUT' },
  { page: 'film-fest', label: '4K FILM FEST', isFeatured: true, badge: 'NOV 12' },
  { page: 'as-we-are', label: 'MAGAZINE', isMagazine: true },
];

export const HamburgerDrawer: React.FC<HamburgerDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentPage = 'home'
}) => {
  const [edmontonTime, setEdmontonTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Edmonton',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setEdmontonTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleItemClick = (page: PageType) => {
    onClose();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="mobile-drawer-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div className="mobile-drawer-inner">
        {/* Top Header: Brand Emblem + Simple Modern Close Button */}
        <div className="mobile-drawer-header">
          <button
            type="button"
            onClick={() => handleItemClick('home')}
            className="mobile-drawer-brand"
            aria-label="PlusNine Home"
          >
            <img
              src="/logo/logo_oliseh.png"
              alt="PlusNine Logo"
              className="mobile-drawer-logo-img"
            />
            <span className="mobile-drawer-brand-tag">PLUSNINE</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mobile-drawer-close-btn"
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Clean Vertical Navigation */}
        <nav className="mobile-drawer-nav" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleItemClick(item.page)}
                className={`mobile-drawer-nav-item ${isActive ? 'is-active' : ''} ${
                  item.isFeatured ? 'is-featured' : ''
                } ${item.isMagazine ? 'is-magazine' : ''}`}
              >
                <span className="mobile-drawer-nav-item__label">{item.label}</span>

                {item.isFeatured && (
                  <span className="mobile-drawer-nav-item__fest-indicator">
                    <span className="mobile-drawer-fest-dot" aria-hidden="true" />
                    {item.badge && (
                      <span className="mobile-drawer-fest-badge">{item.badge}</span>
                    )}
                  </span>
                )}

                {item.isMagazine && (
                  <span className="mobile-drawer-nav-item__mag-indicator" aria-hidden="true">
                    <ArrowUpRight size={15} />
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Clutter-Free Refined Footer */}
        <div className="mobile-drawer-footer">
          <div className="mobile-drawer-footer-time">
            <span className="mobile-drawer-time-pulse" aria-hidden="true" />
            <span>MST {edmontonTime || '4:30:00 PM'}</span>
          </div>

          <div className="mobile-drawer-footer-links">
            <a
              href="mailto:plus9ineent@gmail.com"
              className="mobile-drawer-footer-link"
            >
              plus9ineent@gmail.com
            </a>
            <span className="mobile-drawer-footer-sep" aria-hidden="true">&middot;</span>
            <a
              href="https://www.instagram.com/plusnine.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-drawer-footer-link"
            >
              <span>Instagram</span>
              <ArrowUpRight size={11} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerDrawer;
