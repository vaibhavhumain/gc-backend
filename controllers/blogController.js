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
  console.log("🔥 /api/blogs hit with body:", req.body);
  const { title, excerpt, author, date, imageBase64 } = req.body;

  console.log("📝 Received blog data:", { title, excerpt, author, date });
  if (!title || !excerpt || !author || !date) {
    return res.status(400).json({ error: 'All fields (title, excerpt, author, date) are required' });
  }

  try {
    let imageUrl = "";

    if (imageBase64 && imageBase64.startsWith('data:image')) {
      console.log("🖼 Uploading image to Cloudinary...");
      const uploaded = await cloudinary.uploader.upload(imageBase64, {
        folder: 'gc-blogs'
      });
      imageUrl = uploaded.secure_url;
      console.log("✅ Uploaded image URL:", imageUrl);
    } else {
      console.log("⚠️ No valid imageBase64 provided.");
    }

    const blog = new Blog({
      title,
      excerpt,
      author,
      date,
      thumbnail: { large: imageUrl },
    });

    console.log("📦 Saving blog to DB...");
    const saved = await blog.save();
    console.log("✅ Blog saved:", saved);

    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Blog creation failed:', error);
    res.status(500).json({ error: 'Failed to upload blog' });
  }
};

exports.deleteAllBlogs = async (req, res) => {
  try {
    const result = await Blog.deleteMany({});
    console.log(`🗑 Deleted ${result.deletedCount} blogs from DB.`);
    res.status(200).json({ message: `${result.deletedCount} blogs deleted successfully.` });
  } catch (error) {
    console.error('❌ Failed to delete blogs:', error);
    res.status(500).json({ error: 'Failed to delete all blogs' });
  }
};
