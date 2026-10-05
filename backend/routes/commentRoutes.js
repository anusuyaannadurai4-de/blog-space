const express = require('express');
const {
  getCommentsByPost,
  addComment,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:postId').get(getCommentsByPost).post(protect, addComment);
router.route('/:id').delete(protect, deleteComment);

module.exports = router;
