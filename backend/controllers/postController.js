const Post = require('../models/Post');
const Comment = require('../models/Comment');

/**
 * @desc    Get all posts (newest first)
 * @route   GET /api/posts
 * @access  Public
 */
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single post with its comments (newest first)
 * @route   GET /api/posts/:id
 * @access  Public
 */
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    const comments = await Comment.find({ post: post._id })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ post, comments });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private
 */
const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !title.trim()) {
      res.status(400);
      throw new Error('Please enter a title');
    }

    if (!content || !content.trim()) {
      res.status(400);
      throw new Error('Please enter your post content');
    }

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: req.user._id,
    });

    const populated = await post.populate('author', 'name email');

    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a post (owner only)
 * @route   PUT /api/posts/:id
 * @access  Private
 */
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You are not authorized to edit this post');
    }

    const { title, content } = req.body;

    if (!title || !title.trim()) {
      res.status(400);
      throw new Error('Please enter a title');
    }

    if (!content || !content.trim()) {
      res.status(400);
      throw new Error('Please enter your post content');
    }

    post.title = title.trim();
    post.content = content.trim();

    const updated = await post.save();
    const populated = await updated.populate('author', 'name email');

    res.status(200).json(populated);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a post and all of its comments (owner only)
 * @route   DELETE /api/posts/:id
 * @access  Private
 */
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You are not authorized to delete this post');
    }

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    res.status(200).json({ message: 'Post deleted successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
