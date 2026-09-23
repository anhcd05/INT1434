import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Bell, CloudUpload, LogOut, Search, Settings, User } from 'lucide-react';
import { currentUser, getArtist, notifications } from '../data/mock';
import Logo from './Logo';
import Avatar from './Avatar';

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    const handler = (e) => ref.current && !ref.current.contains(e.target) && onOutside();
    const esc = (e) => e.key === 'Escape' && onOutside();
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', esc);
    };
  }, [ref, onOutside]);
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [menu, setMenu] = useState(null); // 'user' | 'bell' | null
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setMenu(null));

  useEffect(() => {
    if (location.pathname === '/search') setQ(params.get('q') ?? '');
    setMenu(null);
  }, [location.pathname, params]);

  const submit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link to="/" className="topbar__brand" aria-label="InfoSound, về trang chủ">
          <Logo />
        </Link>

        <nav className="topnav" aria-label="Điều hướng chính">
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/feed">Bảng tin</NavLink>
          <NavLink to="/library">Thư viện</NavLink>
        </nav>

        <form className="searchbox" role="search" onSubmit={submit}>
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm bài hát, nghệ sĩ, playlist"
            aria-label="Tìm kiếm"
          />
        </form>

        <div className="topbar__actions" ref={menuRef}>
          <Link to="/upload" className="btn btn--primary btn--sm topbar__upload">
            <CloudUpload size={16} /> <span>Tải lên</span>
          </Link>

          <div className="menu-wrap">
            <button
              type="button"
              className="icon-btn icon-btn--dot"
              aria-label="Thông báo"
              aria-expanded={menu === 'bell'}
              onClick={() => setMenu(menu === 'bell' ? null : 'bell')}
            >
              <Bell size={19} />
            </button>
            {menu === 'bell' && (
              <div className="dropdown dropdown--wide" role="menu">
                <p className="dropdown__title">Thông báo</p>
                {notifications.map((n) => {
                  const who = getArtist(n.who);
                  return (
                    <Link key={n.id} to={`/artist/${who.id}`} className="notif" role="menuitem">
                      <Avatar name={who.name} size={32} />
                      <span>
                        <strong>{who.name}</strong> {n.text}
                        <small>{n.ago} trước</small>
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="menu-wrap">
            <button
              type="button"
              className="avatar-btn"
              aria-label="Tài khoản"
              aria-expanded={menu === 'user'}
              onClick={() => setMenu(menu === 'user' ? null : 'user')}
            >
              <Avatar name={currentUser.name} size={34} />
            </button>
            {menu === 'user' && (
              <div className="dropdown" role="menu">
                <div className="dropdown__me">
                  <strong>{currentUser.name}</strong>
                  <span>@{currentUser.handle}</span>
                </div>
                <Link to={`/artist/${currentUser.id}`} role="menuitem"><User size={16} /> Hồ sơ của tôi</Link>
                <Link to="/settings" role="menuitem"><Settings size={16} /> Cài đặt</Link>
                <Link to="/auth" role="menuitem"><LogOut size={16} /> Đăng xuất</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
