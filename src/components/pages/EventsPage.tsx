import React from 'react';
import { ArrowUpRight, Calendar, MapPin, Ticket } from 'lucide-react';
import { PageType } from '../../data/projects';

interface EventsPageProps {
  onNavigate: (page: PageType) => void;
}

interface PastEvent {
  date: string;
  year: string;
  titleSans: string;
  titleSerifItalic: string;
  type: string;
  venue: string;
  city: string;
  status: string;
  linkPage?: PageType;
}

const PAST_EVENTS: PastEvent[] = [
  {
    date: 'FEBRUARY 17',
    year: '2025',
    titleSans: 'AS WE ARE',
    titleSerifItalic: '',
    type: 'Online Editorial Publication',
    venue: 'Digital Release',
    city: 'Online',
    status: 'Archived',
    linkPage: 'as-we-are'
  }
];

const FEATURED_EVENT = {
  badge: 'FREE ADMISSION · OFFICIAL SELECTION',
  image: '/images/events/4k_film_festival_promo.png',
  date: 'NOV. 12 2026',
  location: 'THE ROXY THEATRE · 10708 124 ST, EDMONTON AB',
  logo: {
    src: '/images/events/4k_film_festival_logo.png',
    alt: '4K Film Festival'
  },
  titleSans: '4K FILM',
  titleSerifItalic: 'festival',
  description:
    'A celebration of African & Diaspora storytelling through film. An evening of cinema, radical visual forms, director masterclasses, and moving image culture convened in Edmonton. Free admission for all attendees.',
  ctaText: 'View Festival Details & RSVP',
  linkPage: 'film-fest' as PageType
};

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  return (
    <div className="page-view page-view--events">
      {/* Page Header (Warm Paper) */}
      <section className="page-header-section page-header-section--paper">
        <div className="container">
          <div className="page-breadcrumbs">
            <span className="page-crumb-tag">EVENTS / PLUSNINE</span>
          </div>

          <div className="page-title-block">
            <h1 className="page-hero-title">
              <span className="page-title-sans">GATHERINGS &amp;</span>{' '}
              <span className="page-title-serif">events.</span>
            </h1>
            <p className="page-hero-subtitle">
              Screenings, parties, pop-ups, showcases, and whatever else we come up with.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Next Event Hero Block (Near-black with signal orange-red accents) */}
      <section className="events-feature-section">
        <div className="container">
          <div className="events-feature-card">
            <div className="events-feature-media">
              <img
                src={FEATURED_EVENT.image}
                alt={`Featured Event: ${FEATURED_EVENT.logo?.alt || FEATURED_EVENT.titleSans}`}
                className="events-feature-img"
              />
              <div className="events-feature-badge">
                <span className="events-badge-dot" />
                <span>{FEATURED_EVENT.badge}</span>
              </div>
            </div>

            <div className="events-feature-content">
              {/* 1. Date & Location */}
              <div className="events-feature-meta">
                <span className="events-meta-item">
                  <Calendar size={13} />
                  <span>{FEATURED_EVENT.date}</span>
                </span>
                <span className="events-meta-item">
                  <MapPin size={13} />
                  <span>{FEATURED_EVENT.location}</span>
                </span>
              </div>

              {/* 2. Festival Logo (or fallback typography) */}
              {FEATURED_EVENT.logo ? (
                <div className="events-feature-logo-wrap">
                  <img
                    src={FEATURED_EVENT.logo.src}
                    alt={FEATURED_EVENT.logo.alt}
                    className="events-feature-logo"
                  />
                </div>
              ) : (
                <h2 className="events-feature-title">
                  <span className="events-title-sans">{FEATURED_EVENT.titleSans}</span>{' '}
                  <span className="events-title-serif">{FEATURED_EVENT.titleSerifItalic}</span>
                </h2>
              )}

              {/* 3. Description */}
              <p className="events-feature-desc">{FEATURED_EVENT.description}</p>

              {/* 4. CTA */}
              <div className="events-feature-actions">
                <button
                  type="button"
                  onClick={() => onNavigate(FEATURED_EVENT.linkPage)}
                  className="events-btn-primary"
                >
                  <Ticket size={16} />
                  <span>{FEATURED_EVENT.ctaText}</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chronological Past Events Record (Warm paper) */}
      <section className="events-record-section">
        <div className="container">
          <div className="editorial-label-row">
            <span className="editorial-label-meta">CHRONOLOGICAL ARCHIVE · 2024–2025</span>
          </div>

          <div className="events-table-wrap">
            <div className="events-table-header">
              <div className="events-col-date">DATE</div>
              <div className="events-col-name">EVENT / GATHERING</div>
              <div className="events-col-type">TYPE</div>
              <div className="events-col-loc">LOCATION</div>
              <div className="events-col-action">STATUS</div>
            </div>

            <div className="events-table-body">
              {PAST_EVENTS.map((evt, idx) => (
                <div
                  key={idx}
                  className={`events-table-row ${evt.linkPage ? 'is-clickable' : ''}`}
                  onClick={() => {
                    if (evt.linkPage) {
                      onNavigate(evt.linkPage);
                    }
                  }}
                  role={evt.linkPage ? 'button' : undefined}
                  tabIndex={evt.linkPage ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (evt.linkPage && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      onNavigate(evt.linkPage);
                    }
                  }}
                >
                  <div className="events-col-date">
                    <span className="events-row-date">{evt.date}</span>
                    <span className="events-row-year">{evt.year}</span>
                  </div>

                  <div className="events-col-name">
                    <div className="events-row-title">
                      <span className="events-row-title-sans">{evt.titleSans}</span>
                      {evt.titleSerifItalic ? (
                        <> <span className="events-row-title-serif">{evt.titleSerifItalic}</span></>
                      ) : null}
                      {evt.linkPage ? (
                        <ArrowUpRight size={14} className="events-row-link-arrow" />
                      ) : null}
                    </div>
                  </div>

                  <div className="events-col-type">
                    <span className="events-row-tag">{evt.type}</span>
                  </div>

                  <div className="events-col-loc">
                    <div className="events-row-venue">{evt.venue}</div>
                    <div className="events-row-city">{evt.city}</div>
                  </div>

                  <div className="events-col-action">
                    <span className="events-status-pill">{evt.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
