import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';
import { Reveal, SplitHeading } from '../components/motion';
import { GlossButton, MeAvatar } from '../components/ui';
import { BOOK_CALL, FAQS, PROFILE } from '../data';

function PlusMinus({ open }: { open: boolean }) {
  // Two 10×2 bars: a "+" when closed, rotating flat into a "−" when open.
  return (
    <span className="relative grid h-7 w-7 shrink-0 place-items-center" aria-hidden="true">
      <span className="absolute h-0.5 w-2.5 rounded bg-ink-50" />
      <motion.span
        className="absolute h-0.5 w-2.5 rounded bg-ink-50"
        animate={{ rotate: open ? 0 : 90 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </span>
  );
}

function FaqItem({ q, a, index, open, onToggle }: { q: string; a: string; index: number; open: boolean; onToggle: () => void }) {
  const id = `faq-${index}`;
  return (
    <div className="overflow-hidden rounded-2xl bg-surface">
      <button
        type="button"
        id={`${id}-q`}
        aria-expanded={open}
        aria-controls={`${id}-a`}
        onClick={onToggle}
        className="flex min-h-[52px] w-full items-center gap-5 px-4 py-3 text-left"
      >
        <motion.span
          className="shrink-0 overflow-hidden text-base font-medium leading-6 tracking-[-0.02em] text-ink-50"
          animate={{ width: open ? 0 : 18, opacity: open ? 0 : 1, y: open ? -12 : 0, marginRight: open ? -20 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
        <span className="min-w-0 flex-1 text-base font-medium leading-6 tracking-[-0.02em] text-ink-50 md:truncate">{q}</span>
        <PlusMinus open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 34 }}
          >
            <p className="p-4 pt-0 text-base leading-[25.6px] text-ink-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-bg py-12 md:py-[60px]">
      <div className="shell flex flex-col gap-8 md:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-9">
          <SplitHeading text="FAQs" className="section-heading text-ink" />
          <div className="flex flex-col gap-4">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} {...f} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>

        <Reveal y={20} className="self-start md:sticky md:top-[88px] md:w-[360px] lg:w-[422px]">
          <aside id="contact" className="card-shadow flex flex-col gap-8 rounded-3xl bg-accent p-8">
            <div className="flex flex-col gap-6">
              <MeAvatar size={64} />
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-[32px] font-bold leading-8 tracking-[-0.04em] text-ink">
                  {BOOK_CALL.title}
                </h3>
                <p className="text-xl leading-[26px] text-white">
                  {BOOK_CALL.body}
                  <br />
                  <br />
                  {BOOK_CALL.closer[0]}
                  <br />
                  {BOOK_CALL.closer[1]}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <GlossButton variant="dark" href={`mailto:${PROFILE.email}`} className="h-11 w-fit gap-1 px-4 py-2">
                <Mail size={18} />
                <span className="px-1.5 text-base leading-[17.92px]">Email me</span>
              </GlossButton>
              <a
                href={PROFILE.resume}
                download
                className="inline-flex h-11 w-fit items-center gap-1 rounded-3xl bg-white/15 px-4 py-2 text-white transition-colors hover:bg-white/25"
              >
                <FileText size={18} />
                <span className="px-1.5 text-base leading-[17.92px]">View resume</span>
              </a>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
