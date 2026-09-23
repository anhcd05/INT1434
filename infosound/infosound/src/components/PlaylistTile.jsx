import { Link } from 'react-router-dom';
import { getArtist, playlistTracks } from '../data/mock';
import Cover from './Cover';

// Ảnh bìa playlist dạng "chồng đĩa": ba bìa lệch nhau
export default function PlaylistTile({ playlist }) {
  const curator = getArtist(playlist.curatorId);
  const items = playlistTracks(playlist);
  return (
    <Link to={`/playlist/${playlist.id}`} className="ptile">
      <div className="ptile__stack">
        <Cover seed={items[2]?.id ?? playlist.id + 'c'} className="ptile__back2" />
        <Cover seed={items[1]?.id ?? playlist.id + 'b'} className="ptile__back1" />
        <Cover seed={playlist.id} className="ptile__front" />
        <span className="ptile__count">{items.length} bài</span>
      </div>
      <span className="tile__title">{playlist.title}</span>
      <span className="tile__sub">{playlist.type} của {curator?.name}</span>
    </Link>
  );
}
