import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BadgeCheck, MapPin, Music2, Pencil } from 'lucide-react';
import { artists, currentUser, feed, getArtist, getTrack, playlistsByArtist, tracksByArtist } from '../data/mock';
import { formatCount, makePeaks } from '../utils/format';
import Avatar from '../components/Avatar';
import FollowButton from '../components/FollowButton';
import Tabs from '../components/Tabs';
import TrackRow from '../components/TrackRow';
import TrackListItem from '../components/TrackListItem';
import PlaylistTile from '../components/PlaylistTile';
import ArtistCard from '../components/ArtistCard';
import EmptyState from '../components/EmptyState';
import NotFound from './NotFound';

// Ảnh bìa hồ sơ: dạng sóng khổng lồ của nghệ sĩ làm hoạ tiết
function Banner({ seed }) {
  const peaks = makePeaks('banner-' + seed, 64);
  return (
    <div className="banner" aria-hidden="true">
      <svg viewBox="0 0 640 160" preserveAspectRatio="none">
        {peaks.map((p, i) => {
          const h = p * 150;
          return <rect key={i} x={i * 10 + 2} y={80 - h / 2} width={6} height={h} rx={3} />;
        })}
      </svg>
    </div>
  );
}

export default function Artist() {
  const { id } = useParams();
  const artist = getArtist(id);
  const [tab, setTab] = useState('all');
  if (!artist || id === 'infosound') return <NotFound />;

  const isMe = artist.id === currentUser.id;
  const list = tracksByArtist(artist.id);
  const popular = [...list].sort((a, b) => b.plays - a.plays);
  const lists = playlistsByArtist(artist.id);
  const reposts = feed.filter((f) => f.by === artist.id && f.type === 'repost').map((f) => getTrack(f.trackId));
  const similar = artists.filter((a) => a.id !== artist.id && a.id !== currentUser.id).slice(0, 3);

  return (
    <div className="page">
      <section className="profile">
        <Banner seed={artist.id} />
        <div className="profile__bar">
          <div className="profile__avatar"><Avatar name={artist.name} size={132} ring /></div>
          <div className="profile__id">
            <h1>
              {artist.name}
              {artist.verified && <BadgeCheck size={22} className="verified" aria-label="Đã xác minh" />}
            </h1>
            <p className="muted">
              @{artist.handle}
              {artist.location && <span className="profile__loc"><MapPin size={14} /> {artist.location}</span>}
            </p>
          </div>
          <dl className="profile__stats">
            <div><dt>Người theo dõi</dt><dd>{formatCount(artist.followers)}</dd></div>
            <div><dt>Đang theo dõi</dt><dd>{formatCount(artist.following)}</dd></div>
            <div><dt>Bài hát</dt><dd>{list.length}</dd></div>
          </dl>
          {isMe ? (
            <Link to="/settings" className="btn btn--outline"><Pencil size={15} /> Sửa hồ sơ</Link>
          ) : (
            <FollowButton artistId={artist.id} />
          )}
        </div>
      </section>

      <div className="with-rail">
        <div>
          <Tabs
            label="Nội dung hồ sơ"
            value={tab}
            onChange={setTab}
            tabs={[
              { id: 'all', label: 'Tất cả' },
              { id: 'popular', label: 'Nổi bật' },
              { id: 'playlists', label: 'Playlist', count: lists.length },
              { id: 'reposts', label: 'Đăng lại', count: reposts.length },
            ]}
          />

          {tab === 'all' &&
            (list.length ? (
              <div className="feed">{list.map((t) => <TrackRow key={t.id} track={t} queue={list} />)}</div>
            ) : (
              <EmptyState
                icon={Music2}
                title={isMe ? 'Bạn chưa đăng bài hát nào' : 'Chưa có bài hát'}
                text={isMe ? 'Bài bạn tải lên sẽ hiện ở đây để người theo dõi nghe và bình luận.' : 'Nghệ sĩ này chưa đăng bài hát công khai nào.'}
                action={isMe ? 'Tải lên bài đầu tiên' : undefined}
                to="/upload"
              />
            ))}

          {tab === 'popular' && (
            popular.length ? (
              <ol className="tlist">{popular.map((t, i) => <TrackListItem key={t.id} track={t} index={i + 1} queue={popular} />)}</ol>
            ) : <EmptyState title="Chưa có bài nổi bật" />
          )}

          {tab === 'playlists' && (
            lists.length ? (
              <div className="tile-grid">{lists.map((p) => <PlaylistTile key={p.id} playlist={p} />)}</div>
            ) : <EmptyState title="Chưa có playlist" text="Playlist công khai của nghệ sĩ sẽ hiện ở đây." />
          )}

          {tab === 'reposts' && (
            reposts.length ? (
              <div className="feed">{reposts.map((t) => <TrackRow key={t.id} track={t} queue={reposts} />)}</div>
            ) : <EmptyState title="Chưa đăng lại bài nào" />
          )}
        </div>

        <aside className="rail">
          <div className="rail__block">
            <h2 className="rail__title">Giới thiệu</h2>
            <p className="prose">{artist.bio || (isMe ? 'Thêm vài dòng giới thiệu trong phần cài đặt để người nghe biết bạn là ai.' : 'Chưa có giới thiệu.')}</p>
          </div>
          <div className="rail__block">
            <h2 className="rail__title">Người nghe cũng theo dõi</h2>
            {similar.map((a) => <ArtistCard key={a.id} artist={a} />)}
          </div>
        </aside>
      </div>
    </div>
  );
}
