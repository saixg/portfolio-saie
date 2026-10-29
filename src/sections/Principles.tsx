import { FlaskConical, GitBranch, LifeBuoy, Lock, ShieldAlert, ShieldCheck } from 'lucide-react';
import Ticker from '../components/Ticker';
import { SplitHeading } from '../components/motion';
import { PRINCIPLES } from '../data';

// One glyph per principle, in PRINCIPLES order.
const ICONS = [GitBranch, ShieldCheck, Lock, LifeBuoy, FlaskConical, ShieldAlert];

export default function Principles() {
  return (
    <section id="principles" className="bg-bg py-12 md:py-[60px]">
      <div className="shell flex flex-col gap-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SplitHeading text={'How I *build.*'} className="section-heading text-ink" />
          <p className="max-w-[340px] text-lg leading-[23.4px] text-ink-400 md:text-right">
            Rules I hold every system to, and where each one was put to work.
          </p>
        </div>
      </div>

      <Ticker speed={50} gap={16} pauseOnHover className="mt-16">
        {PRINCIPLES.map((p, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <article
              key={p.title}
              className="card-shadow hairline flex h-[345px] w-[320px] shrink-0 flex-col justify-between rounded-[20px] bg-bg px-6 py-[25px] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                <Icon size={26} strokeWidth={1.7} className="text-accent" aria-hidden="true" />
                <h3 className="font-display text-[26px] font-bold leading-[30px] tracking-[-0.03em] text-ink-50">
                  {p.title}
                </h3>
                <p className="text-lg leading-[24px] text-ink-500">{p.body}</p>
              </div>
              <p className="flex items-center gap-2 text-[13px] leading-[14.56px] tracking-[-0.01em] text-ink-400">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Seen in <span className="font-medium text-ink-50">{p.project}</span>
              </p>
            </article>
          );
        })}
      </Ticker>
    </section>
  );
}
