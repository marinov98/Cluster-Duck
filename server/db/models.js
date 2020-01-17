import mongoose from "mongoose";

// experimental , not to be used yet

const UserSchema = new mongoose.Schema({
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
    type: Array
  },
  /** User is treated as an administrator if true */
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const PostSchema = new mongoose.Schema({
  /** The user that created the post */
  poster: {
    type: mongoose.Schema.Types.ObjectId
  },
  /** The text string of the post message */
  text: {
    type: String,
    default: ""
  },
  /** Array of replied messages */
  replies: {
    type: Array
  },
  /** Only visible to administrators if true */
  private: {
    type: Boolean,
    default: false
  },
  /** Poster's name is replaced with 'anonymous' if true */
  anonymity: {
    type: Boolean,
    default: false
  },
  /** Array of users that like the comment or found it helpful */
  upVotes: {
    type: Array
  },
  /** Array of users that dislike the comment or found it unhelpful */
  downVotes: {
    type: Array
  }
});

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

export { User, Post };
