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

  console.log("🔵 Incoming blog:", req.body);

  if (!title || !excerpt || !author || !date) {
    console.log("❌ Missing fields");
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const blog = new Blog({ title, excerpt, author, date });
    const saved = await blog.save();
    console.log("✅ Saved blog:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("🔥 Save error:", err);
    res.status(500).json({ error: 'Failed to save blog' });
  }
};
