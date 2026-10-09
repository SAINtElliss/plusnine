import React, { useState, useEffect, useCallback } from 'react';
import { ArrowDown, ArrowUpRight, Calendar, Film, Lock, MapPin, Ticket } from 'lucide-react';
import { PageType } from '../../data/projects';
import { FestivalRoadmap, RoadmapItem } from '../filmfest/FestivalRoadmap';
import { FestivalCountdown } from '../filmfest/FestivalCountdown';
import { RoadmapComingSoon } from '../filmfest/RoadmapComingSoon';
import { AdminPreviewModal } from '../filmfest/AdminPreviewModal';
import { useEventbriteModal, initEventbriteModalTrigger, isEventbriteInitialized } from '../../utils/eventbrite';

const ADMIN_STORAGE_KEY = 'plusnine_roadmap_admin_key';
const DEFAULT_RELEASE_ISO = '2026-11-10T09:00:00-07:00';

interface FilmFestPageProps {
  onNavigate: (page: PageType) => void;
  onOpenShowreel?: (timestamp?: number) => void;
}

export const FilmFestPage: React.FC<FilmFestPageProps> = ({ onNavigate: _onNavigate }) => {
  // Hook to connect the Reserve Free Pass button to Eventbrite modal checkout
  useEventbriteModal('filmfest-eb-trigger-pass');

  // Track visibility of the #roadmap section to auto-hide the floating button
  const [isRoadmapVisible, setIsRoadmapVisible] = useState(false);

  // Roadmap scheduled release state
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [isReleased, setIsReleased] = useState(false);
  const [isAdminPreview, setIsAdminPreview] = useState(false);
  const [releaseDateIso, setReleaseDateIso] = useState(DEFAULT_RELEASE_ISO);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Extract admin passkey from URL params or sessionStorage
  const getInitialAdminKey = useCallback((): string | null => {
    try {
      // 1. Check window.location.search (?admin=... or ?key=...)
      const urlParams = new URLSearchParams(window.location.search);
      const searchKey = urlParams.get('admin') || urlParams.get('key');
      if (searchKey) return searchKey;

      // 2. Check hash query (#/film-fest?admin=... or #/film-fest?key=...)
      const hash = window.location.hash;
      const qIdx = hash.indexOf('?');
      if (qIdx !== -1) {
        const hashParams = new URLSearchParams(hash.substring(qIdx));
        const hashKey = hashParams.get('admin') || hashParams.get('key');
        if (hashKey) return hashKey;
      }

      // 3. Check sessionStorage
      return sessionStorage.getItem(ADMIN_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  }, []);

  const fetchRoadmap = useCallback(async (keyOverride?: string | null) => {
    const keyToUse = keyOverride !== undefined ? keyOverride : getInitialAdminKey();
    const headers: Record<string, string> = {};
    let queryParam = '';

    if (keyToUse) {
      headers['x-admin-key'] = keyToUse;
      headers['authorization'] = `Bearer ${keyToUse}`;
      queryParam = `?key=${encodeURIComponent(keyToUse)}`;
    }

    try {
      const res = await fetch(`/api/roadmap${queryParam}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setIsReleased(Boolean(data.released));
        setIsAdminPreview(Boolean(data.isAdminPreview));
        if (data.releaseDate) setReleaseDateIso(data.releaseDate);
        if (Array.isArray(data.items)) {
          setRoadmapItems(data.items);
        }

        // Persist verified admin key to session
        if (data.isAdminPreview && keyToUse) {
          try {
            sessionStorage.setItem(ADMIN_STORAGE_KEY, keyToUse);
          } catch {}
        }
      }
    } catch (err) {
      console.warn('Failed to fetch roadmap status:', err);
    }
  }, [getInitialAdminKey]);

  useEffect(() => {
    fetchRoadmap();
  }, [fetchRoadmap]);

  // Scheduled timer: periodically check and auto-reveal exactly when release time arrives
  useEffect(() => {
    if (isReleased) return;

    const checkInterval = setInterval(() => {
      const releaseMs = new Date(releaseDateIso).getTime();
      if (Date.now() >= releaseMs) {
        fetchRoadmap();
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(checkInterval);
  }, [isReleased, releaseDateIso, fetchRoadmap]);

  const handleExitAdminPreview = () => {
    try {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
      if (window.location.hash.includes('?')) {
        window.location.hash = window.location.hash.split('?')[0];
      }
    } catch {}
    setIsAdminPreview(false);
    setRoadmapItems([]);
    fetchRoadmap(null);
  };

  const handleAdminSuccess = (items: RoadmapItem[], key: string) => {
    try {
      sessionStorage.setItem(ADMIN_STORAGE_KEY, key);
    } catch {}
    setIsAdminPreview(true);
    setRoadmapItems(items);
  };

  // IntersectionObserver to auto-hide the floating VIEW ROADMAP button when #roadmap is visible
  useEffect(() => {
    const roadmapEl = document.getElementById('roadmap');
    if (!roadmapEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsRoadmapVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(roadmapEl);
    return () => observer.disconnect();
  }, [isReleased, isAdminPreview]);

  return (
    <div className="page-view page-view--filmfest">
      {/* 4K Film Festival Hero: Full-Width Cinematic Banner */}
      <section className="fest-hero-section">
        <div className="fest-hero-bg-media">
          <picture className="fest-hero-picture">
            <source srcSet="/images/events/4k_film_festival_hero.webp" type="image/webp" />
            <img
              src="/images/events/4k_film_festival_hero.png"
              alt="4K Film Festival — A Celebration of African & Diaspora Storytelling Through Film"
              className="fest-hero-bg-img"
            />
          </picture>
          <div className="hero-film-noise" aria-hidden="true" />
        </div>
      </section>

      {/* Venue & Admission Details: Warm Paper Editorial Section */}
      <section className="fest-editorial-details-section" aria-label="Venue and Admission Details">
        <div className="container">
          <div className="fest-editorial-details-grid">
            
            {/* GROUP 1: DATE & VENUE */}
            <div className="fest-editorial-card fest-editorial-card--venue">
              <div className="fest-editorial-card-graphic">
                <img
                  src="/images/events/roxy_venue_graphic.png"
                  alt="The Roxy Theatre — 10708 124 St, Edmonton AB"
                  className="fest-editorial-roxy-img"
                />
              </div>
              <div className="fest-editorial-card-content">
                <p className="fest-editorial-card-desc">
                  Join us on November 12, 2026 at Edmonton’s historic Roxy Theatre for an evening of independent cinema, vibrant discussions, and community connection.
                </p>
                <div className="fest-editorial-card-actions">
                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=4K+Film+Festival+%E2%80%94+PlusNine&dates=20261113T003000Z/20261113T053000Z&details=A+celebration+of+African+and+Diaspora+storytelling+through+film+by+PlusNine.+Complimentary+entry.&location=The+Roxy+Theatre,+10708+124+St,+Edmonton,+AB+T5M+0H1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fest-editorial-btn fest-editorial-btn--outline"
                  >
                    <Calendar size={13} />
                    <span>Add to Calendar</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=10708+124+ST+Edmonton+AB+T5M+0H1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fest-editorial-btn fest-editorial-btn--outline"
                  >
                    <MapPin size={13} />
                    <span>View on Map</span>
                  </a>
                </div>
              </div>
            </div>

            {/* GROUP 2: FREE ADMISSION */}
            <div className="fest-editorial-card fest-editorial-card--admission">
              <div className="fest-editorial-card-graphic">
                <img
                  src="/images/events/free_ticket_graphic.png"
                  alt="Free Admission Ticket"
                  className="fest-editorial-ticket-img"
                />
              </div>
              <div className="fest-editorial-card-content">
                <p className="fest-editorial-card-desc">
                  Admission is entirely free for all attendees. Reserve your complimentary pass ahead of time, and enjoy a few complimentary treats on us during the festival.
                </p>
                <div className="fest-editorial-card-actions">
                  <button
                    id="filmfest-eb-trigger-pass"
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (!isEventbriteInitialized('filmfest-eb-trigger-pass')) {
                        await initEventbriteModalTrigger('filmfest-eb-trigger-pass');
                        document.getElementById('filmfest-eb-trigger-pass')?.click();
                      }
                    }}
                    className="fest-editorial-btn fest-editorial-btn--primary"
                  >
                    <Ticket size={14} />
                    <span>Reserve Free Pass</span>
                  </button>
                  <a
                    href="/film-submission"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fest-editorial-btn fest-editorial-btn--outline"
                  >
                    <Film size={13} />
                    <span>Submit Your Film</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Festival Live Countdown */}
          <FestivalCountdown />
        </div>
      </section>

      {/* Programme Schedule Roadmap / Coming Soon Section (Warm Paper) */}
      <section id="roadmap" className="fest-programme-section">
        <div className="container">
          {/* Admin Preview Mode Ambient Alert Banner */}
          {isAdminPreview && (
            <div className="admin-preview-banner" role="status" aria-live="polite">
              <div className="admin-preview-banner__left">
                <span className="admin-preview-badge">
                  <Lock size={11} aria-hidden="true" />
                  <span>Curator Preview</span>
                </span>
                <span className="admin-preview-text">
                  Complete unreleased festival roadmap visible to you in private preview mode.
                </span>
              </div>
              <button
                type="button"
                onClick={handleExitAdminPreview}
                className="admin-preview-exit-btn"
              >
                Exit Preview
              </button>
            </div>
          )}

          {isReleased || isAdminPreview ? (
            <>
              <div className="fest-programme-header">
                <div className="editorial-label-row">
                  <span className="editorial-label-meta">FESTIVAL SCHEDULE · THE ROXY THEATRE</span>
                </div>
                <div className="fest-programme-title-group">
                  <h2 className="fest-programme-heading">
                    FESTIVAL <span className="fest-programme-heading-italic">Roadmap</span>
                  </h2>
                  <p className="fest-programme-desc">
                    Sequential timetable from guest arrival through feature screenings, audience games, voting, and closing awards.
                  </p>
                </div>
              </div>

              <FestivalRoadmap items={roadmapItems} />
            </>
          ) : (
            <RoadmapComingSoon
              releaseDateIso={releaseDateIso}
              onOpenAdminAuth={() => setIsAdminModalOpen(true)}
            />
          )}
        </div>
      </section>

      {/* Curator Passkey Modal */}
      <AdminPreviewModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminSuccess}
      />

      {/* Floating Centered VIEW ROADMAP Action Button */}
      <button
        type="button"
        onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
        className={`fest-floating-roadmap-btn ${isRoadmapVisible ? 'fest-floating-roadmap--hidden' : ''}`}
        aria-label="Scroll to Festival Roadmap"
      >
        <span className="fest-floating-roadmap-btn__text">View Roadmap</span>
        <ArrowDown size={14} className="fest-floating-roadmap-btn__icon" />
      </button>
    </div>
  );
};

export default FilmFestPage;
