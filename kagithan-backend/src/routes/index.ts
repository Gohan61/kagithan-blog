import express from "express";
import { getBlog } from "../controllers/getBlogs";

export const router = express.Router();

router.get("/:blog", getBlog);
