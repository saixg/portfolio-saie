import { motion } from 'framer-motion';
import HeroAvatar from '../components/HeroAvatar';
import Ticker from '../components/Ticker';
import { EASE_IN_OUT, EASE_STANDARD, Reveal } from '../components/motion';
import { CredentialBadge, GlossButton } from '../components/ui';
import { PROFILE, STACK } from '../data';

const word = (delay: number) => ({
  initial: { opacity: 0.001, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: EASE_IN_OUT },
});

export default function Hero() {
  return (
    <section id="top" className="relative bg-bg pt-[120px] md:pt-[92px]">
      <div className="shell relative">
        {/* Headline: BUILD at ~18.9vw, INTELLIGENTLY at ~11.6vw so both lines span the same width; capped at 1265px. */}
        <h1
          className="relative z-10 pt-[10px] text-center font-display font-bold uppercase"
          aria-label="Build intelligently"
        >
          <motion.span
            {...word(0.1)}
            aria-hidden="true"
            className="block text-ink-50"
            style={{
              fontSize: 'clamp(105px, 18.9vw, 239px)',
              lineHeight: 0.8,
              letterSpacing: '-0.04em',
              fontWeight: 600,
            }}
          >
            Build
          </motion.span>
          <motion.span
            {...word(0.25)}
            aria-hidden="true"
            className="block text-accent"
            style={{
              fontSize: 'clamp(36px, min(11.6vw, calc((100vw - 44px) / 6.8)), 147px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              marginTop: '-0.02em',
            }}
          >
            Intelligently
          </motion.span>
        </h1>

        {/* Avatar: in flow on phones (tucked under the headline), centred over it on larger screens. */}
        {/* Positioning lives on a plain div: framer-motion writes `transform`, which would clobber -translate-x-1/2. */}
        <div className="pointer-events-none relative z-20 mx-auto -mt-[72px] w-[min(353px,90vw)] md:absolute md:left-1/2 md:top-[56px] md:mt-0 md:w-[min(480px,38vw)] md:-translate-x-1/2">
          <motion.div
            initial={{ opacity: 0.001, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', duration: 1.3, bounce: 0 }}
          >
            <HeroAvatar priority className="w-full" />
          </motion.div>
        </div>

        <div className="relative z-30 mt-6 flex flex-col items-center gap-4 md:mt-[69px] md:h-[172px] md:flex-row md:items-start md:justify-between md:px-[3px]">
          <Reveal onMount delay={0.4} y={10}>
            <p className="w-[305px] text-center text-[18px] leading-[23.4px] text-ink-400 md:text-left md:text-[20px] md:leading-[26px]">
              {PROFILE.intro}
            </p>
          </Reveal>
          <Reveal onMount delay={0.6} y={10}>
            <GlossButton className="h-11 py-2 pl-[18px] pr-4">
              <span className="text-[13px] leading-[14.56px] md:text-base md:leading-[17.92px]">Let’s work together</span>
            </GlossButton>
          </Reveal>
        </div>
      </div>

      {/* Credential + stack ticker */}
      <div className="py-8">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0.001 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7, ease: EASE_STANDARD }}
            className="flex flex-col items-center gap-8 md:flex-row md:gap-8"
          >
            <CredentialBadge delay={1} />
            <Ticker speed={40} gap={57} className="w-full flex-1 opacity-70 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
              {STACK.map((m) => (
                <span
                  key={m}
                  className="flex h-[30px] shrink-0 items-center whitespace-nowrap font-display text-[19px] font-bold tracking-[-0.02em] text-ink-200"
                >
                  {m}
                </span>
              ))}
            </Ticker>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
