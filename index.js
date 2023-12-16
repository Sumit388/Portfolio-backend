import express from "express";
import mongoose from "mongoose";
import messageRoute from "./routes/messageRoutes.js";
import blogRoute from "./routes/blogRoutes.js";
import singleBlogRoutes from "./routes/singleBlogRoutes.js";
import user from "./routes/user.js";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://sumitmishra388:Sumit388%40@cluster0.g7rau4k.mongodb.net/test",
    {
      dbName: "Portfolio",
    }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.log("error");
  });

const app = express();
app.listen(5000,()=>{
    console.log("Server is working");
})
app.use(cors());
app.use("/api/v1/message",messageRoute);
app.use("/api/v1/blog",blogRoute);
app.use("/api/v1/blog",singleBlogRoutes);
app.use("/api/v1/user",user);


