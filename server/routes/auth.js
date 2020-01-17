// Authentication routes
import express from "express";
import { User } from "./../db/models";
const router = express.Router();

/**
 *  Register endpoint
 *  @route POST api/auth/register
 *  @desc Register user
 *  @access Public
 */
router.post("/register", async (req, res, next) => {});

/**
 *  Login endpoint
 *  @route POST api/auth/login
 *  @desc Login user
 *  @access Public
 */
router.post("/login", (req, res, next) => {});

/**
 *  Logout endpoint
 *  @route POST api/auth/logout
 *  @desc Logout user
 *  @access Public
 */
router.get("/logout", (req, res, next) => {});

export default router;
