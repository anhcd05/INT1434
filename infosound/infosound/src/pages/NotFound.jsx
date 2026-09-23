import { Link } from 'react-router-dom';
import { makePeaks } from '../utils/format';

export default function NotFound() {
  const peaks = makePeaks('404', 40).map((p, i) => (i > 14 && i < 26 ? 0.06 : p));
  return (
    <div className="page notfound">
      <div className="notfound__wave" aria-hidden="true">
        {peaks.map((p, i) => <span key={i} style={{ height: `${p * 100}%` }} />)}
      </div>
      <h1>Trang này đang im lặng</h1>
      <p>Đường dẫn không tồn tại hoặc bài hát đã bị người đăng gỡ xuống.</p>
      <Link to="/" className="btn btn--primary">Về trang chủ</Link>
    </div>
  );
}
