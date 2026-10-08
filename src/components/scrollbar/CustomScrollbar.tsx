import React, { useEffect, useRef, useState, useCallback } from 'react';

export const CustomScrollbar: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startDragYRef = useRef(0);
  const startScrollTopRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(60);
  const [thumbTop, setThumbTop] = useState(0);

  // Update scrollbar dimensions and position
  const updateScroll = useCallback(() => {
    if (!trackRef.current) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = scrollHeight - clientHeight;

    const trackHeight = trackRef.current.clientHeight;

    if (maxScroll <= 0) {
      setThumbHeight(trackHeight);
      setThumbTop(0);
      return;
    }

    // Dynamic thumb height proportional to viewport / content ratio
    const calculatedHeight = Math.max(48, Math.min(trackHeight * 0.8, (clientHeight / scrollHeight) * trackHeight));
    const maxThumbTop = trackHeight - calculatedHeight;
    const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
    const calculatedTop = progress * maxThumbTop;

    setThumbHeight(calculatedHeight);
    setThumbTop(calculatedTop);
  }, []);

  useEffect(() => {
    let animFrame: number;

    const handleScroll = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Handle document size mutations
    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });
    resizeObserver.observe(document.body);
    resizeObserver.observe(document.documentElement);

    // Initial calculation
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(animFrame);
    };
  }, [updateScroll]);

  // Pointer drag handling on the thumb
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    isDraggingRef.current = true;
    startDragYRef.current = e.clientY;
    startScrollTopRef.current = window.scrollY || document.documentElement.scrollTop;

    setIsDragging(true);

    if (thumbRef.current) {
      thumbRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !trackRef.current) return;

    const deltaY = e.clientY - startDragYRef.current;
    const trackHeight = trackRef.current.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTop = trackHeight - thumbHeight;

    if (maxThumbTop <= 0) return;

    // Convert pixel delta on track to document scroll pixels
    const scrollDelta = (deltaY / maxThumbTop) * maxScroll;
    const targetScroll = Math.max(0, Math.min(maxScroll, startScrollTopRef.current + scrollDelta));

    window.scrollTo({
      top: targetScroll,
      behavior: 'auto',
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);

      if (thumbRef.current && thumbRef.current.hasPointerCapture(e.pointerId)) {
        thumbRef.current.releasePointerCapture(e.pointerId);
      }
    }
  };

  // Click directly on the track to jump/seek
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current || !trackRef.current) return;

    // If click was on the thumb itself, ignore
    if (e.target === thumbRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const maxScroll = scrollHeight - clientHeight;

    const targetProgress = Math.max(0, Math.min(1, (clickY - thumbHeight / 2) / (trackHeight - thumbHeight)));
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={trackRef}
      className={`custom-scrollbar-track ${isDragging ? 'is-dragging' : ''} ${isHovered ? 'is-hovered' : ''}`}
      onClick={handleTrackClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <div
        ref={thumbRef}
        className="custom-scrollbar-thumb"
        style={{
          height: `${thumbHeight}px`,
          transform: `translate3d(0, ${thumbTop}px, 0)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    </div>
  );
};
