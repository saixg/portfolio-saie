import { motion } from 'framer-motion';
import { Shapes } from 'lucide-react';
import ToolIcon from '../components/ToolIcon';
import { EASE_STANDARD, SplitHeading } from '../components/motion';
import { SERVICES, TOOLS } from '../data';

// Entry tilt per card, matching the reference: ±30° for the first pair, ±20° after.
const TILT = [30, -30, 20, -20, -20];
// Tool tiles slide in from the left, staggered tightly so all 20 land in about the time the reference's 7 did.
const toolEntry = (i: number) => ({ x: -5 - (i % 5) * 5, d: i * 0.03 });

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const accent = index % 2 === 1;

  return (
    <div className="sticky top-[100px] md:top-[180px]">
      <motion.article
        initial={{ rotate: TILT[index], y: 170 }}
        whileInView={{ rotate: 0, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: 'spring', stiffness: 90, damping: 17, mass: 0.9 }}
        className={`flex min-h-[280px] flex-col rounded-3xl p-5 ${
          accent ? 'bg-accent text-white' : 'card-shadow hairline bg-bg'
        }`}
      >
        <div className="flex items-center gap-4">
          <Shapes size={32} strokeWidth={1.6} className={accent ? 'text-white' : 'text-accent'} />
          <h3 className="font-display text-[28px] font-bold leading-8 tracking-[-0.04em] text-ink md:text-[32px]">
            {service.title}
          </h3>
        </div>
        <p className={`mt-1 text-lg leading-[23.4px] md:text-xl md:leading-[26px] ${accent ? 'text-white' : 'text-ink-400'}`}>
          {service.body}
        </p>
        <ul className="mt-auto flex flex-wrap gap-x-2 gap-y-[9px] pt-6">
          {service.tags.map((t) => (
            <li
              key={t}
              className={`hairline rounded-[100px] px-4 py-2 text-[15px] leading-[22.4px] text-ink-100 md:text-base ${
                accent ? '[--hairline:rgba(255,255,255,0.45)]' : 'bg-bg'
              }`}
            >
              {t}
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-bg py-12 md:py-[60px]">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,400px)] md:gap-[10px] md:px-2 lg:grid-cols-[minmax(0,523px)_442px]">
          {/* left: heading + tools, pinned while the cards stack */}
          <div className="flex flex-col gap-[54px] self-start md:sticky md:top-[180px]">
            <SplitHeading text={'What I\n*build.*'} className="section-heading text-ink-100" />
            <div className="flex flex-col gap-4">
              <p className="text-xl leading-[26px] text-ink-400">Tools I work with</p>
              <ul className="flex flex-wrap gap-2">
                {TOOLS.map((tool, i) => (
                  <motion.li
                    key={tool.key}
                    initial={{ opacity: 0, x: toolEntry(i).x }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: toolEntry(i).d, duration: 0.6, ease: EASE_STANDARD }}
                    className="group relative"
                  >
                    <span
                      tabIndex={0}
                      aria-label={tool.label}
                      className="card-shadow hairline grid h-[60px] w-[60px] place-items-center rounded-[13px] bg-bg text-ink-200 outline-none transition-colors duration-200 hover:text-white focus-visible:text-white"
                    >
                      <ToolIcon tool={tool.key} />
                    </span>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-ink-50 px-2 py-1 text-[13px] leading-[14.56px] text-bg opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {tool.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* right: cards that pin at the same offset and pile on top of each other */}
          <div className="flex flex-col gap-[54px] pb-[120px]">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
