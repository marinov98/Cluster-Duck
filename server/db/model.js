import mongoose from "mongoose";

// experimental , not to be used yet
export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  posts: {
    type: Array
  },
  isAdmin: {
    type: Boolean
  }
});
