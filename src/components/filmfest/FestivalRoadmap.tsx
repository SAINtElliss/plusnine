import React from 'react';
import {
  DoorOpen,
  Film,
  Coffee,
  Sparkles,
  Vote,
  Trophy,
  Flag,
  Clock
} from 'lucide-react';

export type ProgrammeItemType =
  | 'start'
  | 'screening'
  | 'intermission'
  | 'games'
  | 'voting'
  | 'awards'
  | 'finish';

export interface FilmDetails {
  poster: string;
  runtime: string;
  director: string;
  genre: string;
  synopsis: string;
}

export interface RoadmapItem {
  id: string;
  type: ProgrammeItemType;
  badgeLabel?: string;
  time: string;
  title: string;
  subtitle?: string;
  description?: string;
  filmDetails?: FilmDetails;
}

export const DEMO_ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: 'start',
    type: 'start',
    badgeLabel: 'START',
    time: '5:30 PM',
    title: 'Doors Open / Guest Arrival',
    description:
      'Welcome reception, guest check-in, complimentary refreshments, networking, and festival opening introductions celebrating Black and Diaspora cinema.'
  },
  {
    id: 'film-1',
    type: 'screening',
    badgeLabel: 'FILM SCREENING',
    time: '6:00 PM',
    title: 'Demo Film 01',
    subtitle: 'Selected Narrative Feature',
    filmDetails: {
      poster: '/images/projects/as_we_are.jpg',
      runtime: '18 MIN',
      director: 'Curatorial Selection',
      genre: 'Narrative Feature',
      synopsis:
        'An evocative study exploring rhythm, cultural heritage, and diaspora memory through nuanced personal encounters.'
    }
  },
  {
    id: 'film-2',
    type: 'screening',
    badgeLabel: 'FILM SCREENING',
    time: '6:30 PM',
    title: 'Demo Film 02',
    subtitle: 'Movement & Form',
    filmDetails: {
      poster: '/images/projects/just.jpg',
      runtime: '14 MIN',
      director: 'Kofi Mensah',
      genre: 'Visual Poetry',
      synopsis:
        'A kinetic study of physical motion and quiet introspection set against contrasting urban landscapes.'
    }
  },
  {
    id: 'intermission',
    type: 'intermission',
    badgeLabel: 'INTERMISSION',
    time: '7:00 PM',
    title: 'Intermission',
    description:
      'Short pause for refreshments, social conversation, and informal foyer gathering.'
  },
  {
    id: 'games',
    type: 'games',
    badgeLabel: 'GAMES / AUDIENCE ACTIVITY',
    time: '7:15 PM',
    title: 'Games',
    description:
      'Interactive cinema trivia, audience challenges, and quick onstage activities.'
  },
  {
    id: 'film-3',
    type: 'screening',
    badgeLabel: 'FILM SCREENING',
    time: '7:45 PM',
    title: 'Demo Film 03',
    subtitle: 'Nocturnal Frequencies',
    filmDetails: {
      poster: '/images/projects/loca_q.jpg',
      runtime: '22 MIN',
      director: 'Malik Touré',
      genre: 'Documentary · Archival Sound',
      synopsis:
        'An archival exploration of late-night sound cultures, independent gatherings, and sonic traditions spanning decades.'
    }
  },
  {
    id: 'film-4',
    type: 'screening',
    badgeLabel: 'FILM SCREENING',
    time: '8:15 PM',
    title: 'Demo Film 04',
    subtitle: 'Prairie Moving Image',
    filmDetails: {
      poster: '/images/projects/we_werent_asleep.jpg',
      runtime: '16 MIN',
      director: 'PlusNine Collective',
      genre: 'Experimental',
      synopsis:
        'A retrospective compilation documenting collective creation, resilience, and visual alchemy.'
    }
  },
  {
    id: 'voting',
    type: 'voting',
    badgeLabel: 'AUDIENCE VOTING',
    time: '8:45 PM',
    title: 'Voting',
    description:
      'Attendees cast live digital ballots for the 2026 People’s Choice Award and Best Cinematography.'
  },
  {
    id: 'awards',
    type: 'awards',
    badgeLabel: 'PRIZE GIVING / WINNER ANNOUNCEMENT',
    time: '9:15 PM',
    title: 'Prize Giving',
    description:
      'Live onstage award announcements recognizing standout films and emerging filmmaker grants.'
  },
  {
    id: 'finish',
    type: 'finish',
    badgeLabel: 'FINISH',
    time: '9:45 PM – LATE',
    title: 'Closing Celebration & Mixer',
    description:
      'Concluding festival remarks, ambient soundscapes, and closing reception in The Roxy Theatre lounge.'
  }
];

interface FestivalRoadmapProps {
  items?: RoadmapItem[];
}

export const FestivalRoadmap: React.FC<FestivalRoadmapProps> = ({
  items = DEMO_ROADMAP_ITEMS
}) => {
  const renderNodeIcon = (type: ProgrammeItemType) => {
    switch (type) {
      case 'start':
        return <DoorOpen size={16} aria-hidden="true" />;
      case 'screening':
        return <Film size={15} aria-hidden="true" />;
      case 'intermission':
        return <Coffee size={14} aria-hidden="true" />;
      case 'games':
        return <Sparkles size={14} aria-hidden="true" />;
      case 'voting':
        return <Vote size={14} aria-hidden="true" />;
      case 'awards':
        return <Trophy size={14} aria-hidden="true" />;
      case 'finish':
        return <Flag size={15} aria-hidden="true" />;
      default:
        return <Clock size={14} aria-hidden="true" />;
    }
  };

  return (
    <div className="festival-roadmap" aria-label="4K Film Festival Schedule Roadmap">
      <div className="roadmap-spine-track">
        {items.map((item) => {
          const isStart = item.type === 'start';
          const isFinish = item.type === 'finish';
          const isScreening = item.type === 'screening';
          const isCompact = !isScreening && !isStart && !isFinish;

          return (
            <div
              key={item.id}
              className={`roadmap-entry roadmap-entry--${item.type} ${
                isStart ? 'is-start-node' : ''
              } ${isFinish ? 'is-finish-node' : ''} ${
                isScreening ? 'is-screening-node' : ''
              } ${isCompact ? 'is-compact-node' : ''}`}
            >
              {/* Continuous Spine Node */}
              <div className="roadmap-node-col">
                <div
                  className={`roadmap-node ${
                    isStart || isFinish
                      ? 'roadmap-node--filled'
                      : 'roadmap-node--outlined'
                  }`}
                  aria-hidden="true"
                >
                  {renderNodeIcon(item.type)}
                </div>
              </div>

              {/* Programme Details to the Right of Node */}
              <div className="roadmap-content-col">
                {isStart ? (
                  /* START STOP */
                  <div className="roadmap-endpoint-block">
                    <div className="roadmap-endpoint-badge">START</div>
                    <div className="roadmap-endpoint-time">{item.time}</div>
                    <h3 className="roadmap-endpoint-title">{item.title}</h3>
                    {item.description && (
                      <p className="roadmap-endpoint-desc">{item.description}</p>
                    )}
                  </div>
                ) : isFinish ? (
                  /* FINISH STOP */
                  <div className="roadmap-endpoint-block">
                    <div className="roadmap-endpoint-badge roadmap-endpoint-badge--finish">
                      FINISH
                    </div>
                    <div className="roadmap-endpoint-time">{item.time}</div>
                    <h3 className="roadmap-endpoint-title">{item.title}</h3>
                    {item.description && (
                      <p className="roadmap-endpoint-desc">{item.description}</p>
                    )}
                  </div>
                ) : isScreening && item.filmDetails ? (
                  /* FILM SCREENING (Substantially Larger with Poster & Full Details) */
                  <div className="roadmap-screening-block">
                    <div className="roadmap-screening-meta-row">
                      <span className="roadmap-badge-tag">FILM SCREENING</span>
                      <span className="roadmap-time-chip">
                        <Clock size={12} aria-hidden="true" />
                        <span>{item.time}</span>
                      </span>
                    </div>

                    <div className="roadmap-film-container">
                      <div className="roadmap-film-poster-wrap">
                        <img
                          src={item.filmDetails.poster}
                          alt={`${item.title} Poster`}
                          className="roadmap-film-poster"
                          loading="lazy"
                        />
                        <div className="roadmap-film-runtime-pill">
                          {item.filmDetails.runtime}
                        </div>
                      </div>

                      <div className="roadmap-film-details">
                        <h3 className="roadmap-film-title">{item.title}</h3>
                        {item.subtitle && (
                          <div className="roadmap-film-subtitle">{item.subtitle}</div>
                        )}

                        <div className="roadmap-film-specs">
                          <span className="roadmap-film-director">
                            Dir. {item.filmDetails.director}
                          </span>
                          <span className="roadmap-film-specs-dot">&bull;</span>
                          <span className="roadmap-film-genre">
                            {item.filmDetails.genre}
                          </span>
                        </div>

                        <p className="roadmap-film-synopsis">
                          {item.filmDetails.synopsis}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* COMPACT STANDARD STOP (Intermission, Games, Voting, Prize Giving) */
                  <div className="roadmap-compact-block">
                    <div className="roadmap-compact-time-row">
                      {item.badgeLabel && (
                        <span className="roadmap-compact-type-badge">
                          {item.badgeLabel}
                        </span>
                      )}
                      <span className="roadmap-compact-time">{item.time}</span>
                    </div>
                    <h3 className="roadmap-compact-name">{item.title}</h3>
                    {item.description && (
                      <p className="roadmap-compact-desc">{item.description}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FestivalRoadmap;
