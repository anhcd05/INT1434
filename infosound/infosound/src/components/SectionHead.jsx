import { Link } from 'react-router-dom';

export default function SectionHead({ title, sub, to, linkText = 'Xem tất cả' }) {
  return (
    <div className="shead">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {to && <Link to={to} className="shead__link">{linkText}</Link>}
    </div>
  );
}
