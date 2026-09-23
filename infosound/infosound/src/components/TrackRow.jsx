import { Link } from 'react-router-dom';
import { Headphones, MessageCircle, Repeat2 } from 'lucide-react';
import { commentsForTrack, getArtist } from '../data/mock';
import { formatCount } from '../utils/format';
import Cover from './Cover';
import PlayButton from './PlayButton';
import Waveform from './Waveform';
import TrackActions from './TrackActions';

// Thẻ bài hát đầy đủ dùng trong bảng tin: ảnh bìa, tiêu đề, dạng sóng có bình luận, hành động
export default function TrackRow({ track, queue, context }) {
  const artist = getArtist(track.artistId);
  const comments = commentsForTrack(track.id);
  return (
    <article className="trow">
      {context && (
        <p className="trow__context">
          {context.type === 'repost' && <Repeat2 size={14} />}
          <Link to={`/artist/${context.by.id}`}>{context.by.name}</Link>
          <span>{context.type === 'repost' ? 'đã đăng lại' : 'đã đăng một bài hát'}</span>
          <span className="muted">{context.ago}</span>
        </p>
      )}
      <div className="trow__main">
        <Link to={`/track/${track.id}`} className="trow__cover" tabIndex={-1} aria-hidden="true">
          <Cover seed={track.id} />
        </Link>
        <div className="trow__body">
          <div className="trow__head">
            <PlayButton track={track} queue={queue} size={46} />
            <div className="trow__titles">
              <Link to={`/artist/${artist.id}`} className="trow__artist">{artist.name}</Link>
              <Link to={`/track/${track.id}`} className="trow__title">{track.title}</Link>
            </div>
            <div className="trow__side">
              <span className="muted">{track.uploaded}</span>
              <Link to={`/search?genre=${encodeURIComponent(track.genre)}`} className="tag">{track.genre}</Link>
            </div>
          </div>
          <Waveform track={track} queue={queue} comments={comments} showComments bars={110} height={58} />
          <div className="trow__foot">
            <TrackActions track={track} />
            <div className="trow__stats">
              <span title="Lượt nghe"><Headphones size={14} /> {formatCount(track.plays)}</span>
              <Link to={`/track/${track.id}`} state={{ focus: 'comments' }} title="Bình luận"><MessageCircle size={14} /> {comments.length}</Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
