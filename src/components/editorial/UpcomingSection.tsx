import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageType } from '../../data/projects';

interface UpcomingSectionProps {
  onNavigate?: (page: PageType) => void;
}

interface EventRow {
  id: string;
  date: string;
  month: string;
  titleSans: string;
  titleSerifItalic: string;
  venue: string;
  city: string;
  status: 'upcoming' | 'recent';
  link: string;
}

const EVENTS_DATA: EventRow[] = [
  {
    id: 'film-fest-2026',
    date: '12',
    month: 'NOV',
    titleSans: '4K FILM',
    titleSerifItalic: 'festival',
    venue: 'The Roxy Theatre',
    city: 'Edmonton, AB',
    status: 'upcoming',
    link: '#/film-fest'
  },
  {
    id: 'as-we-are-launch',
    date: '17',
    month: 'FEB',
    titleSans: 'AS WE ARE',
    titleSerifItalic: 'editorial publication',
    venue: 'Digital Release',
    city: 'Online',
    status: 'recent',
    link: '#/as-we-are'
  }
];

export const UpcomingSection: React.FC<UpcomingSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recent'>('upcoming');

  const filteredEvents = EVENTS_DATA.filter((e) => e.status === activeTab);

  const handleRowClick = (event: EventRow) => {
    if (event.id === 'film-fest-2026') {
      if (onNavigate) onNavigate('film-fest');
      else window.location.hash = '/film-fest';
    } else if (event.id === 'vernacular-launch' || event.id === 'as-we-are-launch') {
      if (onNavigate) onNavigate('as-we-are');
      else window.location.hash = '/as-we-are';
    } else {
      if (onNavigate) onNavigate('events');
      else window.location.hash = '/events';
    }
  };

  return (
    <section id="upcoming" className="editorial-section editorial-section--paper">
      <div className="container">
        {/* Section Header & Tab Controls */}
        <div className="upcoming-header-row">
          <div className="editorial-label-row" style={{ marginBottom: 0 }}>
            <span className="editorial-label-meta">
              {activeTab === 'upcoming' ? 'UPCOMING GATHERINGS' : 'RECENT GATHERINGS'}
            </span>
          </div>

          <div className="upcoming-toggle-group">
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`upcoming-toggle-btn ${activeTab === 'upcoming' ? 'is-active' : ''}`}
            >
              <span>Upcoming</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('recent')}
              className={`upcoming-toggle-btn ${activeTab === 'recent' ? 'is-active' : ''}`}
            >
              <span>Recently</span>
            </button>
          </div>
        </div>

        {/* Full-Width Horizontal Editorial Rows */}
        <div className="upcoming-rows-container">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="upcoming-editorial-row"
              onClick={() => handleRowClick(evt)}
              role="button"
              tabIndex={0}
            >
              {/* Left Column: Oversized Date */}
              <div className="upcoming-row__date-col">
                <span className="upcoming-row__month">{evt.month}</span>
                <span className="upcoming-row__date">{evt.date}</span>
              </div>

              {/* Center Column: Huge Event Headline */}
              <div className="upcoming-row__title-col">
                <h3 className="upcoming-row__title">
                  <span className="upcoming-title-sans">{evt.titleSans}</span>{' '}
                  <span className="upcoming-title-serif">{evt.titleSerifItalic}</span>
                </h3>
              </div>

              {/* Right Column: Venue & City Location */}
              <div className="upcoming-row__location-col">
                <div className="upcoming-row__venue">{evt.venue}</div>
                <div className="upcoming-row__city">{evt.city}</div>
              </div>

              {/* Far Right: Circular Arrow Action Button */}
              <div className="upcoming-row__action-col">
                <div className="upcoming-row__circle-btn" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Full Calendar Link */}
        <div className="upcoming-bottom-bar">
          <div className="upcoming-bottom-note">
            <span>All PlusNine screenings, discussions, and workshops operate with free and sliding-scale community tickets.</span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onNavigate) onNavigate('events');
              else window.location.hash = '/events';
            }}
            className="upcoming-calendar-link"
          >
            <span>View Full Calendar</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;
