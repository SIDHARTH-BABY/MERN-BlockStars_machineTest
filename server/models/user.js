import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    coinCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

export default User;
