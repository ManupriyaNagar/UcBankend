const express = require("express");
const { getBlogs, createBlog, deleteBlog, upload } = require("../controllers/blogController.js");

const router = express.Router();

// Get all blog posts (for frontend)
router.get("/", getBlogs);

// Admin routes
router.post("/admin/add", upload.single("image"), createBlog);
router.delete("/admin/delete/:id", deleteBlog);

module.exports = router;
