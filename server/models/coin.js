import mongoose from "mongoose";

const coinSchema = new mongoose.Schema(
  {
    coinDetails: [
      {
        coinName: String,
        price: Number,
        createdAt: Date,
      },
    ],
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coin = mongoose.model("coin", coinSchema);
export default Coin;
