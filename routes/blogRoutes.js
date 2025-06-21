const express = require('express');
const { getAllBlogs, createBlog, deleteAllBlogs , getSingleBlog } = require('../controllers/blogController');

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getSingleBlog);
router.post('/', createBlog);
router.delete('/delete-all', deleteAllBlogs); 

module.exports = router;
