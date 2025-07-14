// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === "resume" ? "uploads/resumes" : "uploads/portfolios";
    fs.mkdirSync(folder, { recursive: true }); // Auto create folder if missing
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "_" + file.originalname.replace(/\s/g, '_');
    cb(null, filename);
  }
});

const upload = multer({ storage });

module.exports = upload;
