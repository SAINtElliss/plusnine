export interface MemberProject {
  title: string;
  category?: string;
  year?: string;
  description?: string;
  link?: string;
}

export interface MemberVenture {
  name: string;
  type: string;
  description?: string;
  link?: string;
}

export interface MemberMusicRelease {
  title: string;
  type?: 'Single' | 'EP' | 'Album' | 'Beat Tape' | 'Score' | 'Production';
  year?: string;
  link?: string;
  embedUrl?: string;
}

export interface MemberLink {
  label: string;
  url: string;
  type?: 'social' | 'portfolio' | 'streaming' | 'store' | 'other';
}

export interface Member {
  id: string;
  name: string;
  role: string;
  secondaryIdentity?: string;
  image?: string;
  disciplines?: string[];
  creativeIdentity?: string;
  ventures?: MemberVenture[];
  musicReleases?: MemberMusicRelease[];
  projects?: MemberProject[];
  externalLinks?: MemberLink[];
  bio?: string;
}

export const PLUSNINE_MEMBERS: Member[] = [
  {
    id: 'alfred',
    name: 'Alfred',
    role: 'External, Internal & Oversight',
    secondaryIdentity: 'Clothing Brand Owner',
    disciplines: ['Operations', 'Internal & External Oversight', 'Fashion Design'],
    creativeIdentity: 'Creative entrepreneur; founder and owner of an independent clothing brand.',
    ventures: [
      {
        name: 'Clothing Brand',
        type: 'Fashion & Apparel',
        description: 'Independent clothing and fashion venture.'
      }
    ]
  },
  {
    id: 'denzel',
    name: 'Denzel',
    role: 'Sound Engineer',
    secondaryIdentity: 'Music Producer',
    disciplines: ['Sound Engineering', 'Music Production', 'Sound Design'],
    creativeIdentity: 'Sound engineer and music producer producing original beats, sonic textures, and scores for PlusNine and independent releases.'
  },
  {
    id: 'ellis',
    name: 'Ellis',
    role: 'Graphic Design, SMM & Editing',
    secondaryIdentity: 'Musician',
    disciplines: ['Graphic Design', 'Social Media Management', 'Video Editing', 'Music'],
    creativeIdentity: 'Multi-disciplinary creative working across graphic design, editorial video editing, social media management, and music.'
  },
  {
    id: 'ezinne',
    name: 'Ezinne',
    role: 'Co-Editor-in-Chief & Outreach',
    secondaryIdentity: 'Event Host',
    disciplines: ['Editorial Direction', 'Outreach', 'Event Hosting'],
    creativeIdentity: 'Co-Editor-in-Chief and event producer; hosts and curates independent cultural gatherings and showcases across the UK.'
  },
  {
    id: 'lucy',
    name: 'Lucy',
    role: 'Magazine & Editorial',
    disciplines: ['Magazine Publishing', 'Editorial Direction', 'Writing'],
    creativeIdentity: 'Print and digital magazine editor developing editorial publications, cultural commentary, and curated storytelling.'
  },
  {
    id: 'nani',
    name: 'Nani',
    role: 'Logistics Chair',
    secondaryIdentity: 'Musician',
    disciplines: ['Logistics', 'Operations', 'Music'],
    creativeIdentity: 'Logistics chair and music artist orchestrating independent sound projects and collective operations.'
  },
  {
    id: 'nicole',
    name: 'Nicole',
    role: 'Finance Chair & Digital Creator',
    disciplines: ['Finance', 'Digital Creation', 'Strategic Planning'],
    creativeIdentity: 'Financial strategist and digital creator managing capital planning and digital content initiatives.'
  },
  {
    id: 'oliseh',
    name: 'Oliseh',
    role: 'Content Director & Marketing',
    secondaryIdentity: 'Clothing Brand Owner',
    disciplines: ['Content Direction', 'Marketing', 'Film', 'Fashion Design'],
    creativeIdentity: 'Content director, filmmaker, and brand architect; founder and owner of an independent clothing brand.',
    ventures: [
      {
        name: 'Clothing Brand',
        type: 'Fashion & Apparel',
        description: 'Independent clothing label and apparel line.'
      }
    ]
  },
  {
    id: 'regina',
    name: 'Regina',
    role: 'Events Chair',
    secondaryIdentity: 'Photographer · Beauty Entrepreneur',
    disciplines: ['Event Production', 'Photography', 'Hair Artistry'],
    creativeIdentity: 'Events chair, photographer, and beauty entrepreneur; founder of Onwemma braiding business.',
    ventures: [
      {
        name: 'Onwemma',
        type: 'Braiding & Hair Artistry',
        description: 'Independent hair styling, braiding studio, and protective hair care practice.'
      }
    ]
  },
  {
    id: 'sekani',
    name: 'Sekani',
    role: 'Scriptwriting & Outreach',
    secondaryIdentity: 'Musician',
    disciplines: ['Scriptwriting', 'Outreach', 'Music'],
    creativeIdentity: 'Recording artist, songwriter, and scriptwriter developing musical compositions and narrative screenplays.'
  },
  {
    id: 'toluwani',
    name: 'Toluwani',
    role: 'Co-Chair Finance & Co-Editor-in-Chief',
    secondaryIdentity: 'Musician',
    disciplines: ['Financial Leadership', 'Editorial Direction', 'Music'],
    creativeIdentity: 'Musician, financial strategist, and Co-Editor-in-Chief contributing across sonic releases and print editions.'
  }
];
