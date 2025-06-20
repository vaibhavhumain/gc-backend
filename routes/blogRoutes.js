const express = require('express');
const { getAllBlogs, createBlog } = require('../controllers/blogController');
const upload = require('../middleware/upload');

const router = express.Router();
router.get('/', getAllBlogs);
router.post('/', upload.single('thumbnail'), createBlog);

module.exports = router;
