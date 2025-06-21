const express = require('express');
const { getAllBlogs, createBlog, deleteAllBlogs } = require('../controllers/blogController');

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', createBlog);
router.delete('/delete-all', deleteAllBlogs); 

module.exports = router;
