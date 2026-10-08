import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageType } from '../../data/projects';

interface RecentlySectionProps {
  onNavigate?: (page: PageType) => void;
}

export const RecentlySection: React.FC<RecentlySectionProps> = ({ onNavigate }) => {
  const handleEnterStory = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('as-we-are');
    } else {
      window.location.hash = '/as-we-are';
    }
  };

  return (
    <section id="recently" className="editorial-section editorial-section--paper">
      <div className="container">
        {/* Top Editorial Index Label */}
        <div className="editorial-label-row">
          <span className="editorial-label-meta">RECENTLY AT +9</span>
        </div>

        {/* Signature Dual Typography Headline */}
        <div className="editorial-lead-title">
          <h2 className="headline-signature">
            <span className="headline-sans">NOT A FEED.</span>
            <span className="headline-serif-italic">A POINT OF VIEW.</span>
          </h2>
        </div>

        {/* 2-Column Magazine Feature Spread */}
        <div className="magazine-spread">
          {/* Left: Large Editorial Image */}
          <div className="magazine-spread__media" onClick={handleEnterStory}>
            <div className="magazine-spread__image-wrap">
              <img
                src="/images/projects/as_we_are.jpg"
                alt="Vernacular: As We Are Editorial"
                className="magazine-spread__image"
                loading="lazy"
              />
              <div className="magazine-spread__badge">PRINT &amp; DIGITAL ISSUE</div>
            </div>
          </div>

          {/* Right: Story Details & Context */}
          <div className="magazine-spread__content">
            <div className="magazine-spread__meta">
              <span>EDITORIAL &middot; PUBLICATION</span>
              <span className="magazine-spread__dot">&middot;</span>
              <span>2025 / 2026</span>
            </div>

            <h3 className="magazine-spread__title" onClick={handleEnterStory}>
              AS WE ARE
            </h3>

            <p className="magazine-spread__desc">
              A collaborative issue published with Vernacular Magazine reflecting on the beauty, strength, and quiet rhythms found in ordinary moments of Black life across Canada and beyond, exploring the cadence between subjects and their environment.
            </p>

            <div className="magazine-spread__specs">
              <div className="magazine-spec-item">
                <span className="magazine-spec-label">Curation</span>
                <span className="magazine-spec-val">Vernacular &times; PlusNine Studio</span>
              </div>
            </div>

            <div className="magazine-spread__action-row">
              <a
                href="#/as-we-are"
                onClick={handleEnterStory}
                className="magazine-spread__enter-link"
              >
                <span>Enter the story</span>
                <ArrowRight size={16} className="magazine-spread__arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlySection;
