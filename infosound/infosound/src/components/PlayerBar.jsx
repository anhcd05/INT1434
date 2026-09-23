import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ListMusic, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';
import { getArtist } from '../data/mock';
import { formatTime } from '../utils/format';
import Cover from './Cover';

export default function PlayerBar() {
  const p = usePlayer();
  const { isLiked, toggleLike } = useLibrary();
  const barRef = useRef(null);
  const t = p.current;
  if (!t) return null;
  const artist = getArtist(t.artistId);
  const pct = (p.progress / t.duration) * 100;
  const liked = isLiked(t.id);

  const seekFromEvent = (e) => {
    const r = barRef.current.getBoundingClientRect();
    p.seek(Math.floor(((e.clientX - r.left) / r.width) * t.duration));
  };

  return (
    <div className="player" role="region" aria-label="Trình phát nhạc">
      <div
        className="player__progress"
        ref={barRef}
        onClick={seekFromEvent}
        role="slider"
        tabIndex={0}
        aria-label="Tiến độ bài hát"
        aria-valuemin={0}
        aria-valuemax={t.duration}
        aria-valuenow={p.progress}
        aria-valuetext={`${formatTime(p.progress)} trên ${formatTime(t.duration)}`}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') p.seek(p.progress + 5);
          if (e.key === 'ArrowLeft') p.seek(p.progress - 5);
        }}
      >
        <span style={{ width: `${pct}%` }} />
      </div>

      <div className="player__inner">
        <div className="player__now">
          <Link to={`/track/${t.id}`} className="player__cover"><Cover seed={t.id} /></Link>
          <div className="player__titles">
            <Link to={`/track/${t.id}`} className="player__title">{t.title}</Link>
            <Link to={`/artist/${artist.id}`} className="player__artist">{artist.name}</Link>
          </div>
          <button
            type="button"
            className={`icon-btn ${liked ? 'is-like' : ''}`}
            aria-pressed={liked}
            aria-label={liked ? 'Bỏ thích' : 'Thích'}
            onClick={() => toggleLike(t.id)}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="player__controls">
          <button type="button" className={`icon-btn ${p.shuffle ? 'is-on' : ''}`} aria-pressed={p.shuffle} aria-label="Phát ngẫu nhiên" onClick={() => p.setShuffle(!p.shuffle)}>
            <Shuffle size={17} />
          </button>
          <button type="button" className="icon-btn" aria-label="Bài trước" onClick={p.prev}><SkipBack size={19} fill="currentColor" /></button>
          <button type="button" className="player__main" aria-label={p.isPlaying ? 'Tạm dừng' : 'Phát'} onClick={() => p.toggle()}>
            {p.isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="playbtn__play" />}
          </button>
          <button type="button" className="icon-btn" aria-label="Bài tiếp theo" onClick={p.next}><SkipForward size={19} fill="currentColor" /></button>
          <button type="button" className={`icon-btn ${p.repeat ? 'is-on' : ''}`} aria-pressed={p.repeat} aria-label="Lặp lại bài này" onClick={() => p.setRepeat(!p.repeat)}>
            <Repeat size={17} />
          </button>
          <span className="player__time">{formatTime(p.progress)} / {formatTime(t.duration)}</span>
        </div>

        <div className="player__extra">
          <button type="button" className="icon-btn" aria-label={p.muted ? 'Bật tiếng' : 'Tắt tiếng'} onClick={() => p.setMuted(!p.muted)}>
            {p.muted || p.volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={p.muted ? 0 : p.volume}
            onChange={(e) => {
              p.setVolume(Number(e.target.value));
              p.setMuted(false);
            }}
            className="player__volume"
            aria-label="Âm lượng"
            style={{ '--fill': `${(p.muted ? 0 : p.volume) * 100}%` }}
          />
          <Link to="/library?tab=history" className="icon-btn" aria-label="Lịch sử nghe"><ListMusic size={18} /></Link>
        </div>
      </div>
    </div>
  );
}
