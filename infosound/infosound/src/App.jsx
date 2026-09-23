import { HashRouter, Route, Routes } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import { LibraryProvider } from './context/LibraryContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Search from './pages/Search';
import Track from './pages/Track';
import Artist from './pages/Artist';
import Playlist from './pages/Playlist';
import Library from './pages/Library';
import Upload from './pages/Upload';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// HashRouter giúp deploy lên GitHub Pages không bị lỗi 404 khi tải lại trang
export default function App() {
  return (
    <LibraryProvider>
      <PlayerProvider>
        <HashRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/search" element={<Search />} />
              <Route path="/track/:id" element={<Track />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/library" element={<Library />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HashRouter>
      </PlayerProvider>
    </LibraryProvider>
  );
}
