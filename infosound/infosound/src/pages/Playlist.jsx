import { Link, useParams } from 'react-router-dom';
import { BookmarkCheck, BookmarkPlus, Pause, Play, Shuffle } from 'lucide-react';
import { getArtist, getPlaylist, playlists, playlistTracks } from '../data/mock';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';
import Cover from '../components/Cover';
import Avatar from '../components/Avatar';
import TrackListItem from '../components/TrackListItem';
import PlaylistTile from '../components/PlaylistTile';
import NotFound from './NotFound';

export default function Playlist() {
  const { id } = useParams();
  const playlist = getPlaylist(id);
  const player = usePlayer();
  const { isSaved, toggleSavePlaylist } = useLibrary();
  if (!playlist) return <NotFound />;

  const items = playlistTracks(playlist);
  const curator = getArtist(playlist.curatorId);
  const total = items.reduce((s, t) => s + t.duration, 0);
  const playingHere = player.isPlaying && items.some((t) => t.id === player.current?.id);
  const saved = isSaved(playlist.id);
  const others = playlists.filter((p) => p.id !== playlist.id).slice(0, 4);

  const playAll = () => (playingHere ? player.toggle() : player.playTrack(items[0], items));
  const shuffleAll = () => {
    const mixed = [...items].sort(() => Math.random() - 0.5);
    player.setShuffle(true);
    player.playTrack(mixed[0], mixed);
  };

  return (
    <div className="page">
      <section className="phead">
        <div className="phead__art">
          <Cover seed={items[1]?.id ?? 'x'} className="phead__back" />
          <Cover seed={playlist.id} className="phead__front" />
        </div>
        <div className="phead__body">
          <p className="muted">{playlist.type}</p>
          <h1 className="phead__title">{playlist.title}</h1>
          <p className="phead__desc">{playlist.description}</p>
          <p className="phead__by">
            {curator.id === 'infosound' ? (
              <span>Tuyển chọn bởi InfoSound</span>
            ) : (
              <Link to={`/artist/${curator.id}`}><Avatar name={curator.name} size={24} /> {curator.name}</Link>
            )}
            <span className="muted">{items.length} bài hát, khoảng {Math.round(total / 60)} phút</span>
          </p>
          <div className="phead__actions">
            <button type="button" className="btn btn--primary btn--lg" onClick={playAll}>
              {playingHere ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              {playingHere ? 'Tạm dừng' : 'Phát tất cả'}
            </button>
            <button type="button" className="btn btn--outline" onClick={shuffleAll}><Shuffle size={16} /> Trộn bài</button>
            <button type="button" className={`btn ${saved ? 'btn--quiet' : 'btn--outline'}`} aria-pressed={saved} onClick={() => toggleSavePlaylist(playlist.id)}>
              {saved ? <BookmarkCheck size={16} /> : <BookmarkPlus size={16} />}
              {saved ? 'Đã lưu vào thư viện' : 'Lưu vào thư viện'}
            </button>
          </div>
        </div>
      </section>

      <ol className="tlist tlist--table">
        {items.map((t, i) => <TrackListItem key={t.id} track={t} index={i + 1} queue={items} />)}
      </ol>

      <section className="section">
        <h2 className="h-small">Playlist khác bạn có thể thích</h2>
        <div className="tile-grid">
          {others.map((p) => <PlaylistTile key={p.id} playlist={p} />)}
        </div>
      </section>
    </div>
  );
}
