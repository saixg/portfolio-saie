import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useAnimationFrame } from 'framer-motion';

type TickerProps = {
  children: ReactNode;
  /** Pixels per second, leftward. The reference runs at ~50px/s. */
  speed?: number;
  gap?: number;
  className?: string;
  pauseOnHover?: boolean;
};

/**
 * Seamless horizontal marquee. Renders the content twice and wraps the offset
 * after one full copy, so the loop has no visible seam. Pauses off-screen.
 */
export default function Ticker({ children, speed = 50, gap = 16, className = '', pauseOnHover = false }: TickerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const visible = useRef(true);
  const hovered = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const node = viewportRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!visible.current || reduced.current || (pauseOnHover && hovered.current)) return;
    const copyWidth = (firstCopyRef.current?.offsetWidth ?? 0) + gap;
    if (!copyWidth || !trackRef.current) return;
    offset.current -= (speed * Math.min(delta, 64)) / 1000;
    if (-offset.current >= copyWidth) offset.current += copyWidth;
    trackRef.current.style.transform = `translate3d(${offset.current}px,0,0)`;
  });

  return (
    <div
      ref={viewportRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
    >
      <div ref={trackRef} className="flex w-max will-change-transform" style={{ gap }}>
        <div ref={firstCopyRef} className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
