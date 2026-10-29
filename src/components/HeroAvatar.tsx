import { useEffect, useState } from 'react';

const SRC = `${import.meta.env.BASE_URL}avatar-cutout.webp`;

type HeroAvatarProps = {
  className?: string;
  /** Mouse-parallax tilt strength in degrees. 0 (default) keeps it static like the reference. */
  tilt?: number;
  priority?: boolean;
};

/**
 * Background-removed 3D avatar. Only the bottom edge is faded, so the shirt
 * dissolves into the page instead of ending on a hard line.
 */
export default function HeroAvatar({ className = '', tilt = 0, priority = false }: HeroAvatarProps) {
  const [transform, setTransform] = useState('');

  useEffect(() => {
    if (!tilt) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let frame = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const tick = () => {
      frame = requestAnimationFrame(tick);
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      setTransform(`perspective(900px) rotateY(${current.x * tilt}deg) rotateX(${-current.y * tilt * 0.6}deg)`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    tick();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [tilt]);

  const fade = 'linear-gradient(to bottom, #000 78%, transparent 100%)';

  return (
    <div className={className}>
      <img
        src={SRC}
        alt="3D avatar of G. Sai Gireesh Reddy"
        width={1000}
        height={1000}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // React 18 passes this through only in lowercase form
        {...{ fetchpriority: priority ? 'high' : 'auto' }}
        draggable={false}
        className="block w-full select-none"
        style={{
          transform: transform || undefined,
          WebkitMaskImage: fade,
          maskImage: fade,
          filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.45))',
        }}
      />
    </div>
  );
}
