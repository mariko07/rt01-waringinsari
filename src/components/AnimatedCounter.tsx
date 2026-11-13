import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  isCurrency?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1500,
  prefix = '',
  suffix = '',
  className = '',
  isCurrency = false,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Respect user's motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      hasAnimatedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          let startTimestamp: number | null = null;
          const startValue = 0;
          const endValue = value;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);

            // Natural ease-out cubic curve
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startValue + (endValue - startValue) * easeOut);

            setDisplayValue(current);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setDisplayValue(endValue);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  const formattedNumber = new Intl.NumberFormat('id-ID').format(displayValue);

  return (
    <span
      ref={elementRef}
      className={`tabular-nums font-sans font-bold tracking-tight ${className}`}
      aria-label={`${prefix}${new Intl.NumberFormat('id-ID').format(value)}${suffix}`}
    >
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
