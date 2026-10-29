import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/** Rotating word that slides vertically and resizes its slot to fit each word. */
export function TextCycle({ words, interval = 2200, className = '' }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const [width, setWidth] = useState<number>();
  const measure = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  useLayoutEffect(() => {
    if (measure.current) setWidth(measure.current.offsetWidth);
  }, [i]);

  return (
    <motion.span
      className={`relative inline-flex h-[1em] items-center overflow-hidden align-baseline ${className}`}
      animate={{ width }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
    >
      <span ref={measure} className="invisible absolute whitespace-nowrap pr-[0.06em]">
        {words[i]}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="whitespace-nowrap"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

/** Text scaled so it exactly fills its container's width (Framer "Fit Text"). */
export function FitText({ text, className = '' }: { text: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const probe = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState(160);

  useEffect(() => {
    const fit = () => {
      if (!box.current || !probe.current) return;
      const natural = probe.current.offsetWidth; // measured at 100px
      if (natural) setSize((100 * box.current.clientWidth) / natural);
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={box} className="relative w-full">
      <span ref={probe} aria-hidden="true" className={`invisible absolute whitespace-nowrap ${className}`} style={{ fontSize: 100 }}>
        {text}
      </span>
      <p className={`whitespace-nowrap ${className}`} style={{ fontSize: size, lineHeight: 1 }}>
        {text}
      </p>
    </div>
  );
}
