import React, { useState } from 'react';
import { Project, PROJECTS_DATA } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'FILM', 'EDITORIAL', 'CAMPAIGN', 'CULTURE'];

  const filteredProjects = filter === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category.toUpperCase() === filter);

  return (
    <section id="works" className="projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-editorial">
          <div>
            <div className="section-tag" style={{ marginBottom: '8px' }}>
              Selected Archive
            </div>
            <h2 className="title-large">
              Featured Productions
            </h2>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`hero-sound-toggle ${filter === cat ? 'is-active' : ''}`}
                style={{
                  background: filter === cat ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
                  color: filter === cat ? '#000000' : 'var(--text-secondary)',
                  fontWeight: 600
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Editorial Layout Rhythms */}
        <div className="editorial-grid">
          <div className="grid-row-split split-50-50">
            {filteredProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
