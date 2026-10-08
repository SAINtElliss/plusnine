import { PageType } from './projects';

export interface HeroSlideAction {
  id: string;
  label: string;
  variant: 'primary' | 'secondary' | 'watch';
  icon?: 'ticket' | 'arrow' | 'play';
  targetPage?: PageType;
  openShowreel?: boolean;
  externalUrl?: string;
  anchorId?: string;
}

export interface HeroSlideData {
  id: string;
  media: {
    type: 'image' | 'video';
    src: string;
    srcWebp?: string;
    poster?: string;
    alt: string;
  };
  metadata: {
    badge?: string;
    date?: string;
    location?: string;
    highlight?: string;
    presentsTag?: string;
  };
  logo: {
    src: string;
    alt: string;
    maxWidth?: string;
    maxHeight?: string;
  };
  description: string;
  actions: HeroSlideAction[];
}

export const HERO_SLIDES_DATA: HeroSlideData[] = [
  {
    id: '4k-film-festival',
    media: {
      type: 'image',
      src: '/images/events/4k_film_festival_promo.png',
      srcWebp: '/images/events/4k_film_festival_promo.webp',
      alt: '4K Film Festival — A Celebration of African & Diaspora Storytelling Through Film'
    },
    metadata: {
      badge: 'FEATURED EVENT',
      date: 'NOV. 12 2026',
      location: 'THE ROXY THEATRE · EDMONTON',
      highlight: 'FREE ADMISSION',
      presentsTag: 'PLUSNINE PRESENTS'
    },
    logo: {
      src: '/images/events/4k_film_festival_logo.png',
      alt: '4K Film Festival'
    },
    description: 'A celebration of African & Diaspora storytelling through film. Join us on Nov. 12, 2026 at The Roxy Theatre in Edmonton for a curated gathering of cinema and dialogue.',
    actions: [
      {
        id: 'passes',
        label: 'Reserve Free Passes',
        variant: 'primary',
        icon: 'ticket',
        targetPage: 'film-fest'
      },
      {
        id: 'programme',
        label: 'Explore Programme',
        variant: 'secondary',
        targetPage: 'film-fest'
      }
    ]
  }
];
