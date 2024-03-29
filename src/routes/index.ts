import express from "express";
import multer from 'multer';
import UploadController from "../controller/upload";

export const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const base = "/mevo";
router.get("/v1/check", (req, res) => {
  res.status(200).end();
});

router.post("/upload",  upload.single('csvfile'), UploadController.uploadFile)