const Comment = require('../models/Comment');
const Post = require('../models/Post');

/**
 * @desc    Get all comments for a post (newest first)
 * @route   GET /api/comments/:postId
 * @access  Public
 */
const getCommentsByPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a comment to a post
 * @route   POST /api/comments/:postId
 * @access  Private
 */
const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      res.status(400);
      throw new Error('Comment cannot be empty');
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    const comment = await Comment.create({
      text: text.trim(),
      post: post._id,
      author: req.user._id,
    });

    const populated = await comment.populate('author', 'name email');

    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a comment (owner only)
 * @route   DELETE /api/comments/:id
 * @access  Private
 */
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You are not authorized to delete this comment');
    }

    await comment.deleteOne();

    res.status(200).json({ message: 'Comment deleted successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCommentsByPost, addComment, deleteComment };
