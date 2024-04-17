import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface IPost {
  id: number;
  owner: string;
  title: string;
  text: string;
}

export interface IUserModel extends IPost, Document {}

const PostSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  text: { type: String }
});

export default mongoose.model("Post", PostSchema);