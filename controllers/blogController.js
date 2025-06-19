const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    console.log('Sending blogs:', blogs);
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

exports.createBlog = async (req, res) => {
  const { title, excerpt, author, date } = req.body;

  if (!title || !excerpt || !author || !date) {
    return res.status(400).json({ error: 'All fields required' });
  }

  console.log("REQ BODY:", req.body);

  try {
    const blog = new Blog({ title, excerpt, author, date });
    const saved = await blog.save(); // ✅ define before logging
    console.log("SAVED BLOG:", saved); // ✅ log after saving
    res.status(201).json(saved);
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ error: 'Failed to save blog' });
  }
};
