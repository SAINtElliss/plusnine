export type PageType = 'home' | 'work' | 'events' | 'people' | 'about' | 'film-fest' | 'as-we-are';

export interface Project {
  id: string;
  title: string;
  category: 'Film' | 'Creative Direction' | 'Editorial' | 'Campaign' | 'Culture' | 'Recap';
  client: string;
  director?: string;
  year: string;
  aspectRatio: '4-3' | '16-9' | 'square';
  image: string;
  description: string;
  credits?: { label: string; value: string }[];
  tags?: string[];
  ctaLabel?: string;
  featured?: boolean;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'as-we-are',
    title: 'AS WE ARE',
    category: 'Editorial',
    client: 'Vernacular Magazine × PlusNine',
    director: 'PlusNine Direction',
    year: '2025 / 2026',
    aspectRatio: '4-3',
    image: '/images/projects/as_we_are.jpg',
    description: 'A collaborative issue reflecting on the beauty, strength, and meaning found in ordinary rhythms of Black life.',
    tags: ['Vernacular Magazine', 'Edmonton / Montreal'],
    credits: [
      { label: 'Publication', value: 'Vernacular Magazine' },
      { label: 'Creative Direction', value: 'PlusNine Studio' },
      { label: 'Location', value: 'Edmonton / Montreal' }
    ],
    ctaLabel: 'EXPLORE ISSUE',
    featured: true
  },
  {
    id: 'we-werent-asleep',
    title: "WE WEREN'T ASLEEP",
    category: 'Recap',
    client: 'PLUSNINE RECAP',
    year: '2025',
    aspectRatio: '16-9',
    image: '/images/projects/we_werent_asleep.jpg',
    description: 'A look back at what we were building while things seemed quiet.',
    tags: ['2025 RECAP', 'ARCHIVE FOOTAGE', '+9 COLLECTIVE'],
    ctaLabel: 'WATCH THE FILM',
    featured: true
  }
];
