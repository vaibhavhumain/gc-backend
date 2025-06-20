const Blog = require('../models/Blog');
const cloudinary = require('../utils/cloudinary');

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
  const { title, excerpt, author, date, imageBase64 } = req.body;

  try {
    let imageUrl = "";

    if (imageBase64) {
      const uploaded = await cloudinary.uploader.upload(imageBase64, {
        folder: 'gc-blogs'
      });
      imageUrl = uploaded.secure_url;
    }

    const blog = new Blog({
      title,
      excerpt,
      author,
      date,
      thumbnail: { large: imageUrl },
    });

    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Blog upload failed', error);
    res.status(500).json({ error: 'Failed to upload blog' });
  }
};
