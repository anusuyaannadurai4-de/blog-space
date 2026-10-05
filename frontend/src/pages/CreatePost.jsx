import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
      const post = await api.createPost({
        title: form.title.trim(),
        content: form.content.trim(),
      });
      navigate(`/post/${post._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="editor-card">
        <h1>Create a new post</h1>
        <p className="auth-subtitle">Share something worth reading.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="My First Blog"
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
              placeholder="Write your story here..."
            />
            <span className="field-hint">{form.content.length} characters</span>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Publishing...' : 'Publish Post'}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
