import React, { useState } from 'react';
import { Play, ArrowDown, ArrowUpRight, Ticket } from 'lucide-react';
import { PageType } from '../../data/projects';
import { HeroSlideData, HERO_SLIDES_DATA, HeroSlideAction } from '../../data/heroSlides';
import { useEventbriteModal, initEventbriteModalTrigger, isEventbriteInitialized } from '../../utils/eventbrite';

interface HeroVideoProps {
  slides?: HeroSlideData[];
  onOpenShowreel: (timestamp?: number) => void;
  onNavigate?: (page: PageType) => void;
  isIntroComplete?: boolean;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  slides = HERO_SLIDES_DATA,
  onOpenShowreel,
  onNavigate,
  isIntroComplete: _isIntroComplete = true
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Hook to connect the Reserve Free Passes button to Eventbrite modal checkout
  useEventbriteModal('hero-eb-trigger-passes');

  const currentSlide = slides[activeSlideIndex] || slides[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleActionClick = async (action: HeroSlideAction) => {
    if (action.id === 'passes') {
      // Eventbrite modalTriggerElementId handles opening the checkout popup without navigating away
      if (!isEventbriteInitialized('hero-eb-trigger-passes')) {
        await initEventbriteModalTrigger('hero-eb-trigger-passes');
        document.getElementById('hero-eb-trigger-passes')?.click();
      }
      return;
    }
    if (action.openShowreel) {
      onOpenShowreel(0);
      return;
    }
    if (action.targetPage && onNavigate) {
      onNavigate(action.targetPage);
      return;
    }
    if (action.targetPage) {
      const nextPath = action.targetPage === 'home' ? '/' : `/${action.targetPage}`;
      window.history.pushState(null, '', nextPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }
    if (action.anchorId) {
      scrollToSection(action.anchorId);
      return;
    }
    if (action.externalUrl) {
      window.open(action.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
  };

  const renderActionIcon = (action: HeroSlideAction) => {
    if (action.icon === 'ticket') {
      return (
        <>
          <Ticket size={12} />
          <span>{action.label}</span>
          <ArrowUpRight size={12} />
        </>
      );
    }
    if (action.icon === 'play') {
      return (
        <>
          <Play size={10} fill="currentColor" strokeWidth={0} />
          <span>{action.label}</span>
        </>
      );
    }
    if (action.icon === 'arrow') {
      return (
        <>
          <span>{action.label}</span>
          <ArrowUpRight size={12} />
        </>
      );
    }
    return <span>{action.label}</span>;
  };

  return (
    <section id="hero" className="hero-editorial-section">
      {/* Background Cinematic Media Layer with 16mm Noise */}
      <div className="hero-editorial-video-wrap">
        {currentSlide.media.type === 'video' ? (
          <video
            src={currentSlide.media.src}
            poster={currentSlide.media.poster}
            autoPlay
            loop
            muted
            playsInline
            className="hero-editorial-video"
          />
        ) : (
          <picture className="hero-editorial-picture">
            {currentSlide.media.srcWebp && (
              <source srcSet={currentSlide.media.srcWebp} type="image/webp" />
            )}
            <img
              src={currentSlide.media.src}
              alt={currentSlide.media.alt}
              className="hero-editorial-video"
            />
          </picture>
        )}
        {/* Real photographic noise texture overlay */}
        <div className="hero-film-noise" aria-hidden="true" />
        <div className="hero-editorial-dim" aria-hidden="true" />
      </div>

      {/* Hero Foreground Content */}
      <div className="hero-editorial-container">
        {/* Unified Content Group: Sits in bottom-left */}
        <div className="hero-editorial-content-group">
          {/* 1. Metadata / Category Information Above */}
          <div className="hero-editorial-top-meta">
            {currentSlide.metadata.badge && (
              <span className="hero-meta-badge">{currentSlide.metadata.badge}</span>
            )}
            {currentSlide.metadata.date && (
              <>
                <span className="hero-meta-dot">&middot;</span>
                <span className="hero-meta-info">{currentSlide.metadata.date}</span>
              </>
            )}
            {currentSlide.metadata.location && (
              <>
                <span className="hero-meta-dot">&middot;</span>
                <span className="hero-meta-info">{currentSlide.metadata.location}</span>
              </>
            )}
            {currentSlide.metadata.highlight && (
              <>
                <span className="hero-meta-dot">&middot;</span>
                <span className="hero-meta-info" style={{ color: 'var(--color-orange)', fontWeight: 800 }}>
                  {currentSlide.metadata.highlight}
                </span>
              </>
            )}
          </div>

          {/* Editorial Title Block */}
          <div className="hero-editorial-title-block">
            {currentSlide.metadata.presentsTag && (
              <div className="hero-presents-tag">{currentSlide.metadata.presentsTag}</div>
            )}

            {/* 2. Dedicated Logo / Title Graphic Area */}
            <div className="hero-logo-wrap">
              <img
                src={currentSlide.logo.src}
                alt={currentSlide.logo.alt}
                className="hero-slide-logo"
                style={{
                  maxWidth: currentSlide.logo.maxWidth,
                  maxHeight: currentSlide.logo.maxHeight
                }}
              />
            </div>

            {/* 3. Short Description Below */}
            <p className="hero-editorial-desc">{currentSlide.description}</p>

            {/* 4. Relevant CTA Buttons Below Description */}
            <div className="hero-editorial-actions">
              {currentSlide.actions.map((act) => (
                <button
                  key={act.id}
                  id={act.id === 'passes' ? 'hero-eb-trigger-passes' : undefined}
                  type="button"
                  onClick={() => handleActionClick(act)}
                  className={`hero-action-btn hero-action-btn--${act.variant}`}
                >
                  {renderActionIcon(act)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Pagination Dots (Rendered when multiple slides exist) */}
      {slides.length > 1 && (
        <div className="hero-slide-pagination" aria-label="Hero Slide Navigation">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSlideIndex(idx)}
              className={`hero-slide-dot ${idx === activeSlideIndex ? 'is-active' : ''}`}
              aria-label={`Go to slide ${idx + 1}: ${s.logo.alt}`}
            />
          ))}
        </div>
      )}

      {/* Rotated Vertical Scroll Cue at Desktop Right */}
      <div
        className="hero-scroll-cue-vertical"
        onClick={() => scrollToSection('recently')}
        role="button"
        tabIndex={0}
        aria-label="Scroll to Recently at PlusNine"
      >
        <span className="hero-scroll-cue-text">Recently at +9</span>
        <ArrowDown size={13} className="hero-scroll-cue-arrow" />
      </div>
    </section>
  );
};

export default HeroVideo;
