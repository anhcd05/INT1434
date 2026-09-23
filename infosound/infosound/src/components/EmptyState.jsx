import { Link } from 'react-router-dom';

export default function EmptyState({ icon: Icon, title, text, action, to }) {
  return (
    <div className="empty">
      {Icon && <Icon size={28} />}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {action && to && <Link to={to} className="btn btn--primary">{action}</Link>}
    </div>
  );
}
