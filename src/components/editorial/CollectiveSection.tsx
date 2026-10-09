import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project, PROJECTS_DATA, PageType } from '../../data/projects';

interface CollectiveSectionProps {
  onSelectProject?: (project: Project) => void;
  onNavigate?: (page: PageType) => void;
}

export const CollectiveSection: React.FC<CollectiveSectionProps> = ({
  onSelectProject,
  onNavigate
}) => {
  // Only display the authentic collective releases: AS WE ARE & WE WEREN'T ASLEEP
  const collectiveProjects = PROJECTS_DATA.filter(
    (p) => p.id === 'as-we-are' || p.id === 'we-werent-asleep'
  );

  const handleProjectClick = (p: Project) => {
    if (onSelectProject) {
      onSelectProject(p);
    }
  };

  const handleViewAll = () => {
    if (onNavigate) {
      onNavigate('work');
    } else {
      window.history.pushState(null, '', '/work');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section id="collective" className="editorial-section editorial-section--black">
      <div className="container">
        {/* Section Index & Header */}
        <div className="collective-header">
          <div className="editorial-label-row">
            <span className="editorial-label-meta" style={{ color: 'var(--text-secondary)' }}>
              FROM THE COLLECTIVE
            </span>
          </div>

          <div className="collective-title-row">
            <h2 className="headline-signature headline-signature--light">
              <span className="headline-sans">MEMBER RELEASES &amp;</span>
              <span className="headline-serif-italic">selected work.</span>
            </h2>

            <button
              type="button"
              onClick={handleViewAll}
              className="collective-view-all-btn"
            >
              <span>View Archive</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Clean, Intentional 2-Project Editorial Grid */}
        <div className="collective-asymmetric-layout">
          {collectiveProjects.map((project) => (
            <article
              key={project.id}
              className="collective-card"
              onClick={() => handleProjectClick(project)}
            >
              <div className="collective-card__media-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="collective-card__image"
                  loading="lazy"
                />
                <div className="collective-card__badge">{project.category}</div>
              </div>

              <div className="collective-card__meta-box">
                <div className="collective-card__meta-top">
                  <span className="collective-meta-tag">{project.client}</span>
                  <span className="collective-meta-year">{project.year}</span>
                </div>
                <div className="collective-card__title-row">
                  <h3 className="collective-card__title">{project.title}</h3>
                  <ArrowUpRight size={18} className="collective-card__arrow" />
                </div>
                <p className="collective-card__excerpt">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectiveSection;
