import mongoose from "mongoose";

// experimental , not to be used yet

export const UserSchema = new mongoose.Schema({
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
    type: Boolean
  }
});

export const PostSchema = new mongoose.Schema({
  /** The user that created the post */
  poster: {
    type: Schema.Types.ObjectId
  },
  /** The text string of the post message */
  text: {
    type: String
  },
  /** Array of replied messages */
  replies: {
    type: Array
  },
  /** Only visible to administrators if true */
  private: {
    type: Boolean
  },
  /** Poster's name is replaced with 'anonymous' if true */
  anonymity: {
    type: Boolean
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