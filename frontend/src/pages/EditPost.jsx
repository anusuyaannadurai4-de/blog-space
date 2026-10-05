import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await api.getPost(id);
        const post = data.post;

        if (!post) {
          setError('Post not found.');
          return;
        }

        if (post.author && user && post.author._id !== user.id) {
          setError('You are not authorized to edit this post.');
          return;
        }

        setForm({ title: post.title, content: post.content });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Please enter a title.');
      return;
    }
    if (!form.content.trim()) {
      setError('Please enter your post content.');
      return;
    }

    setSubmitting(true);
    try {
      await api.updatePost(id, {
        title: form.title.trim(),
        content: form.content.trim(),
      });
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading text="Loading post..." />;
  }

  return (
    <div className="page">
      <div className="editor-card">
        <h1>Edit post</h1>
        <p className="auth-subtitle">Update your story and save the changes.</p>

        {error && <div className="alert alert-error">{error}</div>}

        {!error && (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                maxLength={150}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                rows={12}
                value={form.content}
                onChange={handleChange}
              />
              <span className="field-hint">{form.content.length} characters</span>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Post'}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate(`/post/${id}`)}
                disabled={submitting}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
