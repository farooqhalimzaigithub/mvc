const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store images in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original filename for storing
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
// after that you can import then use it like
const express = require("express");
const app = express();
const upload = require("./Helper/helper");

// Endpoint for image upload
app.post(
  "/upload",
  upload.fields([
    { name: "cnic_front", maxCount: 1 }, // Allow only one image for cnic_front
    { name: "cnic_back", maxCount: 1 }, // Allow only one image for cnic_back
  ]),
  (req, res) => {
    const { dob, name, contact } = req.body;

    // Check if all required fields are present
    if (!dob || !name || !contact) {
      return res.status(400).send("Missing required fields.");
    }

    // Check if images are uploaded
    if (!req.files || !req.files["cnic_front"] || !req.files["cnic_back"]) {
      return res.status(400).send("Both CNIC images are required.");
    }

    // Get the filenames of the uploaded images
    const cnicFrontImage = req.files["cnic_front"][0].originalname;
    const cnicBackImage = req.files["cnic_back"][0].originalname;

    // Process and store the images and other data as needed
    // For now, just sending a success response
    res.status(200).send("Images and data uploaded successfully.");
  }
);

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// =========================also for single image======================================
// Endpoint for image upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image uploaded.");
  }

  res.status(200).send("Image uploaded successfully.");
});
