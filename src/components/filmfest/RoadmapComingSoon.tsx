import React from 'react';
import { Calendar, Clock, Lock, Sparkles } from 'lucide-react';

interface RoadmapComingSoonProps {
  releaseDateIso: string;
  onOpenAdminAuth: () => void;
}

export const RoadmapComingSoon: React.FC<RoadmapComingSoonProps> = ({
  releaseDateIso,
  onOpenAdminAuth
}) => {
  // Format release date for user display in America/Edmonton
  const formattedRelease = React.useMemo(() => {
    try {
      const d = new Date(releaseDateIso);
      const datePart = d.toLocaleDateString('en-US', {
        timeZone: 'America/Edmonton',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const timePart = d.toLocaleTimeString('en-US', {
        timeZone: 'America/Edmonton',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      });
      return `${datePart} · ${timePart}`;
    } catch {
      return 'Nov 10, 2026 · 9:00 AM MST';
    }
  }, [releaseDateIso]);

  return (
    <div className="roadmap-coming-soon-container" aria-label="Roadmap Coming Soon">
      <div className="roadmap-coming-soon-card">
        {/* Subtle Ambient Pulse Light */}
        <div className="roadmap-coming-soon-glow" aria-hidden="true" />

        {/* Top Editorial Eyebrow */}
        <div className="roadmap-coming-soon-eyebrow">
          <span className="roadmap-coming-soon-dot" aria-hidden="true" />
          <span className="roadmap-coming-soon-tag">PROGRAMME IN CURATION</span>
          <span className="roadmap-coming-soon-sep">&middot;</span>
          <span className="roadmap-coming-soon-loc">THE ROXY THEATRE</span>
        </div>

        {/* Main Editorial Statement */}
        <div className="roadmap-coming-soon-body">
          <h3 className="roadmap-coming-soon-title">
            <span className="roadmap-coming-soon-title-sans">TIMETABLE REVEAL</span>
            <span className="roadmap-coming-soon-title-serif">coming soon.</span>
          </h3>

          <p className="roadmap-coming-soon-desc">
            The complete 4K Film Festival screening schedule, director showcases, audience voting,
            and closing awards are currently being curated. The full minute-by-minute timetable will unlock
            automatically here prior to festival night.
          </p>

          {/* Release Schedule Specs Pill */}
          <div className="roadmap-coming-soon-specs">
            <div className="roadmap-coming-soon-spec-item">
              <Clock size={13} className="roadmap-coming-soon-icon" aria-hidden="true" />
              <span>Public Release: <strong>{formattedRelease}</strong></span>
            </div>
            <div className="roadmap-coming-soon-spec-item">
              <Calendar size={13} className="roadmap-coming-soon-icon" aria-hidden="true" />
              <span>Festival Date: <strong>Nov 12, 2026</strong></span>
            </div>
          </div>

          <div className="roadmap-coming-soon-notice">
            <Sparkles size={13} className="roadmap-coming-soon-sparkle" aria-hidden="true" />
            <span>Pass holders will receive immediate priority notification when the complete lineup unlocks.</span>
          </div>
        </div>

        {/* Discreet Curator / Admin Access Trigger */}
        <div className="roadmap-coming-soon-footer">
          <button
            type="button"
            onClick={onOpenAdminAuth}
            className="roadmap-admin-trigger-btn"
            aria-label="Curator / Administrator preview login"
          >
            <Lock size={11} aria-hidden="true" />
            <span>Curator Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapComingSoon;
