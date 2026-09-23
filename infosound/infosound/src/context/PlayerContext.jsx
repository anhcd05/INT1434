import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { tracks } from '../data/mock';

// Trình phát giả lập: không phát âm thanh thật, chỉ chạy tiến độ theo thời gian
// để giao diện (dạng sóng, thanh phát) phản hồi như một ứng dụng nghe nhạc.
const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [queue, setQueue] = useState(tracks);
  const [current, setCurrent] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [history, setHistory] = useState([]);

  const playTrack = useCallback((track, newQueue, startAt = 0) => {
    if (newQueue?.length) setQueue(newQueue);
    setCurrent(track);
    setProgress(startAt);
    setIsPlaying(true);
    setHistory((h) => [track.id, ...h.filter((id) => id !== track.id)].slice(0, 20));
  }, []);

  const toggle = useCallback(
    (track, newQueue) => {
      if (!track || track.id === current?.id) setIsPlaying((p) => !p);
      else playTrack(track, newQueue);
    },
    [current, playTrack],
  );

  const step = useCallback(
    (dir) => {
      const idx = queue.findIndex((t) => t.id === current?.id);
      let nextIdx = shuffle ? Math.floor(Math.random() * queue.length) : idx + dir;
      if (nextIdx >= queue.length) nextIdx = 0;
      if (nextIdx < 0) nextIdx = queue.length - 1;
      playTrack(queue[nextIdx]);
    },
    [queue, current, shuffle, playTrack],
  );

  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => {
    // bấm "lùi" khi đã nghe quá 3 giây thì quay về đầu bài
    if (progress > 3) setProgress(0);
    else step(-1);
  }, [progress, step]);

  const seek = useCallback((sec) => setProgress(Math.max(0, Math.min(sec, current?.duration ?? 0))), [current]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => setProgress((p) => p + 1), 1000);
    return () => clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    if (current && progress >= current.duration) {
      if (repeat) setProgress(0);
      else next();
    }
  }, [progress, current, repeat, next]);

  const value = useMemo(
    () => ({
      queue, current, isPlaying, progress, volume, muted, shuffle, repeat, history,
      playTrack, toggle, next, prev, seek,
      setVolume, setMuted, setShuffle, setRepeat,
      isCurrent: (id) => current?.id === id,
      isPlayingTrack: (id) => current?.id === id && isPlaying,
    }),
    [queue, current, isPlaying, progress, volume, muted, shuffle, repeat, history, playTrack, toggle, next, prev, seek],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => useContext(PlayerContext);
