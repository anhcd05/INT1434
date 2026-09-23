import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import PlayerBar from './PlayerBar';

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="shell">
      <button type="button" className="skip" onClick={() => document.getElementById('main')?.focus()}>
        Bỏ qua đến nội dung
      </button>
      <Header />
      <main id="main" className="shell__main" tabIndex={-1}>
        <Outlet />
      </main>
      <PlayerBar />
    </div>
  );
}
