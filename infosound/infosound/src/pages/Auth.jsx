import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '../components/Logo';
import { makePeaks } from '../utils/format';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', password: '', agree: false });
  const [errors, setErrors] = useState({});
  const peaks = makePeaks('auth-wave', 48);
  const isLogin = mode === 'login';

  const set = (k) => (e) => setValues({ ...values, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!isLogin && !values.name.trim()) err.name = 'Nhập tên hiển thị.';
    if (!EMAIL_RE.test(values.email)) err.email = 'Email chưa đúng định dạng, ví dụ ten@gmail.com.';
    if (values.password.length < 8) err.password = 'Mật khẩu cần ít nhất 8 ký tự.';
    if (!isLogin && !values.agree) err.agree = 'Cần đồng ý với điều khoản để tạo tài khoản.';
    setErrors(err);
    if (Object.keys(err).length === 0) navigate('/');
  };

  const switchMode = (m) => {
    setMode(m);
    setErrors({});
  };

  return (
    <div className="auth">
      <div className="auth__art" aria-hidden="true">
        <Logo size={40} />
        <div className="auth__wave">
          {peaks.map((p, i) => <span key={i} style={{ height: `${p * 100}%`, animationDelay: `${(i % 12) * 90}ms` }} />)}
        </div>
        <p className="auth__quote">Hơn 12 nghìn nghệ sĩ độc lập đang đăng bản thu mới mỗi tuần.</p>
      </div>

      <div className="auth__panel">
        <Link to="/" className="auth__mobile-logo"><Logo /></Link>
        <div className="auth__switch" role="tablist" aria-label="Chọn hình thức">
          <button type="button" role="tab" aria-selected={isLogin} className={isLogin ? 'is-active' : ''} onClick={() => switchMode('login')}>Đăng nhập</button>
          <button type="button" role="tab" aria-selected={!isLogin} className={!isLogin ? 'is-active' : ''} onClick={() => switchMode('register')}>Tạo tài khoản</button>
        </div>

        <h1>{isLogin ? 'Chào mừng bạn quay lại' : 'Bắt đầu nghe và chia sẻ'}</h1>
        <p className="muted">{isLogin ? 'Đăng nhập để tiếp tục bảng tin và thư viện của bạn.' : 'Tạo tài khoản miễn phí để thích, bình luận và tải lên bài hát.'}</p>

        <button type="button" className="btn btn--outline btn--block" onClick={() => navigate('/')}>Tiếp tục với Google</button>
        <div className="divider"><span>hoặc dùng email</span></div>

        <form onSubmit={submit} noValidate className="auth__form">
          {!isLogin && (
            <div className="field">
              <label htmlFor="name">Tên hiển thị</label>
              <input id="name" value={values.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
              {errors.name && <span className="field__error">{errors.name}</span>}
            </div>
          )}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={values.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} />
            {errors.email && <span className="field__error">{errors.email}</span>}
          </div>
          <div className="field">
            <div className="field__row">
              <label htmlFor="password">Mật khẩu</label>
              {isLogin && <button type="button" className="link-btn">Quên mật khẩu?</button>}
            </div>
            <div className="input-icon">
              <input id="password" type={show ? 'text' : 'password'} value={values.password} onChange={set('password')} autoComplete={isLogin ? 'current-password' : 'new-password'} aria-invalid={!!errors.password} />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                {show ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && <span className="field__error">{errors.password}</span>}
          </div>
          {!isLogin && (
            <label className="check">
              <input type="checkbox" checked={values.agree} onChange={set('agree')} />
              <span>Tôi đồng ý với Điều khoản sử dụng và Chính sách quyền riêng tư của InfoSound</span>
            </label>
          )}
          {errors.agree && <span className="field__error">{errors.agree}</span>}
          <button type="submit" className="btn btn--primary btn--block btn--lg">{isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}</button>
        </form>

        <p className="auth__alt">
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
          <button type="button" className="link-btn" onClick={() => switchMode(isLogin ? 'register' : 'login')}>
            {isLogin ? 'Tạo tài khoản' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  );
}
