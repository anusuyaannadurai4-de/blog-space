import { useAuth } from '../context/AuthContext';

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : '?';
}

export default function Comment({ comment, onDelete }) {
  const { user } = useAuth();
  const author = comment.author || {};
  const isOwner = user && author._id && user.id === author._id;

  return (
    <div className="comment">
      <span className="avatar avatar-sm">{getInitial(author.name)}</span>
      <div className="comment-main">
        <div className="comment-head">
          <span className="author-name">{author.name || 'Unknown author'}</span>
          <span className="post-date">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="comment-text">{comment.text}</p>
        {isOwner && (
          <button
            type="button"
            className="btn-link danger"
            onClick={() => onDelete(comment._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
