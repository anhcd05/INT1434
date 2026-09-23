import { Link } from 'react-router-dom';
import { getArtist } from '../data/mock';
import Cover from './Cover';
import PlayButton from './PlayButton';

export default function TrackTile({ track, queue }) {
  const artist = getArtist(track.artistId);
  return (
    <div className="tile">
      <Link to={`/track/${track.id}`} className="tile__art" aria-label={track.title}>
        <Cover seed={track.id} />
        <span className="tile__play"><PlayButton track={track} queue={queue} size={46} /></span>
      </Link>
      <Link to={`/track/${track.id}`} className="tile__title">{track.title}</Link>
      <Link to={`/artist/${artist.id}`} className="tile__sub">{artist.name}</Link>
    </div>
  );
}
