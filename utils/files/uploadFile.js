/**
 * Here you have methods that will store files in the  system
 */
const fs = require("fs");

/**
 *
 * @param {String} foldername foldername from the root folder of the application
 * @returns Boolean that indicates whether the folder did exist origially
 */
module.exports.createFolderIfDoesNotExist = (foldername) => {
  if (!fs.existsSync(foldername)) {
    fs.mkdirSync(foldername);
    return false;
  }

  return true;
};

module.exports.getNumberOfFilesInFolder = (foldername) => {
  const files = fs.readdirSync(foldername);
  return files.length;
};
