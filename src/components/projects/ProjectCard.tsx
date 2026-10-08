import React from 'react';
import { Project } from '../../data/projects';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  aspectOverride?: '4-3' | '16-9' | 'square';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  aspectOverride
}) => {
  const aspectClass = aspectOverride
    ? `aspect-${aspectOverride}`
    : `aspect-${project.aspectRatio}`;

  return (
    <article
      className={`project-card ${aspectClass}`}
      onClick={() => onSelect(project)}
    >
      <div className="project-card__media-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="project-card__image"
          loading="lazy"
        />

        <div className="project-card__badge-category">
          {project.category}
        </div>
      </div>

      <div className="project-card__meta-bar">
        <div className="project-card__title-row">
          <h3 className="project-card__title">
            {project.title}
          </h3>
          <ArrowUpRight className="project-card__arrow-icon" size={20} />
        </div>

        <div className="project-card__details">
          <span className="project-card__client">{project.client}</span>
          <span>&middot;</span>
          <span>{project.year}</span>
        </div>
      </div>
    </article>
  );
};
