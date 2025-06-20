const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  thumbnail: {
    large: {
      type: String,
      default: 'https://res.cloudinary.com/difqelsxz/image/upload/v1750402488/placeholder_xnu6lk.jpg'
    },
    gallery: [String],
  },
});

module.exports = mongoose.model('Blog', blogSchema, 'blogs');
