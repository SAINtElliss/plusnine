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

export interface FestivalRoadmapProps {
  items?: RoadmapItem[];
}

export const FestivalRoadmap: React.FC<FestivalRoadmapProps> = ({
  items = []
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
