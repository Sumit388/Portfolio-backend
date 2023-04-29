import express from "express";
import bodyParser from "body-parser";
import { Message } from "../models/message.js";

const router = express.Router();
const jsonParser = bodyParser.json();

//Post request
router.post("/", jsonParser, async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await Message.create({
      name,
      email,
      message,
    });
    res.json({
      success: true,
      message: "data added successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Get request
router.get("/", jsonParser, async (req, res) => {
  try {
    const messages = await Message.find({});
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
