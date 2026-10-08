import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { PageType } from '../../data/projects';

interface ColophonProps {
  onNavigate?: (page: PageType) => void;
}

export const Colophon: React.FC<ColophonProps> = ({ onNavigate }) => {
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

  const handleLinkClick = (page: PageType, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.hash = `/${page === 'home' ? '' : page}`;
    }
  };

  return (
    <footer id="contact" className="site-footer-editorial">
      <div className="container">
        {/* Section 5: Massive Contact Invitation */}
        <div className="footer-invitation-block">
          <div className="editorial-label-row">
            <span className="editorial-label-meta" style={{ color: 'var(--text-secondary)' }}>
              Collaborations &middot; Commissions &middot; Ideas
            </span>
          </div>

          <div className="footer-headline-wrap">
            <a
              href="mailto:plus9ineent@gmail.com"
              className="footer-signature-headline"
              aria-label="Make Something With Us - Email PlusNine"
            >
              <span className="footer-headline-sans">MAKE SOMETHING</span>
              <span className="footer-headline-serif">WITH US.</span>
            </a>
          </div>

          <div className="footer-contact-actions">
            <a
              href="mailto:plus9ineent@gmail.com"
              className="footer-action-email-btn"
            >
              <Mail size={16} />
              <span>plus9ineent@gmail.com</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Minimal Footer Metadata Grid */}
        <div className="footer-minimal-grid">
          {/* Col 1: Brand Emblem & Tagline */}
          <div className="footer-min-col footer-min-col--brand">
            <a
              href="#/"
              onClick={(e) => handleLinkClick('home', e)}
              className="footer-brand-logo-link"
              aria-label="PlusNine Home"
            >
              <img
                src="/logo/logo_oliseh.png"
                alt="PlusNine Logo"
                className="footer-brand-logo-img"
              />
            </a>
            <p className="footer-brand-tagline">
              PlusNine is a Black-led creative development house, film production studio, and cultural magazine based in Edmonton, Alberta and operating globally.
            </p>
          </div>

          {/* Col 2: Navigation Index */}
          <div className="footer-min-col">
            <div className="footer-min-heading">INDEX</div>
            <ul className="footer-min-nav">
              <li>
                <a href="#/work" onClick={(e) => handleLinkClick('work', e)}>Work</a>
              </li>
              <li>
                <a href="#/events" onClick={(e) => handleLinkClick('events', e)}>Events</a>
              </li>
              <li>
                <a href="#/people" onClick={(e) => handleLinkClick('people', e)}>People</a>
              </li>
              <li>
                <a href="#/about" onClick={(e) => handleLinkClick('about', e)}>About</a>
              </li>
              <li>
                <a
                  href="#/film-fest"
                  onClick={(e) => handleLinkClick('film-fest', e)}
                  style={{ color: 'var(--color-orange)' }}
                >
                  Film Fest &rsquo;26 &bull;
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Channels & Collaborations */}
          <div className="footer-min-col">
            <div className="footer-min-heading">CHANNELS</div>
            <ul className="footer-min-nav">
              <li>
                <a
                  href="https://www.instagram.com/plusnine.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>Instagram @plusnine.ca</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/plusnine.mag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>Magazine @plusnine.mag</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://vernacularmag.ca/as-we-are"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>Vernacular: As We Are</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Clock & Location */}
          <div className="footer-min-col">
            <div className="footer-min-heading">EDMONTON HQ</div>
            <div className="footer-clock-box">
              <div className="footer-clock-label">Local Time (MST):</div>
              <div className="footer-clock-val">{edmontonTime || '4:30:00 PM'}</div>
              <div className="footer-location-sub">Edmonton, Alberta, Canada</div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="footer-copyright-bar">
          <div className="footer-copy-text">
            PlusNine &copy; {new Date().getFullYear()} &middot; All Rights Reserved
          </div>
          <div className="footer-copy-text">
            Independent Moving Image Culture &middot; Edmonton / Worldwide
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Colophon;
