import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { Reveal, SplitHeading } from '../components/motion';
import { SocialLinks } from '../components/ui';
import { BIO, EXPERIENCE, PROFILE } from '../data';

function HistoryCard({ job }: { job: (typeof EXPERIENCE)[number] }) {
  return (
    <div className="card-shadow rounded-2xl bg-surface p-[18px]">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-[5px]">
          <p className="text-xl font-semibold leading-[30px] tracking-[-0.02em] text-ink-50">{job.org}</p>
          <p className="text-sm leading-[15.68px] tracking-[-0.01em] text-ink-400">{job.role}</p>
        </div>
        <p className="shrink-0 text-sm leading-[15.68px] tracking-[-0.01em] text-ink-400">{job.period}</p>
      </div>
    </div>
  );
}

/** Collapsed: first entry on top with the rest fanned out behind it. Expanded: plain list. */
function WorkHistory() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold leading-[33.6px] text-ink">Experience &amp; achievements</p>
      <div className="flex flex-col items-center gap-8">
        <motion.div layout className={`relative w-full ${open ? 'flex flex-col gap-3' : ''}`}>
          {EXPERIENCE.map((job, i) => {
            const behind = !open && i > 0;
            return (
              <motion.div
                key={job.org}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                className={behind ? 'absolute inset-x-0 top-0' : 'relative'}
                style={{ zIndex: EXPERIENCE.length - i }}
                animate={
                  behind
                    ? { y: 10 * Math.min(i, 2), scale: 1 - 0.05 * Math.min(i, 2), opacity: i > 2 ? 0 : 1 }
                    : { y: 0, scale: 1, opacity: 1 }
                }
              >
                <HistoryCard job={job} />
              </motion.div>
            );
          })}
        </motion.div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex h-9 items-center gap-1 rounded-3xl bg-raised py-3 pl-4 pr-3 text-[13px] leading-[14.56px] text-ink transition-colors hover:bg-[#363636]"
        >
          {open ? 'Show less' : 'Show all'}
          <ChevronDown size={12} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-bg py-12 md:py-[60px]">
      <div className="shell flex flex-col gap-16">
        <SplitHeading text={'Engineering AI\n*that holds up.*'} className="section-heading text-ink" />

        <div className="flex flex-col gap-10 md:flex-row">
          {/* left: portrait card, pinned */}
          <div className="flex shrink-0 flex-col gap-5 self-start md:sticky md:top-[100px] md:w-[300px] lg:w-[370px]">
            <Reveal y={20}>
              <div className="relative aspect-[370/409] overflow-hidden rounded-3xl bg-[#1b2230]">
                <img
                  src={PROFILE.avatar}
                  alt={`3D avatar of ${PROFILE.fullName}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: '50% 30%' }}
                />
                <div className="absolute bottom-3 right-3">
                  <SocialLinks tone="glass" />
                </div>
              </div>
            </Reveal>
            <div className="flex flex-col gap-1.5">
              <p className="text-2xl font-bold leading-[33.6px] text-ink">{PROFILE.fullName}</p>
              <p className="text-xl leading-[28.4px] text-ink-400">{PROFILE.role}</p>
              <p className="flex items-center gap-1.5 text-base leading-6 text-ink-500">
                <MapPin size={15} className="text-accent" />
                {PROFILE.location}
              </p>
            </div>
          </div>

          {/* right: bio, signature, history */}
          <div className="flex min-w-0 flex-1 flex-col gap-14">
            <div className="flex flex-col gap-[30px]">
              <Reveal className="flex flex-col gap-5">
                {BIO.map((p) => (
                  <p key={p.slice(0, 20)} className="text-lg leading-[23.4px] text-ink-400 md:text-xl md:leading-[26px]">
                    {p}
                  </p>
                ))}
              </Reveal>
              <motion.p
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                className="w-fit -rotate-6 font-script text-[52px] leading-[63px] text-accent"
                aria-label={`Signed, ${PROFILE.signature}`}
              >
                {PROFILE.signature}
              </motion.p>
            </div>
            <WorkHistory />
          </div>
        </div>
      </div>
    </section>
  );
}
