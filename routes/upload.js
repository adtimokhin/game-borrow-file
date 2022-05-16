/**
 * Uploading files to the server
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/uploadFiles");

const multer = require("multer");

const fs = require("fs");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // generating folders to store files in appropriate locations
    const publisherId = req.body.publisherId;
    const gameId = req.body.gameId;

    const gameFolder = path.join("data", "images", publisherId, gameId);

    if (!fs.existsSync(gameFolder)) {
      // Checking whether a publisher folder exist
      const publisherFolder = path.join("data", "images", publisherId);
      if (!fs.existsSync(publisherFolder)) {
        // If no - we will generate it first
        fs.mkdirSync(publisherFolder);
      }
      fs.mkdirSync(gameFolder);
    }

    cb(null, gameFolder);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const imagesUpload = multer({ storage: imageStorage });

// Max of 5 images can be send per request
// Will return a list of URIs to find the images
// TODO: stop the program from automatically adding files to the folders. Add some kind of verifiaction
router.post("/images", imagesUpload.array("images", 5), controller.uploadImage);

module.exports = router;
