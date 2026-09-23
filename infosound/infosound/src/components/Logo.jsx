// Logo InfoSound: chữ "i" trở thành cột đầu tiên của một dạng sóng
export default function Logo({ size = 32, withWord = true }) {
  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="var(--signal)" />
        <circle cx="8.6" cy="8.4" r="2.4" fill="var(--tape)" />
        <rect x="7" y="12.5" width="3.2" height="12.5" rx="1.6" fill="#fff" />
        <rect x="12.6" y="9" width="3.2" height="16" rx="1.6" fill="#fff" />
        <rect x="18.2" y="14" width="3.2" height="11" rx="1.6" fill="#fff" />
        <rect x="23.8" y="17.5" width="3.2" height="7.5" rx="1.6" fill="#fff" />
      </svg>
      {withWord && <span className="logo__word">InfoSound</span>}
    </span>
  );
}
