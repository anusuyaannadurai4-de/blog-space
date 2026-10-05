import { Link } from 'react-router-dom';

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : '?';
}

export default function PostCard({ post }) {
  const author = post.author || {};
  const preview =
    post.content && post.content.length > 140
      ? `${post.content.slice(0, 140).trim()}...`
      : post.content;

  return (
    <article className="post-card">
      <div className="post-card-body">
        <h3 className="post-card-title">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h3>
        <p className="post-card-preview">{preview}</p>
      </div>

      <div className="post-card-footer">
        <div className="post-card-author">
          <span className="avatar">{getInitial(author.name)}</span>
          <div className="post-card-meta">
            <span className="author-name">{author.name || 'Unknown author'}</span>
            <span className="post-date">{formatDate(post.createdAt)}</span>
          </div>
        </div>
        <Link to={`/post/${post._id}`} className="btn btn-outline btn-sm">
          Read More
        </Link>
      </div>
    </article>
  );
}
