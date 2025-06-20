const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },

  thumbnail: {
    large: { type: String, default: '/images/placeholder.jpg' },
    gallery: [String], 
    },
});

module.exports = mongoose.model('Blog', blogSchema, 'blogs');
