import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Film, Mail } from 'lucide-react';
import { PageType } from '../../data/projects';
import { PLUSNINE_MEMBERS, Member } from '../../data/members';

interface PeoplePageProps {
  onNavigate: (page: PageType) => void;
}

export const PeoplePage: React.FC<PeoplePageProps> = ({ onNavigate: _onNavigate }) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Synchronize deep-linking with URL hash (e.g., #/people/oliseh)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#/people/') || hash.startsWith('#people/')) {
        const id = hash.replace(/^#\/?people\//, '').split('?')[0].trim();
        const found = PLUSNINE_MEMBERS.find((m) => m.id === id);
        if (found) {
          setSelectedMember(found);
          return;
        }
      }
      if (hash === '#/people' || hash === '#people') {
        setSelectedMember(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    window.location.hash = `#/people/${member.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDirectory = () => {
    setSelectedMember(null);
    window.location.hash = '#/people';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-view page-view--people">
      {/* Page Header (Warm Paper) */}
      <section className="page-header-section page-header-section--paper">
        <div className="container">
          {selectedMember && (
            <div className="page-breadcrumbs">
              <button
                type="button"
                onClick={handleBackToDirectory}
                className="page-back-btn"
              >
                <ArrowLeft size={14} />
                <span>Back to People Directory</span>
              </button>
            </div>
          )}

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
            <div className="people-profile-nav">
              <button
                type="button"
                onClick={handleBackToDirectory}
                className="page-back-btn"
              >
                <ArrowLeft size={14} />
                <span>Back to People</span>
              </button>
            </div>

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

                {/* Connect / Collaborate CTA */}
                <div className="people-profile-actions">
                  <a
                    href={`mailto:plus9ineent@gmail.com?subject=Collaborate with ${selectedMember.name}`}
                    className="people-join-btn"
                  >
                    <Mail size={15} />
                    <span>Connect with {selectedMember.name}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
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
