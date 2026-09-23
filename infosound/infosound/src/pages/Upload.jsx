import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, CloudUpload, FileAudio, Globe, Lock, X } from 'lucide-react';
import { moods } from '../data/mock';
import { makePeaks } from '../utils/format';
import Cover from '../components/Cover';

const ACCEPT = '.mp3,.wav,.flac,.aiff,.ogg,.m4a';
const MAX_MB = 200;

export default function Upload() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({ title: '', genre: '', description: '', privacy: 'public' });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);

  const pick = (f) => {
    if (!f) return;
    const ext = '.' + f.name.split('.').pop().toLowerCase();
    if (!ACCEPT.split(',').includes(ext)) {
      setError(`Định dạng ${ext} chưa được hỗ trợ. Hãy chọn tệp MP3, WAV, FLAC, AIFF, OGG hoặc M4A.`);
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`Tệp nặng hơn ${MAX_MB} MB. Hãy nén lại hoặc xuất ở chất lượng thấp hơn.`);
      return;
    }
    setError('');
    setFile(f);
    setForm((s) => ({ ...s, title: s.title || f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') }));
  };

  const addTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().replace(/^#/, '').toLowerCase();
      if (!tags.includes(t) && tags.length < 5) setTags([...tags, t]);
      setTagInput('');
    }
  };

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!form.title.trim() || !form.genre) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="page upload-done">
        <CheckCircle2 size={40} />
        <h1>Đã đăng “{form.title}”</h1>
        <p>Bài hát đang được xử lý dạng sóng. {form.privacy === 'public' ? 'Người theo dõi sẽ thấy bài trong bảng tin sau vài phút.' : 'Chỉ bạn nhìn thấy bài này.'}</p>
        <div className="upload-done__actions">
          <Link to="/artist/chu-duc-anh" className="btn btn--primary">Xem trên hồ sơ</Link>
          <button type="button" className="btn btn--outline" onClick={() => { setDone(false); setFile(null); setTags([]); setTouched(false); setForm({ title: '', genre: '', description: '', privacy: 'public' }); }}>
            Tải lên bài khác
          </button>
        </div>
      </div>
    );
  }

  const peaks = makePeaks(file?.name ?? 'preview', 60);

  return (
    <div className="page page--narrow">
      <div className="page-head">
        <h1>Tải lên bài hát</h1>
        <p>Chia sẻ bản thu của bạn. Người nghe có thể bình luận ngay tại từng giây trên dạng sóng.</p>
      </div>

      {!file ? (
        <>
          <div
            className={`dropzone ${dragging ? 'is-drag' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); pick(e.dataTransfer.files[0]); }}
          >
            <CloudUpload size={40} />
            <h2>Kéo tệp âm thanh vào đây</h2>
            <p>MP3, WAV, FLAC, AIFF, OGG hoặc M4A, tối đa {MAX_MB} MB</p>
            <button type="button" className="btn btn--primary" onClick={() => inputRef.current.click()}>Chọn tệp từ máy</button>
            <input ref={inputRef} type="file" accept={ACCEPT} hidden onChange={(e) => pick(e.target.files[0])} />
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <p className="fine">Khi tải lên, bạn xác nhận mình sở hữu hoặc có quyền chia sẻ bản thu này.</p>
        </>
      ) : (
        <form className="upload" onSubmit={submit} noValidate>
          <div className="upload__file">
            <FileAudio size={22} />
            <div>
              <strong>{file.name}</strong>
              <span className="muted">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
            </div>
            <div className="upload__mini-wave" aria-hidden="true">
              {peaks.map((p, i) => <span key={i} style={{ height: `${p * 100}%` }} />)}
            </div>
            <button type="button" className="icon-btn" aria-label="Bỏ tệp này" onClick={() => setFile(null)}><X size={18} /></button>
          </div>

          <div className="upload__grid">
            <div className="upload__cover">
              <Cover seed={form.title || 'new'} />
              <p className="fine">Ảnh bìa được tạo từ tên bài. Đổi tên để có ảnh bìa khác.</p>
            </div>

            <div className="upload__fields">
              <div className="field">
                <label htmlFor="title">Tên bài hát</label>
                <input id="title" value={form.title} onChange={update('title')} maxLength={100} aria-invalid={touched && !form.title.trim()} />
                {touched && !form.title.trim() && <span className="field__error">Nhập tên bài hát.</span>}
              </div>

              <div className="field">
                <label htmlFor="genre">Thể loại</label>
                <select id="genre" value={form.genre} onChange={update('genre')} aria-invalid={touched && !form.genre}>
                  <option value="">Chọn thể loại</option>
                  {moods.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                  <option value="Khác">Khác</option>
                </select>
                {touched && !form.genre && <span className="field__error">Chọn một thể loại để người nghe dễ tìm thấy bài.</span>}
              </div>

              <div className="field">
                <label htmlFor="tags">Thẻ <span className="muted">(tối đa 5, nhấn Enter để thêm)</span></label>
                <div className="tag-input">
                  {tags.map((t) => (
                    <span key={t} className="chip chip--outline">
                      #{t}
                      <button type="button" aria-label={`Xoá thẻ ${t}`} onClick={() => setTags(tags.filter((x) => x !== t))}><X size={12} /></button>
                    </span>
                  ))}
                  <input id="tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={addTag} placeholder={tags.length ? '' : 'edm, futurebass, festival'} disabled={tags.length >= 5} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="desc">Mô tả</label>
                <textarea id="desc" rows={4} value={form.description} onChange={update('description')} maxLength={500} placeholder="Bài hát này ra đời thế nào?" />
                <span className="field__hint">{form.description.length}/500</span>
              </div>

              <fieldset className="field">
                <legend>Ai có thể nghe</legend>
                <div className="radio-cards">
                  <label className={`radio-card ${form.privacy === 'public' ? 'is-checked' : ''}`}>
                    <input type="radio" name="privacy" value="public" checked={form.privacy === 'public'} onChange={update('privacy')} />
                    <Globe size={18} />
                    <span><strong>Công khai</strong><small>Mọi người đều nghe được</small></span>
                  </label>
                  <label className={`radio-card ${form.privacy === 'private' ? 'is-checked' : ''}`}>
                    <input type="radio" name="privacy" value="private" checked={form.privacy === 'private'} onChange={update('privacy')} />
                    <Lock size={18} />
                    <span><strong>Riêng tư</strong><small>Chỉ bạn và người có liên kết</small></span>
                  </label>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="upload__submit">
            <button type="button" className="btn btn--quiet" onClick={() => setFile(null)}>Huỷ</button>
            <button type="submit" className="btn btn--primary btn--lg">Đăng bài hát</button>
          </div>
        </form>
      )}
    </div>
  );
}
