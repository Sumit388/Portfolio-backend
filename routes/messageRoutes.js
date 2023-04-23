import express from "express";
import bodyParser from "body-parser";
import { Message } from "../models/message.js";

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  const { name, email, message } = req.body;
  await Message.create({
    name,
    email,
    message,
  });
  res.json({
    success: true,
    message: "data added successfully.",
  });
});
router.get("/", jsonParser, async (req, res) => {
  const messages = await Message.find({});
  res.json({
    success: true,
    messages,
  });
});

export default router;
