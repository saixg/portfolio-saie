import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import { PROFILE } from '../data';
import { EASE_STANDARD } from './motion';

export function GlossButton({
  children,
  href = '#contact',
  variant = 'accent',
  className = '',
  download = false,
}: {
  children: ReactNode;
  href?: string;
  variant?: 'accent' | 'dark';
  className?: string;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      download={download || undefined}
      className={`inline-flex shrink-0 items-center rounded-3xl text-white transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98] ${
        variant === 'accent' ? 'gloss-accent' : 'gloss-dark'
      } ${className}`}
    >
      {children}
    </a>
  );
}

/** Round crop of the 3D avatar, framed on the face. */
export function MeAvatar({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-full bg-[#1b2230] ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={PROFILE.avatar}
        alt=""
        className="h-full w-full scale-[1.55] object-cover"
        style={{ objectPosition: '50% 34%' }}
        draggable={false}
      />
    </span>
  );
}

/** Location + degree pill that sits beside the stack ticker in the hero. */
export function CredentialBadge({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="flex h-11 shrink-0 items-center gap-3"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: EASE_STANDARD }}
    >
      <MeAvatar size={32} />
      <div className="flex flex-col gap-1.5">
        <p className="flex items-center gap-1 text-[13px] leading-[14.56px] tracking-[-0.01em] text-ink-400">
          <MapPin size={12} className="text-accent" />
          {PROFILE.location}
        </p>
        <p className="text-base leading-[17.92px] text-ink-200">{PROFILE.credential}</p>
      </div>
    </motion.div>
  );
}

const SOCIALS = [
  { label: 'GitHub', href: PROFILE.github, icon: <Github size={14} />, delay: 0 },
  { label: 'LinkedIn', href: PROFILE.linkedin, icon: <Linkedin size={14} />, delay: 0.1 },
  { label: 'Email', href: `mailto:${PROFILE.email}`, icon: <Mail size={14} />, delay: 0.2 },
];

export function SocialLinks({ tone }: { tone: 'glass' | 'accent' }) {
  return (
    <div className="flex gap-1.5">
      {SOCIALS.map((s) => (
        <motion.a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          initial={{ opacity: 0, x: 5 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: s.delay, duration: 0.5, ease: EASE_STANDARD }}
          className={`grid h-[30px] w-[30px] place-items-center rounded-3xl text-white backdrop-blur-[10px] transition-transform duration-200 hover:-translate-y-0.5 ${
            tone === 'accent' ? 'bg-accent' : 'bg-black/50'
          }`}
        >
          {s.icon}
        </motion.a>
      ))}
    </div>
  );
}
