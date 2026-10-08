import React, { useEffect, useState } from 'react';

interface IntroLoaderProps {
  isVideoReady: boolean;
  onIntroComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({
  isVideoReady,
  onIntroComplete
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Archive');
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Smooth, deterministic bottom-to-top logo loading progression
    const totalDuration = 2600;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeRatio = Math.min(1, elapsed / totalDuration);

      // Smooth ease-out cubic curve
      const easedProgress = Math.min(100, Math.round((1 - Math.pow(1 - timeRatio, 2.2)) * 100));
      setProgress(easedProgress);

      if (easedProgress < 40) {
        setStatusText('Initializing Archive');
      } else if (easedProgress < 80) {
        setStatusText('Calibrating 4:3 Cinema');
      } else if (easedProgress < 100) {
        setStatusText('PlusNine Edmonton · 2026');
      } else {
        if (isVideoReady || elapsed > 3200) {
          setProgress(100);
          setStatusText('Ready');
          clearInterval(interval);

          setTimeout(() => {
            setIsFinishing(true);
            setTimeout(() => {
              onIntroComplete();
            }, 800); // Smooth 800ms dissolve into hero video
          }, 300);
        }
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isVideoReady, onIntroComplete]);

  return (
    <div
      className={`intro-loader ${isFinishing ? 'is-completed' : ''}`}
      onClick={() => {
        // Fast skip after 50%
        if (progress > 50) {
          setIsFinishing(true);
          setTimeout(onIntroComplete, 400);
        }
      }}
    >
      <div className="intro-loader__center-stage">
        {/* Centered Logo Filling Up (Bottom to Top) */}
        <div className="intro-loader__logo-wrapper">
          {/* Base Layer: Chrome 3D Logo (Transparent PNG) */}
          <img
            src="/logo/logo_chrome2_trans_bg.png"
            alt="PlusNine Base"
            className="intro-loader__logo-base"
          />

          {/* Fill Layer: White 3D Logo (Transparent PNG, revealed bottom-to-top via inset clip-path) */}
          <div
            className="intro-loader__fill-wrapper"
            style={{
              clipPath: `inset(${100 - progress}% 0 0 0)`
            }}
          >
            <img
              src="/logo/logo_white_trans_bg.png"
              alt="PlusNine Fill"
              className="intro-loader__logo-fill"
            />
          </div>

          {/* Glowing Liquid Frontier Line */}
          {progress > 1 && progress < 99 && (
            <div
              className="intro-loader__fill-glow-line"
              style={{
                bottom: `${progress}%`
              }}
            />
          )}
        </div>

        {/* Progress Metrics & Status readout */}
        <div className="intro-loader__meta">
          <div className="intro-loader__percentage">
            {progress}%
          </div>
          <div className="intro-loader__status">
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
};
