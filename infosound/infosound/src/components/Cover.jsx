import { seededRandom } from '../utils/format';

// Ảnh bìa tạo tự động từ id, không cần ảnh ngoài.
const PALETTES = [
  ['#2E3BFF', '#FFC53D'], ['#FF5C8A', '#2B1B5A'], ['#00A896', '#F4F1BB'], ['#7A3CFF', '#FF9F43'],
  ['#1D2150', '#5CE1E6'], ['#E8453C', '#FFE3B0'], ['#0F5F58', '#B8F2D0'], ['#3B1E54', '#F472B6'],
];

export default function Cover({ seed, size, rounded = 'var(--r-cover)', className = '' }) {
  const rand = seededRandom('cover-' + seed);
  const [a, b] = PALETTES[Math.floor(rand() * PALETTES.length)];
  const variant = Math.floor(rand() * 4);
  const r1 = rand();
  const r2 = rand();
  const style = { borderRadius: rounded, ...(size ? { width: size, height: size } : {}) };

  return (
    <div className={`cover ${className}`} style={style}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="100" height="100" fill={a} />
        {variant === 0 && <circle cx={30 + r1 * 40} cy={35 + r2 * 30} r={34} fill={b} />}
        {variant === 1 &&
          [44, 34, 24, 14].map((r, i) => (
            <circle key={r} cx={20 + r1 * 60} cy={80} r={r} fill="none" stroke={b} strokeWidth={4 + i} opacity={0.9 - i * 0.15} />
          ))}
        {variant === 2 &&
          Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={-20 + i * 18} y={-10} width={7} height={140} fill={b} transform={`rotate(${20 + r1 * 30} 50 50)`} opacity={0.85} />
          ))}
        {variant === 3 &&
          Array.from({ length: 9 }, (_, i) => {
            const h = 18 + Math.abs(Math.sin(i * 1.3 + r2 * 6)) * 60;
            return <rect key={i} x={8 + i * 10} y={50 - h / 2} width={6} height={h} rx={3} fill={b} />;
          })}
      </svg>
    </div>
  );
}
