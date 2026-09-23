import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BadgeCheck, Headphones, Heart, MessageCircle, Repeat2, Send } from 'lucide-react';
import {
  commentsForTrack, currentUser, getArtist, getTrack, playlistsWithTrack, tracks, tracksByArtist,
} from '../data/mock';
import { usePlayer } from '../context/PlayerContext';
import { formatCount, formatTime } from '../utils/format';
import Cover from '../components/Cover';
import Avatar from '../components/Avatar';
import PlayButton from '../components/PlayButton';
import Waveform from '../components/Waveform';
import TrackActions from '../components/TrackActions';
import FollowButton from '../components/FollowButton';
import TrackListItem from '../components/TrackListItem';
import NotFound from './NotFound';

export default function Track() {
  const { id } = useParams();
  const location = useLocation();
  const track = getTrack(id);
  const { isCurrent, progress, seek, playTrack } = usePlayer();
  const [extra, setExtra] = useState([]);
  const [text, setText] = useState('');
  const commentsRef = useRef(null);

  useEffect(() => {
    setExtra([]);
    if (location.state?.focus === 'comments') {
      setTimeout(() => commentsRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [id, location.state]);

  if (!track) return <NotFound />;

  const artist = getArtist(track.artistId);
  const comments = [...commentsForTrack(track.id), ...extra].sort((a, b) => a.at - b.at);
  const at = isCurrent(track.id) ? progress : 0;
  // cùng nghệ sĩ trước, rồi cùng thể loại, cuối cùng lấp đầy bằng bài nổi bật
  const related = [
    ...tracksByArtist(artist.id),
    ...tracks.filter((t) => t.genre === track.genre),
    ...[...tracks].sort((a, b) => b.plays - a.plays),
  ]
    .filter((t, i, arr) => t.id !== track.id && arr.findIndex((x) => x.id === t.id) === i)
    .slice(0, 5);
  const inPlaylists = playlistsWithTrack(track.id);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setExtra((list) => [
      ...list,
      { id: `new-${Date.now()}`, trackId: track.id, user: currentUser.name, text: text.trim(), at, ago: 'vừa xong' },
    ]);
    setText('');
  };

  const jump = (sec) => (isCurrent(track.id) ? seek(sec) : playTrack(track, undefined, sec));

  return (
    <div className="page">
      <section className="thero">
        <div className="thero__top">
          <PlayButton track={track} size={64} />
          <div className="thero__titles">
            <h1 className="thero__title">{track.title}</h1>
            <Link to={`/artist/${artist.id}`} className="thero__artist">
              {artist.name}
              {artist.verified && <BadgeCheck size={16} className="verified" aria-label="Đã xác minh" />}
            </Link>
          </div>
          <div className="thero__meta">
            <span>{track.uploaded}</span>
            <Link to={`/search?genre=${encodeURIComponent(track.genre)}`} className="tag tag--light">{track.genre}</Link>
          </div>
          <div className="thero__cover"><Cover seed={track.id} /></div>
        </div>
        <Waveform track={track} comments={comments} showComments big bars={160} height={96} />
      </section>

      <div className="with-rail">
        <div>
          <form className="composer" onSubmit={submit}>
            <Avatar name={currentUser.name} size={36} />
            <label className="sr-only" htmlFor="comment">Viết bình luận</label>
            <input
              id="comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Bình luận ở ${formatTime(at)}`}
              maxLength={280}
            />
            <button type="submit" className="btn btn--primary btn--sm" disabled={!text.trim()}>
              <Send size={15} /> Gửi
            </button>
          </form>

          <div className="track-bar">
            <TrackActions track={track} />
            <div className="trow__stats">
              <span><Headphones size={14} /> {formatCount(track.plays)}</span>
              <span><Heart size={14} /> {formatCount(track.likes)}</span>
              <span><Repeat2 size={14} /> {formatCount(track.reposts)}</span>
            </div>
          </div>

          <div className="track-info">
            <div className="track-info__artist">
              <Link to={`/artist/${artist.id}`}><Avatar name={artist.name} size={96} /></Link>
              <Link to={`/artist/${artist.id}`} className="acard__name">{artist.name}</Link>
              <span className="muted">{formatCount(artist.followers)} người theo dõi</span>
              <FollowButton artistId={artist.id} small />
            </div>
            <div className="track-info__text">
              <p className="prose">{track.description}</p>
              <div className="chips">
                {track.tags.map((t) => (
                  <Link key={t} to={`/search?q=${encodeURIComponent(t)}`} className="chip chip--outline">#{t}</Link>
                ))}
              </div>

              <div className="comments" ref={commentsRef}>
                <h2 className="h-small"><MessageCircle size={16} /> {comments.length} bình luận</h2>
                <ul>
                  {comments.map((c) => (
                    <li key={c.id} className="comment">
                      <Avatar name={c.user} size={36} />
                      <div>
                        <p className="comment__head">
                          <strong>{c.user}</strong>
                          <span className="muted">ở</span>
                          <button type="button" className="comment__time" onClick={() => jump(c.at)} aria-label={`Nghe từ ${formatTime(c.at)}`}>
                            {formatTime(c.at)}
                          </button>
                        </p>
                        <p>{c.text}</p>
                      </div>
                      <span className="muted comment__ago">{c.ago}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <aside className="rail">
          <div className="rail__block">
            <h2 className="rail__title">Bài hát liên quan</h2>
            <ol className="tlist tlist--dense">
              {related.map((t) => <TrackListItem key={t.id} track={t} queue={related} showPlays={false} />)}
            </ol>
          </div>
          {inPlaylists.length > 0 && (
            <div className="rail__block">
              <h2 className="rail__title">Có trong playlist</h2>
              <ul className="mini-list">
                {inPlaylists.map((p) => (
                  <li key={p.id}>
                    <Link to={`/playlist/${p.id}`}>
                      <Cover seed={p.id} size={40} />
                      <span>
                        <strong>{p.title}</strong>
                        <small>{p.trackIds.length} bài hát</small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
