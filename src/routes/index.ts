import express from "express";
// import qd from "../controller/upload";

export const router = express.Router();

const base = "/mevo";
router.get("/v1/check", (req, res) => {
  res.status(200).end();
});