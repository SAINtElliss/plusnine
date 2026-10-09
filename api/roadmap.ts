export type ProgrammeItemType =
  | 'start'
  | 'screening'
  | 'intermission'
  | 'games'
  | 'voting'
  | 'awards'
  | 'finish';

export interface FilmDetails {
  poster: string;
  runtime: string;
  director: string;
  genre: string;
  synopsis: string;
}

export interface RoadmapItem {
  id: string;
  type: ProgrammeItemType;
  badgeLabel?: string;
  time: string;
  title: string;
  subtitle?: string;
  description?: string;
  filmDetails?: FilmDetails;
}

export interface RoadmapResponse {
  released: boolean;
  isAdminPreview: boolean;
  releaseDate: string;
  timezone: string;
  serverTime: string;
  items: RoadmapItem[];
}

/**
 * Scheduled public release timestamp in America/Edmonton (MST / UTC-7).
 * Default: November 10, 2026 at 9:00 AM MST (48 hours before festival opening).
 * Overridable via ROADMAP_RELEASE_DATE environment variable.
 */
export const DEFAULT_RELEASE_ISO = '2026-11-10T09:00:00-07:00';

export const getReleaseDateIso = (): string => {
  return (typeof process !== 'undefined' && process.env?.ROADMAP_RELEASE_DATE) || DEFAULT_RELEASE_ISO;
};

export const getAdminKey = (): string => {
  return (typeof process !== 'undefined' && process.env?.ROADMAP_ADMIN_KEY) || 'plusnine2026';
};

export const MASTER_ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: 'start',
    type: 'start',
    badgeLabel: 'START',
    time: '5:30 PM',
    title: 'Doors Open / Guest Arrival',
    description:
      'Welcome reception, guest check-in, complimentary refreshments, networking, and festival opening introductions celebrating Black and Diaspora cinema.'
  },
  {
    id: 'film-1',
    type: 'screening',
    badgeLabel: 'FILM SCREENING',
    time: '6:00 PM',
    title: 'Demo Film 01',
    subtitle: 'Selected Narrative Feature',
    filmDetails: {
      poster: '/images/projects/as_we_are.jpg',
      runtime: '18 MIN',
      director: 'Curatorial Selection',
      genre: 'Narrative Feature',
      synopsis:
        'An evocative study exploring rhythm, cultural heritage, and diaspora memory through nuanced personal encounters.'
    }
  },
  {
    id: 'film-2',
    type: 'screening',
    badgeLabel: 'FILM SCREENING',
    time: '6:30 PM',
    title: 'Demo Film 02',
    subtitle: 'Movement & Form',
    filmDetails: {
      poster: '/images/projects/just.jpg',
      runtime: '14 MIN',
      director: 'Kofi Mensah',
      genre: 'Visual Poetry',
      synopsis:
        'A kinetic study of physical motion and quiet introspection set against contrasting urban landscapes.'
    }
  },
  {
    id: 'intermission',
    type: 'intermission',
    badgeLabel: 'INTERMISSION',
    time: '7:00 PM',
    title: 'Intermission',
    description:
      'Short pause for refreshments, social conversation, and informal foyer gathering.'
  },
  {
    id: 'games',
    type: 'games',
    badgeLabel: 'GAMES / AUDIENCE ACTIVITY',
    time: '7:15 PM',
    title: 'Games',
    description:
      'Interactive cinema trivia, audience challenges, and quick onstage activities.'
  },
  {
    id: 'film-3',
    type: 'screening',
    badgeLabel: 'FILM SCREENING',
    time: '7:45 PM',
    title: 'Demo Film 03',
    subtitle: 'Nocturnal Frequencies',
    filmDetails: {
      poster: '/images/projects/loca_q.jpg',
      runtime: '22 MIN',
      director: 'Malik Touré',
      genre: 'Documentary · Archival Sound',
      synopsis:
        'An archival exploration of late-night sound cultures, independent gatherings, and sonic traditions spanning decades.'
    }
  },
  {
    id: 'film-4',
    type: 'screening',
    badgeLabel: 'FILM SCREENING',
    time: '8:15 PM',
    title: 'Demo Film 04',
    subtitle: 'Prairie Moving Image',
    filmDetails: {
      poster: '/images/projects/we_werent_asleep.jpg',
      runtime: '16 MIN',
      director: 'PlusNine Collective',
      genre: 'Experimental',
      synopsis:
        'A retrospective compilation documenting collective creation, resilience, and visual alchemy.'
    }
  },
  {
    id: 'voting',
    type: 'voting',
    badgeLabel: 'AUDIENCE VOTING',
    time: '8:45 PM',
    title: 'Voting',
    description:
      'Attendees cast live digital ballots for the 2026 People’s Choice Award and Best Cinematography.'
  },
  {
    id: 'awards',
    type: 'awards',
    badgeLabel: 'PRIZE GIVING / WINNER ANNOUNCEMENT',
    time: '9:15 PM',
    title: 'Prize Giving',
    description:
      'Live onstage award announcements recognizing standout films and emerging filmmaker grants.'
  },
  {
    id: 'finish',
    type: 'finish',
    badgeLabel: 'FINISH',
    time: '9:45 PM – LATE',
    title: 'Closing Celebration & Mixer',
    description:
      'Concluding festival remarks, ambient soundscapes, and closing reception in The Roxy Theatre lounge.'
  }
];

export function evaluateRoadmapAccess(providedKey?: string | null): RoadmapResponse {
  const releaseDateIso = getReleaseDateIso();
  const releaseMs = new Date(releaseDateIso).getTime();
  const nowMs = Date.now();
  const isTimeReleased = nowMs >= releaseMs;

  const validKey = getAdminKey();
  const cleanProvidedKey = providedKey ? providedKey.trim() : '';
  const isAdminValid = Boolean(cleanProvidedKey && cleanProvidedKey === validKey);

  const shouldSendContent = isTimeReleased || isAdminValid;

  return {
    released: isTimeReleased,
    isAdminPreview: !isTimeReleased && isAdminValid,
    releaseDate: releaseDateIso,
    timezone: 'America/Edmonton',
    serverTime: new Date().toISOString(),
    items: shouldSendContent ? MASTER_ROADMAP_ITEMS : []
  };
}

export default async function handler(req: any, res: any) {
  // Support CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Extract admin passkey from multiple supported sources
  let providedKey: string | null = null;

  // 1. x-admin-key header
  const customHeader = req.headers?.['x-admin-key'];
  if (typeof customHeader === 'string') {
    providedKey = customHeader;
  }

  // 2. Authorization header: Bearer <token>
  const authHeader = req.headers?.authorization;
  if (!providedKey && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    providedKey = authHeader.replace('Bearer ', '').trim();
  }

  // 3. Query string: ?admin=<key> or ?key=<key>
  if (!providedKey && req.query) {
    if (typeof req.query.admin === 'string') {
      providedKey = req.query.admin;
    } else if (typeof req.query.key === 'string') {
      providedKey = req.query.key;
    }
  }

  // 4. Request body (if POST)
  if (!providedKey && req.body && typeof req.body === 'object') {
    if (typeof req.body.admin === 'string') {
      providedKey = req.body.admin;
    } else if (typeof req.body.key === 'string') {
      providedKey = req.body.key;
    }
  }

  const result = evaluateRoadmapAccess(providedKey);

  // Set appropriate cache headers
  if (result.isAdminPreview || providedKey) {
    // Never cache admin preview responses
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  } else if (!result.released) {
    // Short cache before release so time transitions promptly
    res.setHeader('Cache-Control', 'public, s-maxage=30, max-age=15, stale-while-revalidate=30');
  } else {
    // Released content
    res.setHeader('Cache-Control', 'public, s-maxage=300, max-age=60');
  }

  return res.status(200).json(result);
}
