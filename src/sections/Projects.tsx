import { ArrowUpRight } from 'lucide-react';
import Artwork from '../components/Artwork';
import { Reveal, SplitHeading } from '../components/motion';
import { PROFILE, PROJECTS } from '../data';

export default function Projects() {
  return (
    <section id="work" className="bg-bg py-12 md:py-[75px]">
      <div className="mx-auto flex w-full max-w-shell flex-col gap-[60px] px-[22px] md:px-9">
        <SplitHeading text="Latest *Projects*" className="section-heading text-ink" />

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} y={20}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-3">
                <div className="relative aspect-[492/369] overflow-hidden rounded-3xl bg-surface">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <Artwork
                      tint={p.tint}
                      seed={i}
                      className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold leading-[26px] text-ink-50">{p.title}</h3>
                    <p className="text-[13px] leading-[14.56px] tracking-[-0.01em] text-ink-400">{p.tagline}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-[13px] leading-[14.56px] tracking-[-0.01em] text-ink-400 transition-colors group-hover:text-white">
                    <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    View Project
                  </span>
                </div>
                <p className="text-base leading-6 text-ink-400">{p.summary}</p>
                <p className="text-[13px] leading-[14.56px] tracking-[-0.01em] text-ink-500">{p.meta}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto flex w-fit items-center gap-1 text-xl leading-7 text-ink-500 transition-colors hover:text-ink-50">
            <span className="relative">
              View all on GitHub
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
