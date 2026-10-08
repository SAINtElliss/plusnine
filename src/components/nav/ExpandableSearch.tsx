import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PROJECTS_DATA, Project } from '../../data/projects';

interface ExpandableSearchProps {
  onSelectProject?: (project: Project) => void;
}

export const ExpandableSearch: React.FC<ExpandableSearchProps> = ({
  onSelectProject
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Project[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter projects dynamically
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matched = PROJECTS_DATA.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.credits &&
          p.credits.some(
            (c) =>
              c.label.toLowerCase().includes(q) ||
              c.value.toLowerCase().includes(q)
          ))
      );
    });

    setResults(matched);
  }, [query]);

  // Click outside to collapse
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K or Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsExpanded((prev) => !prev);
      } else if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isExpanded]);

  const handleSelect = (project: Project) => {
    if (onSelectProject) {
      onSelectProject(project);
    } else {
      const el = document.getElementById('works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsExpanded(false);
  };

  return (
    <div
      ref={containerRef}
      className={`expandable-search ${isExpanded ? 'is-expanded' : ''}`}
    >
      <div
        className="expandable-search__bar"
        onClick={() => {
          if (!isExpanded) setIsExpanded(true);
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded((prev) => !prev);
          }}
          className="expandable-search__trigger-btn"
          aria-label={isExpanded ? 'Close Search' : 'Open Search'}
        >
          <Search size={14} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search archive, films, issues..."
          className="expandable-search__input"
          aria-label="Search archive"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="expandable-search__clear-btn"
            aria-label="Clear search query"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Instant Search Results Dropdown */}
      {isExpanded && query.trim().length > 0 && (
        <div className="expandable-search__results">
          {results.length > 0 ? (
            <div className="expandable-search__results-list">
              <div className="search-results__header">
                Archive Matches ({results.length})
              </div>
              {results.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleSelect(project)}
                  className="search-result-item"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="search-result-item__thumb"
                  />
                  <div className="search-result-item__info">
                    <div className="search-result-item__title">
                      {project.title}
                    </div>
                    <div className="search-result-item__category">
                      {project.category} &middot; {project.year}
                    </div>
                  </div>
                  <ArrowRight size={14} className="search-result-item__arrow" />
                </button>
              ))}
            </div>
          ) : (
            <div className="search-results__empty">
              No matching productions for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
};
