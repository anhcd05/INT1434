import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { artists, getArtist, moods, playlists, tracks } from '../data/mock';
import Tabs from '../components/Tabs';
import TrackRow from '../components/TrackRow';
import TrackListItem from '../components/TrackListItem';
import ArtistCard from '../components/ArtistCard';
import PlaylistTile from '../components/PlaylistTile';
import Cover from '../components/Cover';
import EmptyState from '../components/EmptyState';

// Bỏ dấu tiếng Việt để tìm "mua" vẫn ra "Mưa"
const norm = (s = '') => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase();

const suggestionsList = ['Martin Garrix', 'Kygo', 'Avicii', 'DEAMN', 'future bass', 'tropical'];

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const genre = params.get('genre') ?? '';
  const tab = params.get('tab') ?? 'all';

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const nq = norm(q);
    const hit = (...fields) => !nq || fields.some((f) => norm(f).includes(nq));
    const t = tracks.filter(
      (x) => (!genre || x.genre === genre) && hit(x.title, getArtist(x.artistId).name, x.genre, ...x.tags),
    );
    const a = artists.filter((x) => x.id !== 'chu-duc-anh' && hit(x.name, x.handle, x.location) && (!genre || t.some((tr) => tr.artistId === x.id)));
    const p = playlists.filter((x) => hit(x.title, x.description) && (!genre || x.trackIds.some((id) => t.find((tr) => tr.id === id))));
    return { tracks: t, artists: a, playlists: p };
  }, [q, genre]);

  const empty = !q && !genre;
  const total = results.tracks.length + results.artists.length + results.playlists.length;

  return (
    <div className="page">
      <div className="page-head">
        <h1>{q ? <>Kết quả cho “{q}”</> : genre ? genre : 'Tìm kiếm'}</h1>
        {!empty && <p>{total} kết quả{genre && q ? ` trong thể loại ${genre}` : ''}</p>}
      </div>

      <div className="chips" role="group" aria-label="Lọc theo thể loại">
        <button type="button" className={`chip ${!genre ? 'is-active' : ''}`} onClick={() => set('genre', '')}>Mọi thể loại</button>
        {moods.map((m) => (
          <button key={m.id} type="button" className={`chip ${genre === m.id ? 'is-active' : ''}`} onClick={() => set('genre', m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      {empty ? (
        <>
          <section className="section section--tight">
            <h2 className="h-small">Mọi người hay tìm</h2>
            <div className="chips">
              {suggestionsList.map((s) => (
                <Link key={s} to={`/search?q=${encodeURIComponent(s)}`} className="chip chip--outline">{s}</Link>
              ))}
            </div>
          </section>
          <section className="section">
            <h2 className="h-small">Duyệt theo thể loại</h2>
            <div className="genre-grid">
              {moods.map((m) => (
                <button key={m.id} type="button" className="genre" onClick={() => set('genre', m.id)}>
                  <Cover seed={'g' + m.id} rounded="0" className="genre__bg" />
                  <span className="genre__name">{m.label}</span>
                  <span className="genre__note">{m.note}</span>
                </button>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <Tabs
            label="Loại kết quả"
            value={tab}
            onChange={(v) => set('tab', v === 'all' ? '' : v)}
            tabs={[
              { id: 'all', label: 'Tất cả' },
              { id: 'tracks', label: 'Bài hát', count: results.tracks.length },
              { id: 'artists', label: 'Nghệ sĩ', count: results.artists.length },
              { id: 'playlists', label: 'Playlist', count: results.playlists.length },
            ]}
          />

          {total === 0 && (
            <EmptyState
              icon={SearchX}
              title={`Không tìm thấy “${q}”`}
              text="Kiểm tra lại chính tả, thử từ khoá ngắn hơn hoặc bỏ bộ lọc thể loại."
              action="Xem bảng xếp hạng"
              to="/"
            />
          )}

          {tab === 'all' && total > 0 && (
            <div className="search-all">
              {results.tracks.length > 0 && (
                <section className="section section--tight">
                  <h2 className="h-small">Bài hát</h2>
                  <ol className="tlist">
                    {results.tracks.slice(0, 5).map((t) => <TrackListItem key={t.id} track={t} queue={results.tracks} />)}
                  </ol>
                  {results.tracks.length > 5 && (
                    <button type="button" className="link-btn" onClick={() => set('tab', 'tracks')}>Xem cả {results.tracks.length} bài hát</button>
                  )}
                </section>
              )}
              {results.artists.length > 0 && (
                <section className="section section--tight">
                  <h2 className="h-small">Nghệ sĩ</h2>
                  <div className="artist-grid">
                    {results.artists.slice(0, 6).map((a) => <ArtistCard key={a.id} artist={a} layout="stack" />)}
                  </div>
                </section>
              )}
              {results.playlists.length > 0 && (
                <section className="section section--tight">
                  <h2 className="h-small">Playlist</h2>
                  <div className="row-scroll">
                    {results.playlists.map((p) => <PlaylistTile key={p.id} playlist={p} />)}
                  </div>
                </section>
              )}
            </div>
          )}

          {tab === 'tracks' && (
            <div className="feed">
              {results.tracks.map((t) => <TrackRow key={t.id} track={t} queue={results.tracks} />)}
            </div>
          )}
          {tab === 'artists' && (
            <div className="list-col">
              {results.artists.map((a) => <ArtistCard key={a.id} artist={a} />)}
            </div>
          )}
          {tab === 'playlists' && (
            <div className="tile-grid">
              {results.playlists.map((p) => <PlaylistTile key={p.id} playlist={p} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
