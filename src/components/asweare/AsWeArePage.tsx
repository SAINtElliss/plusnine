import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowUpRight, X, Maximize, RotateCcw } from 'lucide-react';

interface AsWeArePageProps {
  onBackToHome?: () => void;
}

export const AsWeArePage: React.FC<AsWeArePageProps> = () => {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);

  // Dedicated Video Player Modal state
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isModalPlaying, setIsModalPlaying] = useState(true);
  const [isModalMuted, setIsModalMuted] = useState(false);
  const [modalCurrentTime, setModalCurrentTime] = useState(0);
  const [modalDuration, setModalDuration] = useState(36.11);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Sync hero video mute state and handle media coordination with +9 Radio
  useEffect(() => {
    if (!heroVideoRef.current) return;
    heroVideoRef.current.muted = isHeroMuted;

    if (!isHeroMuted && isHeroPlaying && !isPlayerOpen) {
      window.dispatchEvent(new CustomEvent('pause-music-from-video'));
    } else if (isHeroMuted && !isPlayerOpen) {
      window.dispatchEvent(new CustomEvent('resume-music-from-video'));
    }
  }, [isHeroMuted, isHeroPlaying, isPlayerOpen]);

  // Clean up on unmount: ensure radio resumes if it was interrupted
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('resume-music-from-video'));
    };
  }, []);

  // Modal player keyboard listeners and media coordination
  useEffect(() => {
    if (!isPlayerOpen) return;

    // Pause hero background video and global radio when player modal is open
    if (heroVideoRef.current) {
      heroVideoRef.current.pause();
    }
    window.dispatchEvent(new CustomEvent('pause-music-from-video'));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClosePlayer();
      }
      if (e.key === ' ' && modalVideoRef.current) {
        e.preventDefault();
        toggleModalPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlayerOpen]);

  const handleToggleHeroMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHeroMuted((prev) => !prev);
  };

  const handleOpenPlayer = () => {
    setIsPlayerOpen(true);
    setIsModalPlaying(true);
    setIsModalMuted(false);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    // Resume background header video
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
    // Resume global +9 Radio if it was playing beforehand
    window.dispatchEvent(new CustomEvent('resume-music-from-video'));
  };

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play();
      setIsModalPlaying(true);
    } else {
      modalVideoRef.current.pause();
      setIsModalPlaying(false);
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsModalMuted(modalVideoRef.current.muted);
  };

  const handleModalTimeUpdate = () => {
    if (modalVideoRef.current) {
      setModalCurrentTime(modalVideoRef.current.currentTime);
      if (modalVideoRef.current.duration && !isNaN(modalVideoRef.current.duration)) {
        setModalDuration(modalVideoRef.current.duration);
      }
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || !modalVideoRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    modalVideoRef.current.currentTime = pos * modalDuration;
  };

  const toggleFullscreen = () => {
    if (!modalVideoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      modalVideoRef.current.requestFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="asweare-page">
      {/* Full-Width Cinematic Video Hero Header */}
      <section className="asweare-hero" aria-label="AS WE ARE Hero Video">
        <div className="asweare-hero__video-wrapper">
          <video
            ref={heroVideoRef}
            className="asweare-hero__video"
            src="/videos/asWeAre_final_trailer.mp4"
            poster="/images/projects/as_we_are.jpg"
            autoPlay
            muted
            loop
            playsInline
            onPlay={() => setIsHeroPlaying(true)}
            onPause={() => setIsHeroPlaying(false)}
          />
          <div className="asweare-hero__overlay" aria-hidden="true" />
          <div className="asweare-hero__noise-overlay" aria-hidden="true" />
        </div>

        {/* Hero Overlay Content */}
        <div className="asweare-hero__content">
          <div className="asweare-hero__center-box">
            <span className="asweare-hero__supertitle">PLUSNINE × VERNACULAR</span>
            <h1 className="asweare-hero__title">AS WE ARE</h1>
            <p className="asweare-hero__subtitle">
              Reflecting on the beauty, strength, and quiet rhythms of Black life.
            </p>

            <div className="asweare-hero__actions">
              <a
                href="https://vernacularmag.ca/as-we-are"
                target="_blank"
                rel="noopener noreferrer"
                className="asweare-pill-btn asweare-pill-btn--explore"
              >
                <span>EXPLORE AS WE ARE</span>
                <ArrowUpRight size={13} />
              </a>

              <button
                onClick={handleOpenPlayer}
                className="asweare-pill-btn asweare-pill-btn--watch"
              >
                <span>WATCH VIDEO</span>
                <Play size={11} fill="#ffffff" strokeWidth={0} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Right Mute / Unmute Audio Control */}
        <div className="asweare-hero__bottom-controls">
          <button
            onClick={handleToggleHeroMute}
            className="asweare-ctrl-btn asweare-ctrl-btn--mute"
            aria-label={isHeroMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isHeroMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isHeroMuted ? 'UNMUTE' : 'MUTED'}</span>
          </button>
        </div>
      </section>

      {/* Editorial Content Body (Clean & Typographic - No Body Images) */}
      <section className="asweare-editorial-section" aria-label="Editorial Introduction & Works">
        <div className="asweare-container">
          {/* Introduction Block */}
          <div className="asweare-intro-block">
            <span className="asweare-section-eyebrow">EDITORIAL COLLABORATION</span>
            <h2 className="asweare-intro-heading">AS WE ARE</h2>
            
            <div className="asweare-intro-copy">
              <p>
                AS WE ARE is a collaborative issue by PlusNine &{' '}
                <a
                  href="https://vernacularmag.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asweare-link"
                >
                  Vernacular Magazine
                </a>
                , bringing together stories, images, poetry, and creative works that reflect on the
                ordinary rhythms of Black life — the moments, rituals, relationships, and experiences
                that carry beauty, strength, and meaning.
              </p>
              <p>
                Through a range of creative voices, the issue celebrates Black life not only through
                extraordinary moments, but through the everyday experiences that shape identity,
                memory, and community.
              </p>
            </div>
          </div>

          {/* Featured Works Continuous Editorial Paragraph */}
          <div className="asweare-works-block">
            <span className="asweare-section-eyebrow">CURATED PIECES</span>
            <h3 className="asweare-works-heading">FEATURED WORKS</h3>

            <div className="asweare-works-paragraph-wrap">
              <p className="asweare-works-paragraph">
                The issue includes pieces such as{' '}
                <a
                  href="https://vernacularmag.ca/not-alone-by-josh-omotosho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asweare-work-link"
                >
                  <em>Not Alone</em>
                </a>{' '}
                by Josh Omotosho,{' '}
                <a
                  href="https://vernacularmag.ca/new-page-29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asweare-work-link"
                >
                  <em>The Sun and Moon</em>
                </a>{' '}
                by Giovanni Sorrentino,{' '}
                <a
                  href="https://vernacularmag.ca/faith-ndansi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asweare-work-link"
                >
                  <em>Rituals of a Black Woman's Dawn</em>
                </a>{' '}
                by Faith Ndansi,{' '}
                <a
                  href="https://vernacularmag.ca/raphael-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asweare-work-link"
                >
                  <em>Beloved</em>
                </a>{' '}
                by Raphael Victor Ezeano,{' '}
                <a
                  href="https://vernacularmag.ca/paul-2-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asweare-work-link"
                >
                  <em>Anansi & The Pot of Beans</em>
                </a>{' '}
                by Paul Smith,{' '}
                <a
                  href="https://vernacularmag.ca/yem-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asweare-work-link"
                >
                  <em>she looks like art</em>
                </a>{' '}
                by Yemariam Abebayehu,{' '}
                <a
                  href="https://vernacularmag.ca/kiitan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asweare-work-link"
                >
                  <em>Golden Roots</em>
                </a>{' '}
                by Kiitan Kujembola,{' '}
                <a
                  href="https://vernacularmag.ca/new-page-43"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asweare-work-link"
                >
                  <em>The Hot Comb</em>
                </a>{' '}
                by Pamela Ndumbi,{' '}
                <a
                  href="https://vernacularmag.ca/still-life"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asweare-work-link"
                >
                  <em>Still Life</em>
                </a>{' '}
                by Aisha Ali, and more.
              </p>
            </div>
          </div>

          {/* Primary Explore Call to Action */}
          <div className="asweare-cta-block">
            <a
              href="https://vernacularmag.ca/as-we-are"
              target="_blank"
              rel="noopener noreferrer"
              className="asweare-explore-btn"
            >
              <span>EXPLORE AS WE ARE</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Fullscreen Video Player Modal */}
      {isPlayerOpen && (
        <div className="asweare-modal-overlay" onClick={handleClosePlayer}>
          <div
            className="asweare-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="AS WE ARE Video Player"
          >
            {/* Modal Header */}
            <div className="asweare-modal-header">
              <div className="asweare-modal-title-group">
                <span className="asweare-modal-tag">FILM TRAILER · 4:3 1080P</span>
                <h3 className="asweare-modal-title">PLUSNINE × VERNACULAR: AS WE ARE</h3>
              </div>

              <button
                onClick={handleClosePlayer}
                className="asweare-modal-close-btn"
                aria-label="Close Video Player"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Viewport */}
            <div className="asweare-modal-video-wrap" onClick={toggleModalPlay}>
              <video
                ref={modalVideoRef}
                className="asweare-modal-video"
                src="/videos/asWeAre_final_trailer.mp4"
                poster="/images/projects/as_we_are.jpg"
                autoPlay
                playsInline
                onTimeUpdate={handleModalTimeUpdate}
                onEnded={handleClosePlayer}
              />
            </div>

            {/* Transport & Timeline Scrubber Bar */}
            <div className="asweare-modal-controls">
              {/* Scrub Timeline */}
              <div
                ref={timelineRef}
                onClick={handleTimelineClick}
                className="asweare-modal-timeline"
                role="slider"
                aria-label="Video scrubber"
                aria-valuenow={modalCurrentTime}
                aria-valuemax={modalDuration}
              >
                <div
                  className="asweare-modal-timeline-fill"
                  style={{ width: `${(modalCurrentTime / modalDuration) * 100}%` }}
                />
              </div>

              <div className="asweare-modal-controls-row">
                <div className="asweare-modal-controls-left">
                  <button
                    onClick={toggleModalPlay}
                    className="asweare-modal-ctrl-btn"
                    aria-label={isModalPlaying ? 'Pause' : 'Play'}
                  >
                    {isModalPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>

                  <button
                    onClick={() => {
                      if (modalVideoRef.current) {
                        modalVideoRef.current.currentTime = 0;
                        modalVideoRef.current.play();
                        setIsModalPlaying(true);
                      }
                    }}
                    className="asweare-modal-ctrl-btn"
                    aria-label="Restart Video"
                  >
                    <RotateCcw size={14} />
                  </button>

                  <button
                    onClick={toggleModalMute}
                    className="asweare-modal-ctrl-btn"
                    aria-label={isModalMuted ? 'Unmute' : 'Mute'}
                  >
                    {isModalMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <span className="asweare-modal-timecode">
                    {formatTime(modalCurrentTime)} / {formatTime(modalDuration)}
                  </span>
                </div>

                <div className="asweare-modal-controls-right">
                  <button
                    onClick={toggleFullscreen}
                    className="asweare-modal-ctrl-btn"
                    aria-label="Fullscreen"
                  >
                    <Maximize size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
