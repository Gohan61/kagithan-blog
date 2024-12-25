import asyncHandler from "express-async-handler";
import * as fs from "node:fs";
import path from "node:path";
import posts from "../posts";

export const getBlog = asyncHandler(async (req, res, next) => {
  const blogTitle = req.params.blogTitle;

  const blogPath = path.join(__dirname, "..", "content", `${blogTitle}`);

  fs.readFile(blogPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(404).send("Could not find blog");
    }

    return res.status(200).set("Content-Type", "text/plain").send(data);
  });
});

export const getAllBlogs = asyncHandler(
  async (req, res, next): Promise<any> => {
    if (!posts) {
      return res.status(404).send("Could not find posts");
    }

    return res.status(200).json({ posts });
  }
);
