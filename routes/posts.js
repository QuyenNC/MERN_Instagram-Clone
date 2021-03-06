const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { protect } = require('../middlewares/auth');
const checkObjectId = require('../middlewares/checkObjectId');

const {
  createPost,
  getPosts,
  getPostsMe,
  getPostsUser,
  getPost,
  deletePost,
  likePost,
  commentPost,
  delCommentPost,
} = require('../controllers/posts');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  protect,
  [check('text', 'Text is required').not().isEmpty()],
  createPost
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getPosts);

// @route   GET api/posts/me
// @desc    Get all posts of user logged in
// @access  Private
router.get('/me', protect, getPostsMe);

// @route   GET api/posts/me
// @desc    Get all posts of user
// @access  Public
router.get('/user/:id', checkObjectId('id'), getPostsUser);

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', checkObjectId('id'), getPost);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', protect, checkObjectId('id'), deletePost);

// @route   PUT api/posts/like/:id
// @desc    Like and unlike a post
// @access  Private
router.put('/like/:id', protect, checkObjectId('id'), likePost);

// @route   PUT api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.put(
  '/comment/:id',
  protect,
  checkObjectId('id'),
  [check('text', 'Text is required').not().isEmpty()],
  commentPost
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment on a post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  protect,
  checkObjectId('id'),
  checkObjectId('comment_id'),
  delCommentPost
);

module.exports = router;
