import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Search,
  X,
  ArrowRight,
  ArrowUpRight,
  Film,
  Calendar,
  Users,
  Info,
  BookOpen,
  Send
} from 'lucide-react';
import { PROJECTS_DATA, Project, PageType } from '../../data/projects';
import { PLUSNINE_MEMBERS } from '../../data/members';

interface ExpandableSearchProps {
  onSelectProject?: (project: Project) => void;
  onNavigate?: (page: PageType) => void;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

type SearchCategory = 'Work' | 'Events' | 'People' | 'Pages';

interface SearchResultItem {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  snippet?: string;
  image?: string;
  icon?: 'film' | 'calendar' | 'users' | 'info' | 'magazine' | 'send';
  isExternal?: boolean;
  keywords: string[];
  onSelect: () => void;
}

export const ExpandableSearch: React.FC<ExpandableSearchProps> = ({
  onSelectProject,
  onNavigate,
  isExpanded: controlledExpanded,
  onExpandedChange
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const setExpanded = (next: boolean | ((prev: boolean) => boolean)) => {
    const nextVal = typeof next === 'function' ? next(isExpanded) : next;
    if (onExpandedChange) {
      onExpandedChange(nextVal);
    } else {
      setInternalExpanded(nextVal);
    }
  };

  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Compile comprehensive site-wide searchable database
  const allSearchItems = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // 1. WORK ARCHIVE (Projects, Films, Editorials, Recaps)
    PROJECTS_DATA.forEach((project) => {
      items.push({
        id: `work-${project.id}`,
        category: 'Work',
        title: project.title,
        subtitle: `${project.category} · ${project.year}`,
        snippet: project.description,
        image: project.image,
        icon: 'film',
        keywords: [
          project.title,
          project.category,
          project.client,
          project.description,
          project.year,
          ...(project.tags || []),
          ...(project.credits ? project.credits.map((c) => `${c.label} ${c.value}`) : [])
        ],
        onSelect: () => {
          if (project.id === 'as-we-are') {
            if (onNavigate) onNavigate('as-we-are');
            else window.location.hash = '#/as-we-are';
          } else if (onSelectProject) {
            onSelectProject(project);
          } else {
            if (onNavigate) onNavigate('work');
            else window.location.hash = '#/work';
          }
        }
      });
    });

    // 2. EVENTS (4K Film Festival 2026, Past Releases & Showcases)
    items.push({
      id: 'event-4k-film-fest',
      category: 'Events',
      title: '4K Film Festival 2026',
      subtitle: 'Nov 12, 2026 · The Roxy Theatre, Edmonton',
      snippet: 'A celebration of African & diaspora storytelling through film. Screenings, roadmap timetable, and free admission.',
      image: '/images/events/4k_film_festival_promo.png',
      icon: 'calendar',
      keywords: [
        '4k film festival',
        'film festival',
        'roxy theatre',
        'edmonton',
        'november 12 2026',
        'nov 12 2026',
        'free admission',
        'reserve pass',
        'roadmap',
        'screenings',
        'african diaspora',
        'gatherings',
        'cinema'
      ],
      onSelect: () => {
        if (onNavigate) onNavigate('film-fest');
        else window.location.hash = '#/film-fest';
      }
    });

    items.push({
      id: 'event-as-we-are-release',
      category: 'Events',
      title: 'AS WE ARE (Digital Publication Launch)',
      subtitle: 'Feb 17, 2025 · Online Release',
      snippet: 'Online editorial publication launch with Vernacular Magazine reflecting on ordinary rhythms of Black life.',
      image: '/images/projects/as_we_are.jpg',
      icon: 'calendar',
      keywords: [
        'as we are',
        'digital release',
        'online publication',
        'vernacular magazine',
        'launch',
        'february 17 2025',
        'feb 17 2025',
        'editorial launch'
      ],
      onSelect: () => {
        if (onNavigate) onNavigate('as-we-are');
        else window.location.hash = '#/as-we-are';
      }
    });

    // 3. PEOPLE (11-Member Collective Roster)
    PLUSNINE_MEMBERS.forEach((member) => {
      items.push({
        id: `person-${member.id}`,
        category: 'People',
        title: member.name,
        subtitle: member.role + (member.secondaryIdentity ? ` · ${member.secondaryIdentity}` : ''),
        snippet: member.creativeIdentity || (member.disciplines ? member.disciplines.join(', ') : ''),
        image: member.image,
        icon: 'users',
        keywords: [
          member.name,
          member.role,
          member.secondaryIdentity || '',
          ...(member.disciplines || []),
          member.creativeIdentity || '',
          member.bio || ''
        ],
        onSelect: () => {
          window.location.hash = `#/people/${member.id}`;
          if (onNavigate) onNavigate('people');
        }
      });
    });

    // 4. PAGES (About, Work, Events, People, Film Festival, Film Submission, Magazine)
    items.push({
      id: 'page-about',
      category: 'Pages',
      title: 'About PlusNine',
      subtitle: 'Studio Manifesto & Practice',
      snippet: 'Independent creative development studio, film production collective, and cultural magazine platform based in Edmonton.',
      icon: 'info',
      keywords: [
        'about',
        'about us',
        'manifesto',
        'studio',
        'edmonton',
        'collective',
        'practices',
        'mission',
        'creative development'
      ],
      onSelect: () => {
        if (onNavigate) onNavigate('about');
        else window.location.hash = '#/about';
      }
    });

    items.push({
      id: 'page-work',
      category: 'Pages',
      title: 'Work Archive',
      subtitle: 'Portfolio of Original Productions',
      snippet: 'Asymmetrical numbered archive of films, campaigns, editorials, and visual culture projects.',
      icon: 'film',
      keywords: [
        'work',
        'work archive',
        'projects',
        'portfolio',
        'productions',
        'films',
        'editorials',
        'campaigns'
      ],
      onSelect: () => {
        if (onNavigate) onNavigate('work');
        else window.location.hash = '#/work';
      }
    });

    items.push({
      id: 'page-events',
      category: 'Pages',
      title: 'Events & Gatherings',
      subtitle: 'Showcases, Screenings & Pop-ups',
      snippet: 'Screenings, parties, pop-ups, showcases, and creative community cultural gatherings.',
      icon: 'calendar',
      keywords: [
        'events',
        'gatherings',
        'showcases',
        'parties',
        'pop-ups',
        'screenings',
        'calendar'
      ],
      onSelect: () => {
        if (onNavigate) onNavigate('events');
        else window.location.hash = '#/events';
      }
    });

    items.push({
      id: 'page-people',
      category: 'Pages',
      title: 'People Directory',
      subtitle: 'Collective Members & Collaborators',
      snippet: 'Meet the 11 multidisciplinary creators, directors, sound engineers, and producers behind PlusNine.',
      icon: 'users',
      keywords: [
        'people',
        'people directory',
        'collective roster',
        'members',
        'collaborators',
        'team'
      ],
      onSelect: () => {
        if (onNavigate) onNavigate('people');
        else window.location.hash = '#/people';
      }
    });

    items.push({
      id: 'page-filmfest',
      category: 'Pages',
      title: '4K Film Festival Page',
      subtitle: 'Programme, Roadmap & Passes',
      snippet: 'Official festival programme, timetable roadmap, passes, and venue details at The Roxy Theatre.',
      icon: 'film',
      keywords: [
        '4k film festival',
        'festival page',
        'film fest page',
        'programme',
        'schedule roadmap',
        'passes'
      ],
      onSelect: () => {
        if (onNavigate) onNavigate('film-fest');
        else window.location.hash = '#/film-fest';
      }
    });

    items.push({
      id: 'page-film-submission',
      category: 'Pages',
      title: 'Film Submission',
      subtitle: 'Wix Form · submit.plusnine.org',
      snippet: 'Submit independent films, shorts, and treatments to the 4K Film Festival and PlusNine co-productions.',
      icon: 'send',
      isExternal: true,
      keywords: [
        'film submission',
        'submission',
        'submit film',
        'submit your film',
        'call for entries',
        'filmmakers',
        'treatment submission',
        'form'
      ],
      onSelect: () => {
        // Uses the existing /film-submission redirect
        window.location.href = '/film-submission';
      }
    });

    items.push({
      id: 'page-magazine',
      category: 'Pages',
      title: 'PlusNine Magazine',
      subtitle: 'Editorial Publication (@plusnine.mag)',
      snippet: 'Print and digital publication championing culture, visual essays, and editorial storytelling.',
      icon: 'magazine',
      isExternal: true,
      keywords: [
        'magazine',
        'plusnine magazine',
        'plusnine mag',
        'vernacular',
        'editorial',
        'publication',
        'instagram',
        'visual culture'
      ],
      onSelect: () => {
        window.open('https://www.instagram.com/plusnine.mag/', '_blank', 'noopener,noreferrer');
      }
    });

    return items;
  }, [onNavigate, onSelectProject]);

  // Case-insensitive, partial keyword matching grouped by category
  const { groupedResults, totalMatches } = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return {
        groupedResults: { Work: [], Events: [], People: [], Pages: [] },
        totalMatches: 0
      };
    }

    const terms = trimmed.split(/\s+/).filter(Boolean);

    const matches = allSearchItems.filter((item) => {
      return terms.every((term) => {
        return (
          item.title.toLowerCase().includes(term) ||
          item.subtitle.toLowerCase().includes(term) ||
          (item.snippet && item.snippet.toLowerCase().includes(term)) ||
          item.category.toLowerCase().includes(term) ||
          item.keywords.some((kw) => kw.toLowerCase().includes(term))
        );
      });
    });

    const groups: Record<SearchCategory, SearchResultItem[]> = {
      Work: [],
      Events: [],
      People: [],
      Pages: []
    };

    matches.forEach((item) => {
      groups[item.category].push(item);
    });

    return {
      groupedResults: groups,
      totalMatches: matches.length
    };
  }, [allSearchItems, query]);

  // Click outside to collapse
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
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
        setExpanded((prev) => !prev);
      } else if (e.key === 'Escape' && isExpanded) {
        setExpanded(false);
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
    }
  }, [isExpanded]);

  const handleItemClick = (item: SearchResultItem) => {
    item.onSelect();
    setExpanded(false);
    setQuery('');
  };

  const CATEGORIES: SearchCategory[] = ['Work', 'Events', 'People', 'Pages'];

  const renderIcon = (item: SearchResultItem) => {
    if (item.image) {
      if (item.category === 'People') {
        return (
          <img
            src={item.image}
            alt={item.title}
            className="search-result-item__avatar"
          />
        );
      }
      return (
        <img
          src={item.image}
          alt={item.title}
          className="search-result-item__thumb"
        />
      );
    }

    switch (item.icon) {
      case 'calendar':
        return (
          <div className="search-result-item__icon-box">
            <Calendar size={14} />
          </div>
        );
      case 'users':
        return (
          <div className="search-result-item__icon-box">
            <Users size={14} />
          </div>
        );
      case 'send':
        return (
          <div className="search-result-item__icon-box">
            <Send size={14} />
          </div>
        );
      case 'magazine':
        return (
          <div className="search-result-item__icon-box">
            <BookOpen size={14} />
          </div>
        );
      case 'info':
        return (
          <div className="search-result-item__icon-box">
            <Info size={14} />
          </div>
        );
      case 'film':
      default:
        return (
          <div className="search-result-item__icon-box">
            <Film size={14} />
          </div>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`expandable-search ${isExpanded ? 'is-expanded' : ''}`}
    >
      <div
        className="expandable-search__bar"
        onClick={() => {
          if (!isExpanded) setExpanded(true);
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
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
          placeholder="Search work, events, people, pages..."
          className="expandable-search__input"
          aria-label="Search site"
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

      {/* Site-Wide Search Results Dropdown */}
      {isExpanded && query.trim().length > 0 && (
        <div className="expandable-search__results">
          {totalMatches > 0 ? (
            <div className="expandable-search__results-list">
              <div className="search-results__global-header">
                <span>Site Search Results</span>
                <span className="search-results__count-badge">
                  {totalMatches} {totalMatches === 1 ? 'match' : 'matches'}
                </span>
              </div>

              {CATEGORIES.map((category) => {
                const categoryList = groupedResults[category];
                if (!categoryList || categoryList.length === 0) return null;

                return (
                  <div key={category} className="search-category-section">
                    <div className="search-category-header">
                      <span className="search-category-title">{category}</span>
                      <span className="search-category-count">
                        {categoryList.length}
                      </span>
                    </div>

                    <div className="search-category-items">
                      {categoryList.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleItemClick(item)}
                          className="search-result-item"
                        >
                          <div className="search-result-item__visual">
                            {renderIcon(item)}
                          </div>

                          <div className="search-result-item__info">
                            <div className="search-result-item__title-row">
                              <span className="search-result-item__title">
                                {item.title}
                              </span>
                              {item.isExternal && (
                                <ArrowUpRight
                                  size={11}
                                  className="search-result-item__external-icon"
                                />
                              )}
                            </div>
                            <div className="search-result-item__subtitle">
                              {item.subtitle}
                            </div>
                            {item.snippet && (
                              <div className="search-result-item__snippet">
                                {item.snippet}
                              </div>
                            )}
                          </div>

                          <ArrowRight
                            size={13}
                            className="search-result-item__arrow"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="search-results__empty">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandableSearch;
