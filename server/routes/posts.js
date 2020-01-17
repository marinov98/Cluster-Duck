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
router.post("/", async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);
    return res.status(200).json(newPost);
  } catch (err) {
    next(err);
  }
});

/**
 * FindAllPosts endpoint
 * @route GET /p
 * Find all posts
 * @access Public
 */
router.get("/", async (req, res, next) => {
  try {
    const allPosts = await Post.find();
    return res.status(200).json(allPosts);
  } catch (err) {
    next(err);
  }
});

/**
 * Get Single Post endpoint
 * @route GET /p
 * @access Public
 */
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

/**
 * DeletePost endpoint
 * @route DELETE /p/:postId
 * @desc Delete a post
 * @access Public
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export default router;
