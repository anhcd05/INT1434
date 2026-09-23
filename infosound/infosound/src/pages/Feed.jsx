import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, History } from 'lucide-react';
import { artists, feed, getArtist, getTrack } from '../data/mock';
import { useLibrary } from '../context/LibraryContext';
import { usePlayer } from '../context/PlayerContext';
import TrackRow from '../components/TrackRow';
import ArtistCard from '../components/ArtistCard';
import Tabs from '../components/Tabs';
import Cover from '../components/Cover';
import EmptyState from '../components/EmptyState';

export default function Feed() {
  const [filter, setFilter] = useState('all');
  const { following, liked } = useLibrary();
  const { history } = usePlayer();
  const items = feed.filter((f) => filter === 'all' || f.type === filter);
  const queue = items.map((f) => getTrack(f.trackId));
  const suggestions = artists.filter((a) => a.id !== 'chu-duc-anh' && !following.includes(a.id)).slice(0, 4);
  const recent = history.map(getTrack).filter(Boolean).slice(0, 4);

  return (
    <div className="page with-rail">
      <div>
        <div className="page-head">
          <h1>Bảng tin</h1>
          <p>Bài mới từ {following.length} nghệ sĩ bạn đang theo dõi</p>
        </div>
        <Tabs
          label="Lọc bảng tin"
          value={filter}
          onChange={setFilter}
          tabs={[
            { id: 'all', label: 'Tất cả' },
            { id: 'post', label: 'Bài đăng mới' },
            { id: 'repost', label: 'Đăng lại' },
          ]}
        />
        <div className="feed">
          {items.map((f) => (
            <TrackRow key={f.trackId + f.by} track={getTrack(f.trackId)} queue={queue} context={{ ...f, by: getArtist(f.by) }} />
          ))}
        </div>
      </div>

      <aside className="rail">
        <div className="rail__block">
          <h2 className="rail__title">Gợi ý theo dõi</h2>
          {suggestions.length ? (
            suggestions.map((a) => <ArtistCard key={a.id} artist={a} />)
          ) : (
            <p className="muted">Bạn đã theo dõi tất cả nghệ sĩ gợi ý.</p>
          )}
        </div>

        <div className="rail__block">
          <h2 className="rail__title"><History size={16} /> Nghe gần đây</h2>
          {recent.length ? (
            <ul className="mini-list">
              {recent.map((t) => (
                <li key={t.id}>
                  <Link to={`/track/${t.id}`}>
                    <Cover seed={t.id} size={40} />
                    <span>
                      <strong>{t.title}</strong>
                      <small>{getArtist(t.artistId).name}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Chưa nghe bài nào" text="Bấm phát một bài trong bảng tin, bài đó sẽ hiện ở đây." />
          )}
        </div>

        <Link to="/library?tab=likes" className="rail__stat">
          <Heart size={18} />
          <span><strong>{liked.length} bài hát</strong> bạn đã thích</span>
        </Link>
      </aside>
    </div>
  );
}
