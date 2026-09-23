import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';
import { formatCount } from '../utils/format';
import Avatar from './Avatar';
import FollowButton from './FollowButton';

export default function ArtistCard({ artist, layout = 'row' }) {
  return (
    <div className={`acard acard--${layout}`}>
      <Link to={`/artist/${artist.id}`} className="acard__avatar" aria-hidden="true" tabIndex={-1}>
        <Avatar name={artist.name} size={layout === 'row' ? 44 : 96} />
      </Link>
      <div className="acard__info">
        <Link to={`/artist/${artist.id}`} className="acard__name">
          {artist.name}
          {artist.verified && <BadgeCheck size={15} className="verified" aria-label="Đã xác minh" />}
        </Link>
        <span className="acard__meta">{formatCount(artist.followers)} người theo dõi</span>
      </div>
      <FollowButton artistId={artist.id} small={layout === 'row'} />
    </div>
  );
}
