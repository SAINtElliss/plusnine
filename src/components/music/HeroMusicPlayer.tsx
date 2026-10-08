import React, { useState, useRef, useEffect } from 'react';
import { Disc3, X, Radio, ArrowUpRight } from 'lucide-react';

export interface MusicArtist {
  id: string;
  name: string;
  spotifyId: string;
  spotifyUrl: string;
  imageUrl: string;
  genre: string;
}

export const MUSIC_ARTISTS: MusicArtist[] = [
  {
    id: 'nachel',
    name: 'Nachel',
    spotifyId: '4HnhV3ec1dlZVnJjqHllvD',
    spotifyUrl: 'https://open.spotify.com/artist/4HnhV3ec1dlZVnJjqHllvD',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb9db6f0aaef927d11226f96f9',
    genre: 'Alternative / R&B'
  },
  {
    id: 'nani',
    name: 'Naní',
    spotifyId: '3Jv8qL2kYNmAXkHWjEHS4r',
    spotifyUrl: 'https://open.spotify.com/artist/3Jv8qL2kYNmAXkHWjEHS4r',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebc9698da00ecd20e8b11f9870',
    genre: 'Soul / Contemporary'
  },
  {
    id: 'sekani',
    name: 'Sekani.',
    spotifyId: '4Gots8q75ZHUOYnSPB69oB',
    spotifyUrl: 'https://open.spotify.com/artist/4Gots8q75ZHUOYnSPB69oB',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb778dfe2a394240171758d334',
    genre: 'Afro-fusion / R&B'
  },
  {
    id: 'whatistoluwani',
    name: 'Whatistoluwani',
    spotifyId: '7lGW1G8tXD64tv5a1br2II',
    spotifyUrl: 'https://open.spotify.com/artist/7lGW1G8tXD64tv5a1br2II',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb97857db99ae80221911fcfab',
    genre: 'Hip-Hop / Alternative'
  }
];

interface HeroMusicPlayerProps {
  onMusicPlay?: () => void;
}

export const HeroMusicPlayer: React.FC<HeroMusicPlayerProps> = ({ onMusicPlay }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeArtistIndex, setActiveArtistIndex] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const wasActiveBeforeVideoInterruptionRef = useRef(false);
  const activeArtist = MUSIC_ARTISTS[activeArtistIndex];

  // Close when clicking outside & listen for global trigger
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleGlobalToggle = () => {
      setIsOpen(true);
      setIsAudioActive(true);
      if (onMusicPlay) {
        onMusicPlay();
      }
    };

    // Media Coordination: Pause when hero video is unmuted
    const handlePauseFromVideo = () => {
      if (isAudioActive || isOpen) {
        wasActiveBeforeVideoInterruptionRef.current = true;
        setIsAudioActive(false);
      }
    };

    // Media Coordination: Resume only if radio was active before video interrupted it
    const handleResumeFromVideo = () => {
      if (wasActiveBeforeVideoInterruptionRef.current) {
        wasActiveBeforeVideoInterruptionRef.current = false;
        setIsAudioActive(true);
      }
    };

    window.addEventListener('open-music-player', handleGlobalToggle);
    window.addEventListener('pause-music-from-video', handlePauseFromVideo);
    window.addEventListener('resume-music-from-video', handleResumeFromVideo);

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('open-music-player', handleGlobalToggle);
      window.removeEventListener('pause-music-from-video', handlePauseFromVideo);
      window.removeEventListener('resume-music-from-video', handleResumeFromVideo);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isAudioActive, onMusicPlay]);

  const togglePlayer = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setIsAudioActive(true);
      wasActiveBeforeVideoInterruptionRef.current = false;
      if (onMusicPlay) {
        onMusicPlay();
      }
    } else {
      // Manually closed/paused by user -> do not auto resume from video interruption
      wasActiveBeforeVideoInterruptionRef.current = false;
    }
  };

  const handleSelectArtist = (idx: number) => {
    setActiveArtistIndex(idx);
    setIsAudioActive(true);
    wasActiveBeforeVideoInterruptionRef.current = false;
    if (onMusicPlay) {
      onMusicPlay();
    }
  };

  return (
    <div className="hero-music-container" ref={cardRef}>
      {/* Pinned PlusNine Radio Mini Pill Trigger */}
      <button
        onClick={togglePlayer}
        className={`hero-music-toggle ${isOpen ? 'is-active' : ''}`}
        aria-label="Toggle PlusNine Radio"
      >
        <div className="hero-music-toggle__left">
          <Disc3 size={15} className={`hero-music-disc ${isOpen || isAudioActive ? 'is-spinning' : ''}`} />
          <span className="hero-music-toggle__brand">PlusNine Radio</span>
          <span className="hero-music-toggle__sep">·</span>
          <span className="hero-music-toggle__title">{activeArtist.name}</span>
          <span className="hero-music-toggle__spotify-badge">SPOTIFY</span>
        </div>

        {/* Dynamic Equalizer Visualizer */}
        <div className={`hero-music-eq ${isAudioActive ? 'is-playing' : ''}`}>
          <span className="hero-music-eq__bar" />
          <span className="hero-music-eq__bar" />
          <span className="hero-music-eq__bar" />
          <span className="hero-music-eq__bar" />
        </div>
      </button>

      {/* Pinned Glassmorphic Spotify Player Card Popover */}
      {isOpen && (
        <div className="hero-music-card">
          {/* Header */}
          <div className="hero-music-card__header">
            <div className="hero-music-card__title-group">
              <div className="hero-music-live-indicator">
                <span className="hero-music-live-dot" />
                <span className="hero-music-card__label">PlusNine Radio · Spotify Stream</span>
              </div>
              <h4 className="hero-music-card__artist-name">{activeArtist.name}</h4>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                wasActiveBeforeVideoInterruptionRef.current = false;
              }}
              className="hero-music-card__close"
              aria-label="Close PlusNine Radio"
            >
              <X size={14} />
            </button>
          </div>

          {/* Artist Selector Chips (All 4 Verified Spotify Pages) */}
          <div className="hero-music-card__artists-row">
            {MUSIC_ARTISTS.map((artist, idx) => (
              <button
                key={artist.id}
                onClick={() => handleSelectArtist(idx)}
                className={`hero-music-artist-chip ${idx === activeArtistIndex ? 'is-selected' : ''}`}
                aria-label={`Play ${artist.name} on Spotify`}
              >
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="hero-music-artist-chip__avatar"
                />
                <span className="hero-music-artist-chip__name">{artist.name}</span>
              </button>
            ))}
          </div>

          {/* Dedicated Spotify Web Player Embed for the Selected Artist */}
          <div className="hero-music-card__player-frame">
            <iframe
              key={activeArtist.spotifyId}
              src={`https://open.spotify.com/embed/artist/${activeArtist.spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`Spotify Player — ${activeArtist.name}`}
              className="hero-spotify-iframe"
            />
          </div>

          {/* Card Footer: Genre Tag + Open Full Spotify Page Link */}
          <div className="hero-music-card__footer">
            <div className="hero-music-card__genre-tag">
              <Radio size={11} />
              <span>{activeArtist.genre}</span>
            </div>

            <a
              href={activeArtist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-music-card__external-link"
            >
              <span>Open on Spotify</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
