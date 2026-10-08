import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project, PROJECTS_DATA, PageType } from '../../data/projects';

interface WorkPageProps {
  onSelectProject: (project: Project) => void;
  onNavigate?: (page: PageType) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'FILM', 'EDITORIAL', 'RECAP'];

  const filteredProjects = filter === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category.toUpperCase() === filter);

  return (
    <div className="page-view page-view--work">
      {/* Page Header (Warm Paper) */}
      <section className="page-header-section page-header-section--paper">
        <div className="container">
          <div className="page-breadcrumbs">
            <span className="page-crumb-tag">ARCHIVE 2024–2026</span>
          </div>

          <div className="page-title-block">
            <h1 className="page-hero-title">
              <span className="page-title-sans">SELECTED</span>{' '}
              <span className="page-title-serif">work.</span>
            </h1>
            <p className="page-hero-subtitle">
              An asymmetrical index of moving image productions, directorial treatments, published editorial issues, and cultural documentations.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="archive-filter-row">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`archive-filter-pill ${filter === cat ? 'is-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Asymmetrical Project Archive (Alternating scales, numbered entries, thin rules) */}
      <section className="page-archive-section">
        <div className="container">
          <div className="asymmetric-archive-list">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              const isLead = idx === 0;

              return (
                <article
                  key={project.id}
                  className={`asymmetric-archive-item ${isLead ? 'is-lead-item' : ''} ${
                    isEven ? 'layout-left' : 'layout-right'
                  }`}
                  onClick={() => onSelectProject(project)}
                >
                  <div className="archive-item-rule" />

                  <div className="archive-item-grid">
                    {/* Media Column */}
                    <div className="archive-item-media-wrap">
                      <div className="archive-item-img-box">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="archive-item-img"
                          loading="lazy"
                        />
                        <div className="archive-item-badge">{project.category}</div>
                      </div>
                    </div>

                    {/* Metadata & Narrative Column */}
                    <div className="archive-item-content">
                      <div className="archive-item-index-row">
                        <span className="archive-item-client">{project.client}</span>
                        <span className="archive-item-year">&middot; {project.year}</span>
                      </div>

                      <h2 className="archive-item-title">{project.title}</h2>

                      <p className="archive-item-desc">{project.description}</p>

                      {project.tags && project.tags.length > 0 ? (
                        <div className="archive-item-specs">
                          {project.tags.map((tag, tIdx) => (
                            <div key={tIdx} className="archive-spec-chip">
                              <span className="archive-spec-v">{tag}</span>
                            </div>
                          ))}
                        </div>
                      ) : project.credits && project.credits.length > 0 ? (
                        <div className="archive-item-specs">
                          {project.credits.slice(0, 3).map((c, cIdx) => (
                            <div key={cIdx} className="archive-spec-chip">
                              <span className="archive-spec-k">{c.label}:</span>
                              <span className="archive-spec-v">{c.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      <div className="archive-item-action">
                        <span className="archive-item-view-btn">
                          <span>{project.ctaLabel || 'View Case Study / Stills'}</span>
                          <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkPage;
