const fs = require('fs');

exports.deleteFiles = (filePath) => {
  fs.unlink(filePath, (err) => {
    throw err;
  });
};
