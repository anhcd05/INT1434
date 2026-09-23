import { useSearchParams } from 'react-router-dom';
import { Heart, History, ListMusic, Users } from 'lucide-react';
import { artists, getPlaylist, getTrack } from '../data/mock';
import { useLibrary } from '../context/LibraryContext';
import { usePlayer } from '../context/PlayerContext';
import Tabs from '../components/Tabs';
import TrackTile from '../components/TrackTile';
import TrackListItem from '../components/TrackListItem';
import PlaylistTile from '../components/PlaylistTile';
import ArtistCard from '../components/ArtistCard';
import SectionHead from '../components/SectionHead';
import EmptyState from '../components/EmptyState';

export default function Library() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') ?? 'overview';
  const { liked, following, savedPlaylists } = useLibrary();
  const { history } = usePlayer();

  const likedTracks = liked.map(getTrack).filter(Boolean);
  const historyTracks = history.map(getTrack).filter(Boolean);
  const saved = savedPlaylists.map(getPlaylist).filter(Boolean);
  const followed = artists.filter((a) => following.includes(a.id));
  const go = (id) => setParams(id === 'overview' ? {} : { tab: id });

  const emptyLikes = <EmptyState icon={Heart} title="Chưa thích bài nào" text="Bấm biểu tượng trái tim ở bất kỳ bài hát nào để lưu vào đây." action="Khám phá bài hát" to="/" />;
  const emptyHistory = <EmptyState icon={History} title="Lịch sử nghe đang trống" text="Những bài bạn phát trong phiên này sẽ hiện ở đây." action="Mở bảng tin" to="/feed" />;
  const emptyPlaylists = <EmptyState icon={ListMusic} title="Chưa lưu playlist nào" text="Mở một playlist và chọn Lưu vào thư viện." action="Xem playlist tuyển chọn" to="/" />;
  const emptyFollow = <EmptyState icon={Users} title="Chưa theo dõi ai" text="Theo dõi nghệ sĩ để bài mới của họ xuất hiện trong bảng tin." action="Tìm nghệ sĩ" to="/search" />;

  return (
    <div className="page">
      <div className="page-head">
        <h1>Thư viện</h1>
      </div>
      <Tabs
        label="Mục thư viện"
        value={tab}
        onChange={go}
        tabs={[
          { id: 'overview', label: 'Tổng quan' },
          { id: 'likes', label: 'Đã thích', count: likedTracks.length },
          { id: 'playlists', label: 'Playlist', count: saved.length },
          { id: 'following', label: 'Đang theo dõi', count: followed.length },
          { id: 'history', label: 'Lịch sử', count: historyTracks.length },
        ]}
      />

      {tab === 'overview' && (
        <>
          <section className="section section--tight">
            <SectionHead title="Nghe gần đây" to={historyTracks.length ? '/library?tab=history' : undefined} />
            {historyTracks.length ? (
              <div className="tile-grid">{historyTracks.slice(0, 6).map((t) => <TrackTile key={t.id} track={t} queue={historyTracks} />)}</div>
            ) : emptyHistory}
          </section>
          <section className="section">
            <SectionHead title="Đã thích" to={likedTracks.length ? '/library?tab=likes' : undefined} />
            {likedTracks.length ? (
              <div className="tile-grid">{likedTracks.slice(0, 6).map((t) => <TrackTile key={t.id} track={t} queue={likedTracks} />)}</div>
            ) : emptyLikes}
          </section>
          <section className="section">
            <SectionHead title="Playlist đã lưu" to={saved.length ? '/library?tab=playlists' : undefined} />
            {saved.length ? <div className="row-scroll">{saved.map((p) => <PlaylistTile key={p.id} playlist={p} />)}</div> : emptyPlaylists}
          </section>
          <section className="section">
            <SectionHead title="Đang theo dõi" to={followed.length ? '/library?tab=following' : undefined} />
            {followed.length ? (
              <div className="artist-grid">{followed.slice(0, 6).map((a) => <ArtistCard key={a.id} artist={a} layout="stack" />)}</div>
            ) : emptyFollow}
          </section>
        </>
      )}

      {tab === 'likes' && (likedTracks.length ? <ol className="tlist tlist--table">{likedTracks.map((t, i) => <TrackListItem key={t.id} track={t} index={i + 1} queue={likedTracks} />)}</ol> : emptyLikes)}
      {tab === 'playlists' && (saved.length ? <div className="tile-grid">{saved.map((p) => <PlaylistTile key={p.id} playlist={p} />)}</div> : emptyPlaylists)}
      {tab === 'following' && (followed.length ? <div className="artist-grid">{followed.map((a) => <ArtistCard key={a.id} artist={a} layout="stack" />)}</div> : emptyFollow)}
      {tab === 'history' && (historyTracks.length ? <ol className="tlist tlist--table">{historyTracks.map((t) => <TrackListItem key={t.id} track={t} queue={historyTracks} />)}</ol> : emptyHistory)}
    </div>
  );
}
