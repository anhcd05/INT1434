import { hashString, initials } from '../utils/format';

const TONES = ['#2E3BFF', '#E8453C', '#00A896', '#7A3CFF', '#D97706', '#DB2777', '#0F5F58', '#1D2150'];

export default function Avatar({ name = '', size = 36, ring = false }) {
  const bg = TONES[hashString(name) % TONES.length];
  return (
    <span
      className={`avatar ${ring ? 'avatar--ring' : ''}`}
      style={{ width: size, height: size, background: bg, fontSize: Math.max(10, size * 0.38) }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
