// posts routes
import express from "express";
import { Post } from "./../db/models";
const router = express.Router();

/**
 * CreatePost endpoint
 * @route POST /p
 * @desc Create a post
 * @access Public
 */
router.post("/", async (req, res, next) => {});

/**
 * FindAllPosts endpoint
 * @route GET /p
 * @desc Find all posts
 * @access Public
 */
router.get("/", async (req, res, next) => {});

/**
 * DeletePost endpoint
 * @route DELETE /p/:postId
 * @desc Delete a post
 * @access Public
 */
router.delete("/:postId", async (req, res, next) => {});

export default router;
