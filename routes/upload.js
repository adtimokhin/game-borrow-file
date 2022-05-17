/**
 * Uploading files to the server
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/uploadFiles");

const multer = require("multer");

const fs = require("fs");
const path = require("path");
const {
  createFolderIfDoesNotExist,
  getNumberOfFilesInFolder,
} = require("../utils/files/uploadFile");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // generating folders to store files in appropriate location
    const publisherId = req.body.publisherId;
    const gameId = req.body.gameId;

    const publisherFolder = path.join("data", "images", publisherId);
    createFolderIfDoesNotExist(publisherFolder);
    const gameFolder = path.join("data", "images", publisherId, gameId);
    createFolderIfDoesNotExist(gameFolder);


    cb(null, gameFolder);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

// This filter only allows images to be stored in data/images directory. Max of 10 per game
const imageFilter = (req, file, cb) => {
  // We want to store only image files
  if (
    !(
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    )
  ) {
    cb(null, false); // We do not want to accept this file
  } else {
    // TODO: add a limit to how many images can be associated with a single gameId
    cb(null, true); // We want to accept this file
  }
};

const imagesUpload = multer({ storage: imageStorage, fileFilter: imageFilter });

// Max of 10 images can be send per request
// Will return a list of URIs to find the images
router.post(
  "/images",
  imagesUpload.array("images", 10),
  controller.uploadImage
);

module.exports = router;
