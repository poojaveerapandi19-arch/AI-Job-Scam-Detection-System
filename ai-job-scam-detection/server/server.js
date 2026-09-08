const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  dest: "uploads/",
});

app.get("/", (req, res) => {
  res.json({
    message: "JobShield AI Backend is running successfully!",
  });
});

app.post("/upload", upload.single("jobNotice"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No job vacancy file uploaded",
      });
    }

    console.log("Uploaded file:", req.file.originalname);

    res.json({
      success: true,
      message: "Job vacancy uploaded successfully",
      fileName: req.file.originalname,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "File upload failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});