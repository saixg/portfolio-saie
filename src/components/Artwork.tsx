/** Procedural placeholder artwork standing in for project photography. */
export default function Artwork({
  tint,
  seed,
  className = '',
}: {
  tint: string[];
  seed: number;
  className?: string;
}) {
  const id = `art-${seed}`;

  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tint[0]} />
          <stop offset="100%" stopColor={tint[1]} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="28%" cy="22%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="640" height="400" fill={`url(#${id}-bg)`} />
      <rect width="640" height="400" fill={`url(#${id}-glow)`} />

      <g opacity="0.22" stroke="#FFFFFF" strokeWidth="1.4" fill="none">
        {Array.from({ length: 7 }).map((_, i) => (
          <circle key={i} cx={470 - i * 6} cy={120 + i * 4} r={40 + i * 26} />
        ))}
      </g>

      <g opacity="0.9">
        <rect x="58" y="212" width="96" height="140" rx="12" fill="#0E0E10" opacity="0.55" />
        <rect x="166" y="178" width="110" height="174" rx="14" fill="#0E0E10" opacity="0.4" />
        <rect x="288" y="238" width="78" height="114" rx="10" fill="#0E0E10" opacity="0.5" />
      </g>

      <rect x="0" y="300" width="640" height="100" fill="#000000" opacity="0.28" />
    </svg>
  );
}
