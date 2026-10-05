// API helper for BlogSpace.
// All requests go through here so token handling and error handling
// are written once instead of in every component.

const API_URL = 'http://localhost:5000/api';

const TOKEN_KEY = 'blog_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * Core fetch wrapper.
 * - Attaches the JWT token when present.
 * - Parses JSON responses.
 * - Throws an Error with a friendly message on failure.
 */
async function request(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const token = getToken();

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, config);
  } catch (error) {
    throw new Error('Unable to reach the server. Is the backend running?');
  }

  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    const message = (data && data.message) || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

// AUTH
export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  getMe: () => request('/auth/me'),

  // POSTS
  getPosts: () => request('/posts'),
  getPost: (id) => request(`/posts/${id}`),
  createPost: (payload) => request('/posts', { method: 'POST', body: payload }),
  updatePost: (id, payload) => request(`/posts/${id}`, { method: 'PUT', body: payload }),
  deletePost: (id) => request(`/posts/${id}`, { method: 'DELETE' }),

  // COMMENTS
  getComments: (postId) => request(`/comments/${postId}`),
  addComment: (postId, payload) =>
    request(`/comments/${postId}`, { method: 'POST', body: payload }),
  deleteComment: (id) => request(`/comments/${id}`, { method: 'DELETE' }),
};

export default api;
