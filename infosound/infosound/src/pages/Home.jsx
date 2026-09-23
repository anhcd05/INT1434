import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Headphones } from 'lucide-react';
import { artists, chart, commentsForTrack, getArtist, getTrack, moods, playlists, tracks } from '../data/mock';
import { formatCount } from '../utils/format';
import Cover from '../components/Cover';
import PlayButton from '../components/PlayButton';
import Waveform from '../components/Waveform';
import TrackActions from '../components/TrackActions';
import TrackListItem from '../components/TrackListItem';
import PlaylistTile from '../components/PlaylistTile';
import TrackTile from '../components/TrackTile';
import ArtistCard from '../components/ArtistCard';
import SectionHead from '../components/SectionHead';

export default function Home() {
  const featured = getTrack('t2');
  const featuredArtist = getArtist(featured.artistId);
  const [genre, setGenre] = useState('all');
  const chartList = (genre === 'all' ? chart : chart.filter((t) => t.genre === genre)).slice(0, 8);
  const fresh = tracks.filter((t) => /ngày|giờ/.test(t.uploaded)).slice(0, 6);

  return (
    <div className="page">
      {/* Hero: bài nổi bật với dạng sóng lớn và bình luận theo thời gian */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__cover"><Cover seed={featured.id} rounded="var(--r-panel)" /></div>
        <div className="hero__body">
          <p className="hero__kicker">Được nghe nhiều nhất tuần này</p>
          <h1 id="hero-title" className="hero__title">
            <Link to={`/track/${featured.id}`}>{featured.title}</Link>
          </h1>
          <div className="hero__by">
            <Link to={`/artist/${featuredArtist.id}`}>{featuredArtist.name}</Link>
            {featuredArtist.verified && <BadgeCheck size={16} className="verified" aria-label="Đã xác minh" />}
            <span className="muted"><Headphones size={14} /> {formatCount(featured.plays)} lượt nghe</span>
          </div>
          <div className="hero__player">
            <PlayButton track={featured} queue={chart} size={58} />
            <Waveform track={featured} queue={chart} comments={commentsForTrack(featured.id)} showComments big bars={140} height={84} />
          </div>
          <TrackActions track={featured} />
        </div>
      </section>

      <section className="section">
        <SectionHead title="Bảng xếp hạng tuần" sub="Xếp theo lượt nghe trong 7 ngày qua" />
        <div className="chips" role="group" aria-label="Lọc theo thể loại">
          <button type="button" className={`chip ${genre === 'all' ? 'is-active' : ''}`} onClick={() => setGenre('all')}>Tất cả</button>
          {moods.map((m) => (
            <button key={m.id} type="button" className={`chip ${genre === m.id ? 'is-active' : ''}`} onClick={() => setGenre(m.id)}>{m.label}</button>
          ))}
        </div>
        <ol className="tlist tlist--cols">
          {chartList.map((t, i) => <TrackListItem key={t.id} track={t} index={i + 1} queue={chartList} />)}
        </ol>
      </section>

      <section className="section">
        <SectionHead title="Nghe theo thể loại" />
        <div className="genre-grid">
          {moods.map((m) => {
            const count = tracks.filter((t) => t.genre === m.id).length;
            return (
              <Link key={m.id} to={`/search?genre=${encodeURIComponent(m.id)}`} className="genre">
                <Cover seed={'g' + m.id} rounded="0" className="genre__bg" />
                <span className="genre__name">{m.label}</span>
                <span className="genre__note">{m.note}, {count} bài</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Playlist tuyển chọn" sub="Do đội ngũ InfoSound và nghệ sĩ tổng hợp" to="/library?tab=playlists" />
        <div className="row-scroll">
          {playlists.map((p) => <PlaylistTile key={p.id} playlist={p} />)}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Mới đăng gần đây" to="/feed" linkText="Mở bảng tin" />
        <div className="tile-grid">
          {fresh.map((t) => <TrackTile key={t.id} track={t} queue={fresh} />)}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Nghệ sĩ đang lên" sub="Lượng người theo dõi tăng nhanh tháng này" />
        <div className="artist-grid">
          {artists.filter((a) => a.id !== 'chu-duc-anh').slice(0, 6).map((a) => <ArtistCard key={a.id} artist={a} layout="stack" />)}
        </div>
      </section>
    </div>
  );
}
