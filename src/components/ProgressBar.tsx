import React, { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  showLabel = true,
}) => {
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCurrentProgress(clampedProgress);
      hasAnimatedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();
          // Trigger smooth CSS transition
          setTimeout(() => {
            setCurrentProgress(clampedProgress);
          }, 80);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [clampedProgress]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div className="flex items-center justify-between text-xs text-[#555555] mb-1.5">
        <span className="font-sans">Progres Fisik</span>
        <span className="tabular-nums font-mono font-medium text-[#1A1A1A]">
          {currentProgress}%
        </span>
      </div>
      <div
        className="w-full h-1.5 bg-[#E5E5E0] overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-[#00A4B4] transition-all duration-1000 ease-out"
          style={{ width: `${currentProgress}%` }}
        />
      </div>
    </div>
  );
};
