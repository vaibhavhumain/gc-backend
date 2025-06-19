const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  author: String,
  date: String,
});

module.exports = mongoose.model('Blog', blogSchema);
