import Coin from "../models/coin.js";
import User from "../models/user.js";

export const addCoinDetails = async (req, res) => {
  try {
    const { coinName, coinPrice, userId } = req.body;
    const user = await Coin.findOne({ userId: userId });

    let updatedCoinPrice = coinPrice;
    console.log(userId, "userIddddd");
    if (typeof coinPrice !== "number") {
      res.status(400).json({
        success: false,
        message: "Invalid data type. Expected an integer.",
      });
    }

    if (coinPrice >= 1) {
      updatedCoinPrice = Math.round(coinPrice * 100) / 100;
    } else {
      updatedCoinPrice = Math.round(coinPrice * 10000000) / 10000000;
    }

    const createdAt = new Date();
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formattedDate = createdAt.toLocaleString("en-US", options);
    if (!user) {
      const coinDetails = {
        coinName: coinName,
        price: updatedCoinPrice,
        createdAt: formattedDate,
      };

      const addCoin = new Coin({
        userId: userId,
        coinDetails: coinDetails,
      });
      const coinAdded = await addCoin.save();
      res.status(200).json({
        success: true,
        message: "successfully added items",
        data: coinAdded,
      });
    } else {
      const coinDetails = {
        coinName: coinName,
        price: updatedCoinPrice,
        createdAt: formattedDate,
      };
      const addCoin = await Coin.updateOne({
        $push: { coinDetails },
      });
      res.status(200).json({
        success: true,
        message: "successfully added items",
        data: addCoin,
      });
    }
  } catch (error) {}
};

export const getAllCoins = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId, "paramss");
    const getAllCoins = await Coin.findOne({ userId: userId });

    if (!getAllCoins) {
      res.status(200).json({ success: false, message: "New User" });
    } else {
      res
        .status(200)
        .json({
          success: true,
          message: "fetched all items",
          data: getAllCoins,
        });
    }
  } catch (error) {}
};

// const { coinName, coinPrice, userId } = req.body;
// let updatedCoinPrice = coinPrice;
// console.log(userId, "userIddddd");
// if (typeof coinPrice !== "number") {
//   res.status(400).json({
//     success: false,
//     message: "Invalid data type. Expected an integer.",
//   });
// }

// if (coinPrice >= 1) {
//   updatedCoinPrice = Math.round(coinPrice * 100) / 100;
// } else {
//   updatedCoinPrice = Math.round(coinPrice * 10000000) / 10000000;
// }

// const createdAt = new Date();
// const options = {
//   year: "numeric",
//   month: "numeric",
//   day: "numeric",
//   hour: "2-digit",
//   minute: "2-digit",
//   second: "2-digit",
// };

// const formattedDate = createdAt.toLocaleString("en-US", options);

// // const newCoinCOunt = "1";
// // let currUser = await User.findById(userId);

// // let currCoinCount = currUser.coinCount;

// // let coinCountCurr = currCoinCount + newCoinCOunt;

// // const user = await User.findOneAndUpdate(
// //   { userId: userId },
// //   { $set: { coinCount: coinCountCurr } },
// //   { new: true }
// // );
// const addCoinDetails = await new Coin({
//   coinName: coinName,
//   price: updatedCoinPrice,
//   createdAt: formattedDate,
//   userId: userId,
// });

// const saveCoin = await addCoinDetails.save();

// res.status(200).json({
//   success: true,
//   message: "successfully added items",
//   data: saveCoin,
// });
