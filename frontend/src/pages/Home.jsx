import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">BlogSpace</span>
          <h1>Share your ideas with the world.</h1>
          <p className="hero-subtitle">
            Write, publish, and connect through meaningful stories.
          </p>
          <div className="hero-actions">
            <Link to="/create" className="btn btn-primary">
              Start Writing
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Latest Posts</h2>
        </div>

        {loading && <Loading text="Loading posts..." />}

        {!loading && error && <div className="alert alert-error">{error}</div>}

        {!loading && !error && posts.length === 0 && (
          <div className="empty-state">
            <h3>Be the first to publish a post!</h3>
            <p>Your story could be the one that starts it all.</p>
            <Link to="/create" className="btn btn-primary">
              Write your first post
            </Link>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
