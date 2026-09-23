import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { getArtist } from '../data/mock';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';
import { formatCount, formatTime } from '../utils/format';
import Cover from './Cover';
import PlayButton from './PlayButton';

// Dòng bài hát gọn dùng cho bảng xếp hạng, playlist, thư viện
export default function TrackListItem({ track, index, queue, showPlays = true }) {
  const artist = getArtist(track.artistId);
  const { isCurrent } = usePlayer();
  const { isLiked, toggleLike } = useLibrary();
  const liked = isLiked(track.id);
  return (
    <li className={`tli ${isCurrent(track.id) ? 'is-current' : ''}`}>
      {index !== undefined && <span className="tli__index">{index}</span>}
      <div className="tli__art">
        <Cover seed={track.id} />
        <span className="tli__play"><PlayButton track={track} queue={queue} size={30} variant="ghost" /></span>
      </div>
      <div className="tli__titles">
        <Link to={`/track/${track.id}`} className="tli__title">{track.title}</Link>
        <Link to={`/artist/${artist.id}`} className="tli__artist">{artist.name}</Link>
      </div>
      {showPlays && <span className="tli__plays">{formatCount(track.plays)} lượt nghe</span>}
      <button
        type="button"
        className={`icon-btn ${liked ? 'is-like' : ''}`}
        aria-pressed={liked}
        aria-label={liked ? 'Bỏ thích' : 'Thích'}
        onClick={() => toggleLike(track.id)}
      >
        <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
      </button>
      <span className="tli__dur">{formatTime(track.duration)}</span>
    </li>
  );
}
