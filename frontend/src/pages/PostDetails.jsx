import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import Comment from '../components/Comment';

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : '?';
}

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await api.getPost(id);
        setPost(data.post);
        setComments(data.comments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const isAuthor = post && post.author && user && post.author._id === user.id;
  const wasEdited =
    post && post.createdAt && post.updatedAt && post.updatedAt !== post.createdAt;

  const handleDeletePost = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post? This will also delete all comments.'
    );
    if (!confirmed) return;

    setDeletingPost(true);
    try {
      await api.deletePost(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setDeletingPost(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    setCommentError('');

    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty.');
      return;
    }

    setAddingComment(true);
    try {
      const newComment = await api.addComment(id, { text: commentText.trim() });
      setComments([newComment, ...comments]);
      setCommentText('');
    } catch (err) {
      setCommentError(err.message);
    } finally {
      setAddingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm('Delete this comment?');
    if (!confirmed) return;

    try {
      await api.deleteComment(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      setCommentError(err.message);
    }
  };

  if (loading) {
    return <Loading text="Loading post..." />;
  }

  if (error && !post) {
    return (
      <div className="page">
        <div className="alert alert-error">{error}</div>
        <Link to="/" className="btn btn-outline">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page">
        <div className="empty-state">
          <h3>Post not found</h3>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <article className="post-detail">
        <Link to="/" className="back-link">
          &larr; Back to posts
        </Link>

        <h1 className="post-detail-title">{post.title}</h1>

        <div className="post-detail-meta">
          <span className="avatar">{getInitial(post.author?.name)}</span>
          <div className="post-card-meta">
            <span className="author-name">{post.author?.name || 'Unknown author'}</span>
            <span className="post-date">
              Published {formatDate(post.createdAt)}
              {wasEdited && ` · Updated ${formatDate(post.updatedAt)}`}
            </span>
          </div>
        </div>

        {isAuthor && (
          <div className="post-detail-actions">
            <Link to={`/edit/${post._id}`} className="btn btn-outline btn-sm">
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={handleDeletePost}
              disabled={deletingPost}
            >
              {deletingPost ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}

        <div className="post-detail-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="comments-section">
        <h2>
          Comments <span className="comments-count">({comments.length})</span>
        </h2>

        {user ? (
          <form className="comment-form" onSubmit={handleAddComment} noValidate>
            {commentError && <div className="alert alert-error">{commentError}</div>}
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={addingComment}>
                {addingComment ? 'Adding comment...' : 'Add Comment'}
              </button>
            </div>
          </form>
        ) : (
          <div className="login-prompt">
            <Link to="/login">Login</Link> to join the conversation.
          </div>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="comments-empty">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} onDelete={handleDeleteComment} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
