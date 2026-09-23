import { Pause, Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function PlayButton({ track, queue, size = 44, variant = 'solid', label }) {
  const { toggle, isPlayingTrack } = usePlayer();
  const playing = isPlayingTrack(track.id);
  const icon = Math.round(size * 0.42);
  return (
    <button
      type="button"
      className={`playbtn playbtn--${variant}`}
      style={{ width: size, height: size }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(track, queue);
      }}
      aria-label={`${playing ? 'Tạm dừng' : 'Phát'} ${label ?? track.title}`}
    >
      {playing ? <Pause size={icon} fill="currentColor" /> : <Play size={icon} fill="currentColor" className="playbtn__play" />}
    </button>
  );
}
