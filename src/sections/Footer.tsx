import { Reveal } from '../components/motion';
import { FitText, TextCycle } from '../components/type';
import { SocialLinks } from '../components/ui';
import { CYCLE_WORDS, NAV_LINKS, PROFILE } from '../data';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg">
      <div className="shell flex flex-col gap-6 pb-[211px] pt-11">
        <div className="flex flex-col gap-12 pb-6">
          <Reveal className="flex flex-col gap-1">
            <h2 className="section-heading flex flex-wrap items-center gap-x-5 text-ink-50">
              Let’s
              <TextCycle
                words={CYCLE_WORDS}
                className="font-script text-[46px] font-normal leading-[0.95] tracking-[0.03em] text-accent md:text-[62px]"
              />
            </h2>
            <p className="section-heading text-ink-100">something intelligent together.</p>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-8 sm:grid-cols-3 sm:gap-[33px]">
            <div className="flex flex-col gap-2">
              <p className="text-base leading-[17.92px] text-ink-500">Email</p>
              <a href={`mailto:${PROFILE.email}`} className="break-all text-xl leading-7 text-ink-50 transition-colors hover:text-accent">
                {PROFILE.email}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base leading-[17.92px] text-ink-500">Resume</p>
              <a href={PROFILE.resume} download className="text-xl leading-7 text-ink-50 transition-colors hover:text-accent">
                Download PDF
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-base leading-[17.92px] text-ink-500">Elsewhere</p>
              <SocialLinks tone="accent" />
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-[18px]">
          <p className="text-base leading-[17.92px] text-ink-500">Menu</p>
          <div className="flex gap-9">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-xl leading-7 text-ink-50 transition-colors hover:text-accent">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <FitText text={PROFILE.wordmark} className="mt-6 font-display font-bold tracking-[-0.03em] text-accent" />
      </div>
    </footer>
  );
}
