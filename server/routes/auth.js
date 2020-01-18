// Authentication routes
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "./../db/models";
import { validateLogin, validateRegister } from "./../validation/validate";
import { hashPasswordAndSave, comparePasswords } from "../validation/bcrypt";
const router = express.Router();

/**
 *  Register endpoint
 *  @route POST api/auth/register
 *  @desc Register user
 *  @access Public
 */
router.post("/register", async (req, res, next) => {
  try {
    // validate user input from registration form
    const { error } = validateRegister(req.body);

    if (error) return res.status(404).json(error.details);

    // if validated, make sure email has not already been used
    const userWithSameEmail = await User.findOne({ email: req.body.email });

    if (userWithSameEmail)
      return res.status(409).json({ message: "Email already exists!" });

    const userWithSameUsername = await User.findOne({ username: req.body.username });

    if (userWithSameUsername)
      return res.status(409).json({ message: "Username already exists!" });

    // check to see if user is admin or not
    const isAdmin = req.body.isAdmin ? true : false;

    // If email and username are unique, create new user
    const userToBeCreated = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      isAdmin
    };

    await hashPasswordAndSave(userToBeCreated);

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

/**
 *  Login endpoint
 *  @route POST api/auth/login
 *  @desc Login user
 *  @access Public
 */
router.post("/login", async (req, res, next) => {
  try {
    // validate input
    const { error } = validateLogin(req.body);

    if (error) return res.status(400).json(error.details);

    // find user if input is valid
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.sendStatus(404);

    const isMatch = await comparePasswords(req.body.password, user.password);

    if (!isMatch) return res.status(404).json({ message: "Invalid password!" });

    // if passwords match, create payload and sign JWT token
    const payload = {
      id: user._id,
      username: user.username,
      password: user.password,
      email: user.email,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.lastName,
      posts: user.posts
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 31556926 // 1 year
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
});

export default router;
