import express from "express";
import { BlogPost } from "../models/blog.js";
import bodyParser from "body-parser";

const blog = express.Router();
const jsonParser = bodyParser.json();

//Get request
blog.get("/:id",jsonParser, async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.send(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Patch request
blog.patch("/:id",jsonParser, async (req, res) => {
    const id = req.params.id;
    const blogData = req.body;
    try{
        const blog= await BlogPost.findByIdAndUpdate(id,{ $set: blogData },{ new: true });
        if(!blog){
            return res.status(404).send("Blog not found");
        }
        res.send(blog);
    }
    catch{
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

export default blog;
