import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Mail, Menu, X } from 'lucide-react';
import { NAV_LINKS, PROFILE } from '../data';
import { GlossButton, MeAvatar } from './ui';
import { EASE_STANDARD } from './motion';

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return y;
}

/**
 * Fixed pill nav. 578px with links at the top of the page, collapses to a 300px
 * pill with a menu button once scrolled; hovering or tapping re-expands it.
 */
export function Navbar() {
  const y = useScrollY();
  const [hover, setHover] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const expanded = y < 60 || hover;

  return (
    <motion.header
      initial={{ opacity: 0.001, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_STANDARD }}
      className="fixed inset-x-0 top-6 z-[9] flex justify-center px-6"
    >
      {/* desktop / tablet */}
      <motion.nav
        layout
        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="glass hairline hidden items-center justify-between rounded-[32px] p-3 [--hairline:rgba(184,184,184,0.12)] md:flex"
        style={{ width: expanded ? 578 : 300 }}
      >
        <a href="#top" className="flex items-center gap-2">
          <MeAvatar size={32} />
          <span className="text-base font-semibold leading-[17.92px] text-ink-50">{PROFILE.name}</span>
        </a>

        <AnimatePresence mode="popLayout" initial={false}>
          {expanded ? (
            <motion.div
              key="links"
              className="flex items-center gap-5"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
            >
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-base leading-[17.92px] text-ink-200 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <GlossButton className="h-[34px] px-3">
                <span className="px-1.5 text-base leading-[17.92px]">Contact</span>
              </GlossButton>
            </motion.div>
          ) : (
            <motion.span
              key="menu"
              className="mr-1 grid h-8 w-8 place-items-center text-ink-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <Menu size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* phone */}
      <div className="w-full md:hidden">
        <nav className="glass hairline flex h-14 items-center justify-between rounded-[32px] p-3 [--hairline:rgba(184,184,184,0.12)]">
          <a href="#top" className="flex items-center gap-2">
            <MeAvatar size={32} />
            <span className="text-base font-semibold text-ink-50">{PROFILE.name}</span>
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center text-ink-200"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass hairline mt-2 flex flex-col gap-1 rounded-3xl p-3 [--hairline:rgba(184,184,184,0.12)]"
            >
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-3 py-3 text-base text-ink-200 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <GlossButton className="mt-1 h-11 justify-center" href="#contact">
                <span className="text-base">Contact</span>
              </GlossButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function DockAction({
  icon,
  label,
  href,
  tone,
  download = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  tone: 'accent' | 'dark';
  download?: boolean;
}) {
  return (
    <a
      href={href}
      download={download || undefined}
      aria-label={label}
      className={`group flex h-10 min-w-10 items-center gap-1.5 overflow-hidden rounded-3xl p-2 text-white ${
        tone === 'accent' ? 'gloss-accent' : 'bg-raised'
      }`}
    >
      <span className="grid h-6 w-6 shrink-0 place-items-center">{icon}</span>
      <span className="max-w-0 whitespace-nowrap text-[13px] leading-[14.56px] tracking-[-0.01em] opacity-0 transition-all duration-300 group-hover:max-w-[90px] group-hover:pr-1 group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}

/** Floating contact dock, shown once the hero is scrolled past. */
export function Dock() {
  const y = useScrollY();
  const show = y > 480;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-[37px] z-[9] flex justify-center px-4"
        >
          <div className="glass hairline flex h-16 items-center gap-6 rounded-[48px] py-3 pl-6 pr-3 [--hairline:rgba(184,184,184,0.12)]">
            <div>
              <p className="text-base font-medium leading-6 tracking-[-0.02em] text-ink-50">Speak to me</p>
              <p className="text-[13px] leading-[14.56px] tracking-[-0.01em] text-ink-400">Email or grab my resume</p>
            </div>
            <div className="flex gap-2">
              <DockAction tone="accent" href={`mailto:${PROFILE.email}`} label="Email" icon={<Mail size={17} />} />
              <DockAction tone="dark" href={PROFILE.resume} download label="Resume" icon={<FileText size={17} />} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** 16px crimson dot that trails the pointer, blended with `exclusion`. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;
    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x - 8}px, ${pos.y - 8}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[13] h-4 w-4 rounded-3xl bg-accent mix-blend-exclusion will-change-transform"
    />
  );
}

/**
 * Framer's progressive blur: eight stacked backdrop-blur layers, each doubling
 * the radius and masked to its own 12.5% band, so blur ramps up towards the bottom.
 */
export function ProgressiveBlur() {
  const layers = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-[5] h-[205px]">
      {layers.map((i) => {
        const s = (n: number) => `${Math.min(100, Math.max(0, n * 12.5))}%`;
        const mask = `linear-gradient(to bottom, transparent ${s(i)}, #000 ${s(i + 1)}, #000 ${s(i + 2)}, transparent ${s(i + 3)})`;
        const blur = `blur(${0.0390625 * 2 ** i}px)`;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{ backdropFilter: blur, WebkitBackdropFilter: blur, maskImage: mask, WebkitMaskImage: mask }}
          />
        );
      })}
    </div>
  );
}
