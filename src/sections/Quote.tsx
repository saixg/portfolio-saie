import { Reveal } from '../components/motion';
import { MeAvatar } from '../components/ui';
import { BIG_QUOTE } from '../data';

export default function Quote() {
  return (
    <section className="bg-bg py-8 md:py-[60px]">
      <div className="shell">
        <Reveal y={20}>
          <figure className="flex flex-col items-center gap-8 p-6">
            <blockquote className="max-w-[780px] text-center text-[22px] leading-[30.8px] text-ink-400 md:text-[28px] md:leading-[39.2px]">
              {BIG_QUOTE.quote}
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <MeAvatar size={44} />
              <div className="flex flex-col gap-1.5">
                <span className="text-base font-medium leading-5 text-ink-50">{BIG_QUOTE.author}</span>
                <span className="text-[13px] leading-[14.56px] tracking-[-0.01em] text-ink-400">{BIG_QUOTE.title}</span>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
