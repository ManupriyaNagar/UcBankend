const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subfolder = "general";
    if (file.fieldname === "resume") subfolder = "resumes";
    else if (file.fieldname === "portfolio") subfolder = "portfolios";

    cb(null, path.join("uploads", subfolder));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


const upload = multer({ storage });

module.exports = upload;


