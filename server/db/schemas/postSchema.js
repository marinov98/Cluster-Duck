import { Schema } from "mongoose";

export const PostSchema = new Schema({
  /** The user that created the post */
  poster: {
    type: Schema.Types.ObjectId
  },
  /** The text string of the post message */
  text: {
    type: String,
    default: ""
  },
  /** Array of replied messages */
  replies: {
    type: Array,
    default: []
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
    type: Array,
    default: []
  },
  /** Array of users that dislike the comment or found it unhelpful */
  downVotes: {
    type: Array,
    default: []
  }
});
