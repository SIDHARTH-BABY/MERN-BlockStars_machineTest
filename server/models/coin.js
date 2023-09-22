import mongoose from "mongoose";

const coinSchema = new mongoose.Schema(
  {
    coinName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 25,
    },
    createdAt: {
      type: Date, // Add a field to store the creation timestamp
      default: Date.now, // Set the default value to the current date and time
    },
  },
  {
    timestamps: true,
  }
);

const Coin = mongoose.model("coin", coinSchema);
export default Coin;
