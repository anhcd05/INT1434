import { useEffect, useMemo, useRef, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { formatTime, makePeaks } from '../utils/format';
import Avatar from './Avatar';

// Dạng sóng đối xứng qua đường giữa. Bấm để tua, di chuột để xem trước thời điểm,
// bình luận hiển thị thành các điểm vàng dọc theo đáy.
export default function Waveform({ track, queue, bars: maxBars = 96, height = 60, comments = [], showComments = false, big = false }) {
  const { isCurrent, progress, playTrack, seek } = usePlayer();
  const ref = useRef(null);
  const [bars, setBars] = useState(maxBars);
  const peaks = useMemo(() => makePeaks(track.id, bars), [track.id, bars]);
  const [hover, setHover] = useState(null);
  const [activeComment, setActiveComment] = useState(null);

  // Giảm số cột khi khung hẹp (điện thoại) để mỗi cột luôn rộng ít nhất ~3px
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const fit = Math.floor(entry.contentRect.width / (big ? 5 : 4));
      setBars(Math.max(24, Math.min(maxBars, fit)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxBars, big]);
  const current = isCurrent(track.id);
  const ratio = current ? Math.min(1, progress / track.duration) : 0;

  const posFromEvent = (e) => {
    const r = ref.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  };

  const jumpTo = (x) => {
    const sec = Math.floor(x * track.duration);
    if (current) seek(sec);
    else playTrack(track, queue, sec);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const base = current ? progress : 0;
      jumpTo((base + (e.key === 'ArrowRight' ? 5 : -5)) / track.duration);
    }
  };

  return (
    <div className={`wave ${big ? 'wave--big' : ''} ${current ? 'is-current' : ''}`}>
      <div
        ref={ref}
        className="wave__track"
        style={{ height }}
        role="slider"
        tabIndex={0}
        aria-label={`Tua bài ${track.title}`}
        aria-valuemin={0}
        aria-valuemax={track.duration}
        aria-valuenow={current ? progress : 0}
        aria-valuetext={formatTime(current ? progress : 0)}
        onClick={(e) => jumpTo(posFromEvent(e))}
        onMouseMove={(e) => setHover(posFromEvent(e))}
        onMouseLeave={() => setHover(null)}
        onKeyDown={onKey}
      >
        {peaks.map((p, i) => {
          const pos = (i + 0.5) / bars;
          let state = '';
          if (pos <= ratio) state = 'is-played';
          else if (hover !== null && pos <= hover) state = 'is-hover';
          return <span key={i} className={`wave__bar ${state}`} style={{ height: `${Math.round(p * 100)}%` }} />;
        })}
        {current && <span className="wave__stamp wave__stamp--now">{formatTime(progress)}</span>}
        <span className="wave__stamp wave__stamp--end">{formatTime(track.duration)}</span>
        {hover !== null && (
          <span className="wave__cursor" style={{ left: `${hover * 100}%` }}>
            <span>{formatTime(hover * track.duration)}</span>
          </span>
        )}
      </div>

      {showComments && comments.length > 0 && (
        <div className="wave__pins">
          {comments.map((c) => (
            <button
              key={c.id}
              type="button"
              className="wave__pin"
              style={{ left: `${(c.at / track.duration) * 100}%` }}
              onMouseEnter={() => setActiveComment(c.id)}
              onMouseLeave={() => setActiveComment(null)}
              onFocus={() => setActiveComment(c.id)}
              onBlur={() => setActiveComment(null)}
              onClick={() => jumpTo(c.at / track.duration)}
              aria-label={`${c.user} bình luận ở ${formatTime(c.at)}: ${c.text}`}
            >
              <Avatar name={c.user} size={big ? 22 : 16} />
              {activeComment === c.id && (
                <span className="wave__bubble">
                  <strong>{c.user}</strong> ở {formatTime(c.at)}
                  <span>{c.text}</span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
