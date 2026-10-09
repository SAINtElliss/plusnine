import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Film, Mail, Instagram, Linkedin, Globe } from 'lucide-react';
import { PageType } from '../../data/projects';
import { PLUSNINE_MEMBERS, Member } from '../../data/members';

const TikTokIcon: React.FC<{ size?: number; strokeWidth?: number; className?: string }> = ({
  size = 18,
  strokeWidth = 1.8,
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.002 6.002 0 0 0 4.917 4.917z" />
  </svg>
);

const getMemberSocialItems = (member: Member) => {
  // Ordered platforms: Instagram → TikTok → LinkedIn → Personal Website
  const ALL_PLATFORMS = [
    {
      id: 'instagram' as const,
      name: 'Instagram',
      icon: <Instagram size={18} strokeWidth={1.8} aria-hidden="true" />
    },
    {
      id: 'tiktok' as const,
      name: 'TikTok',
      icon: <TikTokIcon size={18} strokeWidth={1.8} />
    },
    {
      id: 'linkedin' as const,
      name: 'LinkedIn',
      icon: <Linkedin size={18} strokeWidth={1.8} aria-hidden="true" />
    },
    {
      id: 'website' as const,
      name: 'Personal Website',
      icon: <Globe size={18} strokeWidth={1.8} aria-hidden="true" />
    }
  ];

  if (member.socials !== undefined) {
    return ALL_PLATFORMS
      .filter((p) => member.socials![p.id] !== undefined && member.socials![p.id] !== null)
      .map((p) => {
        const val = member.socials![p.id];
        const isUrl = typeof val === 'string' && (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/'));
        return {
          ...p,
          url: isUrl ? val : undefined,
          isPlaceholder: !isUrl
        };
      });
  }

  // Default: All 4 platforms as placeholders (placeholder icons do not navigate)
  return ALL_PLATFORMS.map((p) => ({
    ...p,
    url: undefined,
    isPlaceholder: true
  }));
};

interface PeoplePageProps {
  onNavigate: (page: PageType) => void;
}

export const PeoplePage: React.FC<PeoplePageProps> = ({ onNavigate: _onNavigate }) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Synchronize deep-linking with clean URL pathnames (e.g., /people/oliseh)
  useEffect(() => {
    const handleLocationSync = () => {
      // 1. Check clean pathname (/people/:id)
      const pathname = window.location.pathname.toLowerCase();
      if (pathname.startsWith('/people/')) {
        const id = pathname.replace(/^\/people\//, '').split('/')[0].split('?')[0].trim();
        const found = PLUSNINE_MEMBERS.find((m) => m.id === id);
        if (found) {
          setSelectedMember(found);
          return;
        }
      } else if (pathname === '/people') {
        setSelectedMember(null);
        return;
      }

      // 2. Backwards-compatible legacy hash auto-migration (#/people/:id)
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#/people/') || hash.startsWith('#people/')) {
        const id = hash.replace(/^#\/?people\//, '').split('?')[0].trim();
        const found = PLUSNINE_MEMBERS.find((m) => m.id === id);
        if (found) {
          setSelectedMember(found);
          window.history.replaceState(null, '', `/people/${id}`);
          return;
        }
      }
      if (hash === '#/people' || hash === '#people') {
        setSelectedMember(null);
        window.history.replaceState(null, '', '/people');
      }
    };

    handleLocationSync();
    window.addEventListener('popstate', handleLocationSync);
    return () => window.removeEventListener('popstate', handleLocationSync);
  }, []);

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    window.history.pushState(null, '', `/people/${member.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-view page-view--people">
      {/* Page Header (Warm Paper) */}
      <section className="page-header-section page-header-section--paper">
        <div className="container">

          <div className="page-title-block">
            <h1 className="page-hero-title">
              <span className="page-title-sans">PEOPLE &amp;</span>{' '}
              <span className="page-title-serif">collaborators.</span>
            </h1>
            <p className="page-hero-subtitle">
              The people behind PlusNine and the collaborators we create with.
            </p>
          </div>
        </div>
      </section>

      {/* Main View: Dedicated Member Profile OR Circular Directory */}
      {selectedMember ? (
        <section className="people-profile-section">
          <div className="container">
            <div className="people-profile-card">
              {/* Media Column: Neutral Placeholder Circle */}
              <div className="people-profile-media-col">
                <div className="people-profile-circle-wrap">
                  {selectedMember.image ? (
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="people-profile-avatar"
                    />
                  ) : (
                    <div
                      className="people-profile-placeholder"
                      aria-label={`${selectedMember.name} profile image placeholder`}
                    />
                  )}
                </div>
              </div>

              {/* Details Column */}
              <div className="people-profile-details">
                <div className="people-profile-meta">
                  <span className="people-profile-crumb">PLUSNINE · COLLECTIVE</span>
                  <span className="people-profile-dot">&middot;</span>
                  <span className="people-profile-role">{selectedMember.role}</span>
                  {selectedMember.secondaryIdentity && (
                    <>
                      <span className="people-profile-dot">&middot;</span>
                      <span className="people-profile-secondary-crumb">{selectedMember.secondaryIdentity}</span>
                    </>
                  )}
                </div>

                <h2 className="people-profile-name">
                  <span className="people-name-sans">{selectedMember.name}</span>
                </h2>

                {/* Creative Disciplines */}
                {selectedMember.disciplines && selectedMember.disciplines.length > 0 && (
                  <div className="people-profile-field-block">
                    <span className="people-profile-field-label">Creative Disciplines</span>
                    <div className="people-profile-disciplines-row">
                      {selectedMember.disciplines.map((discipline, dIdx) => (
                        <span key={dIdx} className="people-discipline-pill">
                          {discipline}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Creative Identity outside PlusNine */}
                {selectedMember.creativeIdentity && (
                  <div className="people-profile-field-block">
                    <span className="people-profile-field-label">
                      Creative Identity &amp; Practice
                    </span>
                    <p className="people-profile-body-text">
                      {selectedMember.creativeIdentity}
                    </p>
                  </div>
                )}

                {/* Independent Ventures / Brands */}
                {selectedMember.ventures && selectedMember.ventures.length > 0 && (
                  <div className="people-profile-field-block">
                    <span className="people-profile-field-label">
                      Personal Ventures &amp; Brands
                    </span>
                    <div className="people-ventures-grid">
                      {selectedMember.ventures.map((venture, vIdx) => (
                        <div key={vIdx} className="people-venture-card">
                          <div className="people-venture-header">
                            <span className="people-venture-name">{venture.name}</span>
                            <span className="people-venture-type">{venture.type}</span>
                          </div>
                          {venture.description && (
                            <p className="people-venture-desc">{venture.description}</p>
                          )}
                          {venture.link && (
                            <a
                              href={venture.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="people-venture-link"
                            >
                              <span>Explore Venture</span>
                              <ArrowUpRight size={13} />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Biography (Only displayed if real content exists) */}
                {selectedMember.bio && (
                  <div className="people-profile-field-block">
                    <span className="people-profile-field-label">Biography</span>
                    <p className="people-profile-body-text">{selectedMember.bio}</p>
                  </div>
                )}

                {/* Selected Work (Only displayed if real content exists) */}
                {selectedMember.projects && selectedMember.projects.length > 0 && (
                  <div className="people-profile-field-block">
                    <span className="people-profile-field-label">Selected Work</span>
                    <div className="people-projects-list">
                      {selectedMember.projects.map((proj, pIdx) => (
                        <div key={pIdx} className="people-project-item">
                          <div className="people-project-title">{proj.title}</div>
                          {proj.description && (
                            <p className="people-project-desc">{proj.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Music Releases (Only displayed if real content exists) */}
                {selectedMember.musicReleases && selectedMember.musicReleases.length > 0 && (
                  <div className="people-profile-field-block">
                    <span className="people-profile-field-label">Music &amp; Releases</span>
                    <div className="people-music-list">
                      {selectedMember.musicReleases.map((release, mIdx) => (
                        <div key={mIdx} className="people-music-item">
                          <span className="people-music-title">{release.title}</span>
                          {release.type && (
                            <span className="people-music-type">{release.type}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Links (Only displayed if real content exists) */}
                {selectedMember.externalLinks && selectedMember.externalLinks.length > 0 && (
                  <div className="people-profile-field-block">
                    <span className="people-profile-field-label">Platforms &amp; Links</span>
                    <div className="people-links-row">
                      {selectedMember.externalLinks.map((extLink, lIdx) => (
                        <a
                          key={lIdx}
                          href={extLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="people-ext-link"
                        >
                          <span>{extLink.label}</span>
                          <ArrowUpRight size={13} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links Section (Instagram → TikTok → LinkedIn → Personal Website) */}
                {(() => {
                  const socialItems = getMemberSocialItems(selectedMember);
                  if (socialItems.length === 0) return null;
                  return (
                    <div className="people-profile-field-block people-profile-socials-block">
                      <span className="people-profile-field-label">Social Links</span>
                      <div className="people-profile-socials-row" role="list" aria-label={`${selectedMember.name} social links`}>
                        {socialItems.map((item) =>
                          item.isPlaceholder ? (
                            <button
                              key={item.id}
                              type="button"
                              className="people-social-btn people-social-btn--placeholder"
                              aria-label={item.name}
                              onClick={(e) => e.preventDefault()}
                            >
                              {item.icon}
                              <span className="people-social-tooltip">{item.name}</span>
                            </button>
                          ) : (
                            <a
                              key={item.id}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="people-social-btn"
                              aria-label={item.name}
                            >
                              {item.icon}
                              <span className="people-social-tooltip">{item.name}</span>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  );
                })()}

              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="people-directory-section">
          <div className="container">
            {/* Apple Music-inspired Circular Directory (Circular Image → Name → Role) */}
            <div className="people-circle-grid">
              {PLUSNINE_MEMBERS.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => handleSelectMember(member)}
                  className="people-circle-item"
                  aria-label={`View profile for ${member.name}, ${member.role}`}
                >
                  {/* Empty Neutral Circular Placeholder */}
                  <div className="people-circle-avatar-wrap people-circle-placeholder">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="people-circle-avatar"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="people-circle-empty-disc"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Three-Level Text Hierarchy: Name -> PlusNine Role -> Other Creative Identities */}
                  <div className="people-circle-info">
                    <div className="people-circle-name">{member.name}</div>
                    <div className="people-circle-role">{member.role}</div>
                    {member.secondaryIdentity && (
                      <div className="people-circle-secondary">{member.secondaryIdentity}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Roster Collaboration Invitation Strip */}
            <div className="people-join-strip">
              <div className="people-join-text">
                <div className="people-join-tag">OPEN CALL &middot; 2026 ROSTER</div>
                <h3 className="people-join-title">
                  Directing, Writing, or Producing a Film?
                </h3>
                <p className="people-join-sub">
                  PlusNine collaborates with independent directors, photographers, musicians, and writers on co-productions, treatments, and distribution.
                </p>
              </div>
              <div className="people-join-actions">
                <a
                  href="/film-submission"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="people-join-btn"
                >
                  <Film size={16} />
                  <span>Submit Film</span>
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="mailto:plus9ineent@gmail.com"
                  className="people-join-btn people-join-btn--secondary"
                >
                  <Mail size={16} />
                  <span>Submit Treatment</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PeoplePage;
