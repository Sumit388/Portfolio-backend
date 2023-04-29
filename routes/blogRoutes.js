import express from "express";
import bodyParser from "body-parser";
import { BlogPost } from "../models/blog.js";

const blog = express.Router();
const jsonParser = bodyParser.json();

//Get request
blog.get("/", jsonParser, async (req, res) => {
  try {
    const blogs = await BlogPost.find({});
    if (!blogs) {
      return res.status(404).send("Blog not found");
    }
    res.json({
      success: true,
      blogs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Post request
blog.post("/", jsonParser, async (req, res) => {
  const { title, author, content, category } = req.body;
  try {
    await BlogPost.create({
      title,
      author,
      content,
      category,
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

export default blog;
