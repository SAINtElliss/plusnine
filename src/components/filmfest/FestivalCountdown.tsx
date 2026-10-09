import React, { useState, useEffect } from 'react';

/**
 * Target festival opening: November 12, 2026, 00:00:00 Edmonton local time (America/Edmonton, MST = UTC-7).
 */
const FESTIVAL_TARGET_ISO = '2026-11-12T00:00:00-07:00';
const FESTIVAL_TARGET_MS = new Date(FESTIVAL_TARGET_ISO).getTime();

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const getTimeRemaining = (): TimeRemaining => {
  const diffMs = FESTIVAL_TARGET_MS - Date.now();
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
};

export const FestivalCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(getTimeRemaining);

  useEffect(() => {
    // Tick every second to synchronize live countdown
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUnit = (num: number): string => {
    return String(num).padStart(2, '0');
  };

  return (
    <div className="fest-countdown-container" aria-label="Live Festival Countdown">
      {/* Editorial Eyebrow */}
      <div className="fest-countdown-eyebrow">
        <span className="fest-countdown-live-dot" aria-hidden="true" />
        <span className="fest-countdown-meta">COUNTDOWN TO FESTIVAL · NOV 12, 2026</span>
        <span className="fest-countdown-tz">EDMONTON MST</span>
      </div>

      {/* Main Countdown Display: DAYS : HOURS : MINUTES : SECONDS */}
      <div className="fest-countdown-units" role="timer" aria-live="polite">
        <div className="fest-countdown-unit">
          <span className="fest-countdown-value">{timeLeft.days}</span>
          <span className="fest-countdown-label">DAYS</span>
        </div>

        <span className="fest-countdown-sep" aria-hidden="true">:</span>

        <div className="fest-countdown-unit">
          <span className="fest-countdown-value">{formatUnit(timeLeft.hours)}</span>
          <span className="fest-countdown-label">HOURS</span>
        </div>

        <span className="fest-countdown-sep" aria-hidden="true">:</span>

        <div className="fest-countdown-unit">
          <span className="fest-countdown-value">{formatUnit(timeLeft.minutes)}</span>
          <span className="fest-countdown-label">MINUTES</span>
        </div>

        <span className="fest-countdown-sep" aria-hidden="true">:</span>

        <div className="fest-countdown-unit">
          <span className="fest-countdown-value">{formatUnit(timeLeft.seconds)}</span>
          <span className="fest-countdown-label">SECONDS</span>
        </div>
      </div>

      {/* Editorial Footer Context */}
      <div className="fest-countdown-footer">
        <span>THE ROXY THEATRE</span>
        <span className="fest-countdown-footer-sep" aria-hidden="true">&bull;</span>
        <span>10708 124 ST, EDMONTON AB</span>
        <span className="fest-countdown-footer-sep" aria-hidden="true">&bull;</span>
        <span>FREE ADMISSION</span>
      </div>
    </div>
  );
};

export default FestivalCountdown;
