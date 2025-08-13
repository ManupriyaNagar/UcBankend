const Blog = require("../models/blog.js");
const multer = require("multer");
const path = require("path");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// @desc    Get all blogs
// @route   GET /api/blog
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new blog (for admin)
// @route   POST /api/blog/admin/add
const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, author, category, tags, status } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Convert content to paragraphs array
    const paragraphs = content.split('\n').filter(p => p.trim() !== '');
    
    const blogData = {
      title,
      paragraphs,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      excerpt,
      author: author || "Admin",
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status: status || "draft"
    };

    const blog = new Blog(blogData);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a blog by ID
// @route   DELETE /api/blog/admin/delete/:id
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBlogs,
  createBlog,
  deleteBlog,
  upload
};