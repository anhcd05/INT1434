import { useEffect, useState } from 'react';
import { Bell, Check, Monitor, Moon, Palette, Shield, Sun, User } from 'lucide-react';
import { currentUser } from '../data/mock';
import { useLibrary } from '../context/LibraryContext';
import Avatar from '../components/Avatar';

const SECTIONS = [
  { id: 'account', label: 'Tài khoản', icon: User },
  { id: 'appearance', label: 'Giao diện', icon: Palette },
  { id: 'notifications', label: 'Thông báo', icon: Bell },
  { id: 'privacy', label: 'Quyền riêng tư', icon: Shield },
];

function Toggle({ label, hint, checked, onChange }) {
  return (
    <label className="toggle-row">
      <span>
        <strong>{label}</strong>
        {hint && <small>{hint}</small>}
      </span>
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="switch" />
    </label>
  );
}

export default function Settings() {
  const [section, setSection] = useState('account');
  const { theme, setTheme } = useLibrary();
  const [profile, setProfile] = useState({ name: currentUser.name, handle: currentUser.handle, location: currentUser.location, bio: currentUser.bio });
  const [notif, setNotif] = useState({ follow: true, like: true, comment: true, newTrack: true, email: false });
  const [privacy, setPrivacy] = useState({ showHistory: false, showLikes: true, allowDownload: false });
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(false), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const save = (e) => {
    e.preventDefault();
    setToast(true);
  };

  return (
    <div className="page settings">
      <div className="page-head">
        <h1>Cài đặt</h1>
      </div>

      <div className="settings__layout">
        <nav className="settings__nav" aria-label="Mục cài đặt">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" className={section === id ? 'is-active' : ''} aria-current={section === id} onClick={() => setSection(id)}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>

        <div className="settings__panel">
          {section === 'account' && (
            <form onSubmit={save}>
              <h2>Hồ sơ công khai</h2>
              <div className="settings__avatar">
                <Avatar name={profile.name || '?'} size={72} />
                <div>
                  <button type="button" className="btn btn--outline btn--sm">Đổi ảnh đại diện</button>
                  <p className="fine">JPG hoặc PNG, tối thiểu 400 × 400 px.</p>
                </div>
              </div>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="s-name">Tên hiển thị</label>
                  <input id="s-name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="s-handle">Tên người dùng</label>
                  <div className="input-prefix"><span>infosound.vn/</span><input id="s-handle" value={profile.handle} onChange={(e) => setProfile({ ...profile, handle: e.target.value })} /></div>
                </div>
                <div className="field">
                  <label htmlFor="s-loc">Nơi sống</label>
                  <input id="s-loc" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="s-email">Email</label>
                  <input id="s-email" type="email" value={currentUser.email} disabled />
                  <span className="field__hint">Liên hệ hỗ trợ để đổi email đăng nhập.</span>
                </div>
                <div className="field field--full">
                  <label htmlFor="s-bio">Giới thiệu</label>
                  <textarea id="s-bio" rows={4} maxLength={300} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Bạn làm nhạc gì, ở đâu, cảm hứng từ đâu?" />
                  <span className="field__hint">{profile.bio.length}/300</span>
                </div>
              </div>
              <div className="settings__actions"><button type="submit" className="btn btn--primary">Lưu thay đổi</button></div>
            </form>
          )}

          {section === 'appearance' && (
            <div>
              <h2>Giao diện</h2>
              <p className="muted">Thay đổi được áp dụng ngay và lưu trên trình duyệt này.</p>
              <div className="theme-picks" role="radiogroup" aria-label="Chế độ màu">
                {[
                  { id: 'light', label: 'Sáng', icon: Sun },
                  { id: 'dark', label: 'Tối', icon: Moon },
                  { id: 'system', label: 'Theo hệ thống', icon: Monitor },
                ].map(({ id, label, icon: Icon }) => (
                  <button key={id} type="button" role="radio" aria-checked={theme === id} className={`theme-pick theme-pick--${id} ${theme === id ? 'is-checked' : ''}`} onClick={() => setTheme(id)}>
                    <span className="theme-pick__preview"><span /><span /><span /></span>
                    <span className="theme-pick__label"><Icon size={16} /> {label} {theme === id && <Check size={16} />}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {section === 'notifications' && (
            <form onSubmit={save}>
              <h2>Thông báo</h2>
              <Toggle label="Người theo dõi mới" checked={notif.follow} onChange={(v) => setNotif({ ...notif, follow: v })} />
              <Toggle label="Lượt thích và đăng lại" checked={notif.like} onChange={(v) => setNotif({ ...notif, like: v })} />
              <Toggle label="Bình luận trên bài của bạn" checked={notif.comment} onChange={(v) => setNotif({ ...notif, comment: v })} />
              <Toggle label="Bài mới từ nghệ sĩ đang theo dõi" checked={notif.newTrack} onChange={(v) => setNotif({ ...notif, newTrack: v })} />
              <Toggle label="Gửi bản tóm tắt qua email" hint="Mỗi tuần một lần, vào sáng thứ Hai" checked={notif.email} onChange={(v) => setNotif({ ...notif, email: v })} />
              <div className="settings__actions"><button type="submit" className="btn btn--primary">Lưu thay đổi</button></div>
            </form>
          )}

          {section === 'privacy' && (
            <form onSubmit={save}>
              <h2>Quyền riêng tư</h2>
              <Toggle label="Hiện lịch sử nghe trên hồ sơ" checked={privacy.showHistory} onChange={(v) => setPrivacy({ ...privacy, showHistory: v })} />
              <Toggle label="Hiện danh sách bài đã thích" checked={privacy.showLikes} onChange={(v) => setPrivacy({ ...privacy, showLikes: v })} />
              <Toggle label="Cho phép tải xuống bài của tôi" hint="Người nghe có thể tải tệp gốc về máy" checked={privacy.allowDownload} onChange={(v) => setPrivacy({ ...privacy, allowDownload: v })} />
              <div className="danger-zone">
                <div>
                  <strong>Xoá tài khoản</strong>
                  <p className="muted">Toàn bộ bài hát, playlist và bình luận sẽ bị xoá vĩnh viễn.</p>
                </div>
                <button type="button" className="btn btn--danger btn--sm">Xoá tài khoản</button>
              </div>
              <div className="settings__actions"><button type="submit" className="btn btn--primary">Lưu thay đổi</button></div>
            </form>
          )}
        </div>
      </div>

      {toast && <div className="toast" role="status"><Check size={16} /> Đã lưu thay đổi</div>}
    </div>
  );
}
