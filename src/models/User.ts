import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true},
  username: { type: String, required: true},
});

UserSchema.methods.encryptPassword = async (password:string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
UserSchema.methods.validatePassword = async function (password:string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
