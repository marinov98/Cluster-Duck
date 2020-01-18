import { Schema } from "mongoose";

export const UserSchema = new Schema({
  /** Username used for logging in */
  username: {
    type: String
  },
  /** Password */
  password: {
    type: String
  },
  /** The user's first name */
  firstName: {
    type: String
  },
  /** The user's last name */
  lastName: {
    type: String
  },
  /** The user's email address */
  email: {
    type: String
  },
  /** Array of the user's posted messages */
  posts: {
    type: Array,
    default: []
  },
  /** User is treated as an administrator if true */
  isAdmin: {
    type: Boolean,
    default: false
  }
});
