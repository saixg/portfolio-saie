import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Easing curves lifted from the reference site's appear-animation config. */
export const EASE_IN_OUT = [0.44, 0, 0.56, 1] as const;
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  /** Animate on mount instead of when scrolled into view. */
  onMount?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  x = 0,
  y = 10,
  onMount = false,
}: RevealProps) {
  const target = { opacity: 1, x: 0, y: 0, transition: { delay, duration, ease: EASE_STANDARD } };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.001, x, y }}
      {...(onMount
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, amount: 0.2 } })}
    >
      {children}
    </motion.div>
  );
}

const wordVariants = {
  hidden: { opacity: 0.001, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_IN_OUT } },
};

/**
 * Heading revealed word by word, like Framer's text effect.
 * Markup: `\n` forces a line break, `*text*` renders in the accent colour.
 */
export function SplitHeading({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  onMount = false,
}: {
  text: string;
  as?: 'h1' | 'h2';
  className?: string;
  delay?: number;
  onMount?: boolean;
}) {
  const Tag = as === 'h1' ? motion.h1 : motion.h2;
  const lines = text.split('\n');

  return (
    <Tag
      className={className}
      initial="hidden"
      {...(onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.5 } })}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      aria-label={text.replace(/\*/g, '').replace(/\n/g, ' ')}
    >
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split('*').map((chunk, ci) =>
            chunk
              .split(' ')
              .filter(Boolean)
              .map((word, wi) => (
                <motion.span
                  key={`${ci}-${wi}`}
                  variants={wordVariants}
                  className={`inline-block ${ci % 2 === 1 ? 'text-accent' : ''}`}
                >
                  {word}
                  {' '}
                </motion.span>
              )),
          )}
        </span>
      ))}
    </Tag>
  );
}
