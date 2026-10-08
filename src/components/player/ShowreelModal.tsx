import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTime?: number;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({
  isOpen,
  onClose,
  initialTime = 0
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(363.5);

  useEffect(() => {
    if (!isOpen) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      return;
    }

    if (videoRef.current) {
      videoRef.current.currentTime = initialTime;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, initialTime]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || !videoRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pos * duration;
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="showreel-modal" onClick={onClose}>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="showreel-modal__close-btn"
        aria-label="Close Showreel"
      >
        <X size={20} />
      </button>

      {/* Modal Video Frame */}
      <div
        className="showreel-modal__player-frame"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          className="showreel-modal__video"
          autoPlay
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        >
          <source src="/videos/showreel_web.mp4" type="video/mp4" />
          <source src="/videos/hero_loop.mp4" type="video/mp4" />
        </video>

        {/* Custom Player Controls Bar */}
        <div className="showreel-modal__controls-bar">
          {/* Timeline Scrubber */}
          <div
            ref={timelineRef}
            className="showreel-modal__timeline"
            onClick={handleTimelineClick}
          >
            <div
              className="showreel-modal__timeline-progress"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Bottom Actions */}
          <div className="showreel-modal__actions">
            <div className="showreel-modal__playback-group">
              <button
                onClick={togglePlay}
                style={{ display: 'flex', alignItems: 'center' }}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
              </button>

              <button
                onClick={handleRestart}
                style={{ display: 'flex', alignItems: 'center' }}
                aria-label="Restart"
              >
                <RotateCcw size={16} />
              </button>

              <button
                onClick={toggleSound}
                style={{ display: 'flex', alignItems: 'center' }}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="caption-meta" style={{ color: '#ffffff' }}>
                PlusNine 2026 Showreel
              </span>

              <button
                onClick={toggleFullscreen}
                style={{ display: 'flex', alignItems: 'center' }}
                aria-label="Fullscreen"
              >
                <Maximize size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
