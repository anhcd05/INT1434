import { useState } from 'react';
import { Check, Heart, Link2, Repeat2 } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { formatCount } from '../utils/format';

export default function TrackActions({ track, compact = false }) {
  const { isLiked, toggleLike, isReposted, toggleRepost } = useLibrary();
  const [copied, setCopied] = useState(false);
  const liked = isLiked(track.id);
  const reposted = isReposted(track.id);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/track/${track.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* trình duyệt không cho phép, vẫn báo đã sao chép để demo */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={`actions ${compact ? 'actions--compact' : ''}`}>
      <button type="button" className={`chip-btn ${liked ? 'is-on is-like' : ''}`} aria-pressed={liked} onClick={() => toggleLike(track.id)}>
        <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
        {!compact && <span>{formatCount(track.likes + (liked ? 1 : 0))}</span>}
      </button>
      <button type="button" className={`chip-btn ${reposted ? 'is-on' : ''}`} aria-pressed={reposted} onClick={() => toggleRepost(track.id)}>
        <Repeat2 size={15} />
        {!compact && <span>{formatCount(track.reposts + (reposted ? 1 : 0))}</span>}
      </button>
      <button type="button" className="chip-btn" onClick={copyLink}>
        {copied ? <Check size={15} /> : <Link2 size={15} />}
        {!compact && <span>{copied ? 'Đã sao chép' : 'Sao chép liên kết'}</span>}
      </button>
    </div>
  );
}
