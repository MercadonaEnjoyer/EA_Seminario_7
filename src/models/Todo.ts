import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  completed: { type: Boolean, default: false }
});

export default mongoose.model("Todo", TodoSchema);

TodoSchema.methods.encryptPassword = async (password:string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
TodoSchema.methods.validatePassword = async function (password:string) {
  return bcrypt.compare(password, this.password);
};