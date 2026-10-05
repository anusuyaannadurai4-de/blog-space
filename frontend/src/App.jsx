import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetails from './pages/PostDetails';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route
            path="*"
            element={
              <div className="page">
                <div className="empty-state">
                  <h3>Page not found</h3>
                  <p>The page you are looking for does not exist.</p>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="footer">
        <p>BlogSpace &copy; {new Date().getFullYear()} · Share your ideas. Inspire others.</p>
      </footer>
    </div>
  );
}
