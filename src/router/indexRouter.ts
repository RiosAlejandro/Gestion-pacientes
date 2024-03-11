import express from "express";
import indexService from "../services/indexServices";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(indexService.getPacientes());
});


export default router;
