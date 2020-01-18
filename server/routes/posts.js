// posts routes
import express from "express";
import { Post } from "./../db/models";
const router = express.Router();

/**
 *
 *
 * POST
 *
 *
 *
 */

/**
 * CreatePost endpoint
 * @route POST /api/posts
 * @desc Create a post
 * @access Public
 */
router.post("/", async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);
    return res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

/**
 * FindAllPosts endpoint
 * @route GET api/posts
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
 * @route GET api/posts/:id
 * @access Public
 */
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.sendStatus(401);

    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

/**
 * DeletePost endpoint
 * @route DELETE api/posts/:id
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

/**
 *
 *
 * POST LIKES
 *
 *
 */

export default router;
