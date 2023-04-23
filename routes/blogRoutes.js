import express from "express";
import bodyParser from "body-parser";
import { BlogPost } from "../models/blog.js";

const blog = express.Router();
const jsonParser = bodyParser.json();

blog.get("/",jsonParser, async (req, res) => {
  const blogs = await BlogPost.find({});
  res.json({
    success: true,
    blogs,
  });
});

blog.post("/",jsonParser,async (req,res)=>{
   const {title,author,content, category} = req.body;
  await BlogPost.create({
    title,
    author,
    content,
    category,
   });
   res.json({
    success: true,
    message: "data added successfully."
   });
})

export default blog;