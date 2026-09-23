import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Lưu trạng thái của người dùng: bài đã thích, đã đăng lại, nghệ sĩ đang theo dõi, giao diện sáng/tối
const LibraryContext = createContext(null);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* bỏ qua nếu trình duyệt chặn localStorage */
  }
}

export function LibraryProvider({ children }) {
  const [liked, setLiked] = useState(() => load('is.v2.liked', ['t1', 't2', 't6', 't12', 't14', 't7']));
  const [reposted, setReposted] = useState(() => load('is.v2.reposted', ['t9']));
  const [following, setFollowing] = useState(() => load('is.v2.following', ['martin-garrix', 'kygo', 'gryffin', 'avicii']));
  const [savedPlaylists, setSavedPlaylists] = useState(() => load('is.v2.playlists', ['p1', 'p2', 'p6']));
  const [theme, setTheme] = useState(() => load('is.theme', 'light'));

  useEffect(() => { save('is.v2.liked', liked); }, [liked]);
  useEffect(() => { save('is.v2.reposted', reposted); }, [reposted]);
  useEffect(() => { save('is.v2.following', following); }, [following]);
  useEffect(() => { save('is.v2.playlists', savedPlaylists); }, [savedPlaylists]);

  useEffect(() => {
    save('is.theme', theme);
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const resolved = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
      document.documentElement.dataset.theme = resolved;
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [theme]);

  const flip = (setter) => (id) => setter((list) => (list.includes(id) ? list.filter((x) => x !== id) : [id, ...list]));

  const value = useMemo(
    () => ({
      liked, reposted, following, savedPlaylists, theme, setTheme,
      toggleLike: flip(setLiked),
      toggleRepost: flip(setReposted),
      toggleFollow: flip(setFollowing),
      toggleSavePlaylist: flip(setSavedPlaylists),
      isLiked: (id) => liked.includes(id),
      isReposted: (id) => reposted.includes(id),
      isFollowing: (id) => following.includes(id),
      isSaved: (id) => savedPlaylists.includes(id),
    }),
    [liked, reposted, following, savedPlaylists, theme],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export const useLibrary = () => useContext(LibraryContext);
