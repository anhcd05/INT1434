import { UserCheck, UserPlus } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { currentUser } from '../data/mock';

export default function FollowButton({ artistId, small = false }) {
  const { isFollowing, toggleFollow } = useLibrary();
  if (artistId === currentUser.id) return null;
  const on = isFollowing(artistId);
  return (
    <button
      type="button"
      className={`btn ${on ? 'btn--quiet' : 'btn--outline'} ${small ? 'btn--sm' : ''}`}
      aria-pressed={on}
      onClick={() => toggleFollow(artistId)}
    >
      {on ? <UserCheck size={15} /> : <UserPlus size={15} />}
      {on ? 'Đang theo dõi' : 'Theo dõi'}
    </button>
  );
}
