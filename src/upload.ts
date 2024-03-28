const multer = require("multer");
var fs = require("fs"); var dir = "./temp";   // PATH TO UPLOAD FILE
if (!fs.existsSync(dir)) {  // CREATE DIRECTORY IF NOT FOUND
    fs.mkdirSync(dir, { recursive: true });
}
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: fileStorageEngine }).single("file");
const uploadMultiple = multer({ storage: fileStorageEngine }).array("file");

module.exports = { upload, uploadMultiple };