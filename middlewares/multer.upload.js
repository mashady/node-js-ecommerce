import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure 'uploads' directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for readable file names
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = path.parse(file.originalname).name; // Extract original file name without extension
    const safeName = originalName.replace(/\s+/g, "-").toLowerCase(); // Replace spaces with dashes
    const extension = path.extname(file.originalname); // Get file extension
    cb(null, `${safeName}-${timestamp}${extension}`); // Create readable unique filename
  },
});

const upload = multer({ storage });

export default upload;
