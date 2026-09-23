// Các hàm tiện ích định dạng và sinh dữ liệu giả có tính ổn định (seeded)

export function formatTime(totalSeconds = 0) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
}

// 1200 -> "1,2 N", 3400000 -> "3,4 Tr"
export function formatCount(n = 0) {
  if (n >= 1_000_000) return `${trim(n / 1_000_000)} Tr`;
  if (n >= 1_000) return `${trim(n / 1_000)} N`;
  return String(n);
}
function trim(x) {
  return (x >= 100 ? Math.round(x) : Math.round(x * 10) / 10).toString().replace('.', ',');
}

export function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Bộ sinh số ngẫu nhiên có seed (mulberry32) để dạng sóng / ảnh bìa luôn giống nhau mỗi lần render
export function seededRandom(seed) {
  let a = typeof seed === 'string' ? hashString(seed) : seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makePeaks(seed, count) {
  const rand = seededRandom(seed);
  const phase = rand() * Math.PI * 2;
  const peaks = [];
  let prev = 0.5;
  for (let i = 0; i < count; i++) {
    const x = i / count;
    // đường bao: vào nhẹ, điệp khúc dày, kết thúc nhỏ dần
    const envelope =
      0.38 +
      0.34 * Math.sin(x * Math.PI) +
      0.18 * Math.sin(x * 9 + phase) +
      (x > 0.92 ? -0.25 * ((x - 0.92) / 0.08) : 0);
    const noise = 0.55 + rand() * 0.45;
    const v = Math.min(1, Math.max(0.08, envelope * noise));
    prev = prev * 0.35 + v * 0.65;
    peaks.push(prev);
  }
  return peaks;
}

export function initials(name = '') {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}
