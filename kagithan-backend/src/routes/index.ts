import express from "express";
import { getAllBlogs, getBlog } from "../controllers/getBlogs";

export const router = express.Router();

router.get("/blogs", getAllBlogs);

router.get("/:blogTitle", getBlog);
