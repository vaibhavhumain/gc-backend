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
  const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !excerpt || !author || !date) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const blog = new Blog({
      title,
      excerpt,
      author,
      date,
      thumbnail: {
        large: thumbnail || '/images/placeholder.jpg'
      },
    });

    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save blog' });
  }
};
 