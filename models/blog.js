const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: "" },
    paragraphs: { type: [String], required: true }, // Array of paragraphs
    excerpt: { type: String, default: "" },
    author: { type: String, default: "Admin" },
    category: { type: String, default: "" },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
