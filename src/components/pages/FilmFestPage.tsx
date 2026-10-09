import React from 'react';
import { ArrowDown, ArrowUpRight, Calendar, Film, MapPin, Ticket } from 'lucide-react';
import { PageType } from '../../data/projects';
import { FestivalRoadmap } from '../filmfest/FestivalRoadmap';
import { useEventbriteModal, initEventbriteModalTrigger, isEventbriteInitialized } from '../../utils/eventbrite';

interface FilmFestPageProps {
  onNavigate: (page: PageType) => void;
  onOpenShowreel?: (timestamp?: number) => void;
}

export const FilmFestPage: React.FC<FilmFestPageProps> = ({ onNavigate: _onNavigate }) => {
  // Hook to connect the Reserve Free Pass button to Eventbrite modal checkout
  useEventbriteModal('filmfest-eb-trigger-pass');

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
            <div className="fest-editorial-card">
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
            <div className="fest-editorial-card">
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

          {/* Centered VIEW ROADMAP action */}
          <div className="fest-editorial-roadmap-cue">
            <button
              type="button"
              onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
              className="fest-editorial-roadmap-btn"
            >
              <span>View Roadmap</span>
              <ArrowDown size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Programme Schedule Roadmap (Warm Paper) */}
      <section id="roadmap" className="fest-programme-section">
        <div className="container">
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

          <FestivalRoadmap />
        </div>
      </section>
    </div>
  );
};

export default FilmFestPage;
