const Response = require("../response");

// Returns a list of URIs of newly-added images
module.exports.uploadImage = (req, res, next) => {
  const images = req.files;
  const imageURIs = [];
  for (var i = 0; i < images.length; i++) {
    imageURIs.push(images[i].path);
  }
  const response = new Response(200, "Images were saved", {
    imageURIs: imageURIs,
  });

  res.status(response.code).json(response);
};

module.exports.uploadGameFolder = (req, res, next) => {};
