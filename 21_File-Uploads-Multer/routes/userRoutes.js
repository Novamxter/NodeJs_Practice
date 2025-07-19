const upload = require("../middleware/uploads");
const express = require("express");

const router = express.Router();

// Upload single file with key name "profile"
router.post("/upload-profile", upload.single("profile"), (req, res) => {
  if (!req.file) return res.status(404).json({message:"No file Uploaded"})

  res.json({
    message:"File uploaded Successfully",
    filepath: `/uploads/${req.file.filename}`
  })
});

module.exports = router