const express = require('express');
const { getAllBlogs, createBlog } = require('../controllers/blogController');

const router = express.Router();
router.get('/', getAllBlogs);
router.post('/', createBlog);

module.exports = router;
