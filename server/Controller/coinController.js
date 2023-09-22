import Coin from "../models/coin.js";

export const addCoinDetails = async (req, res) => {
  try {
    const { coinName, coinPrice } = req.body;
    let updatedCoinPrice = coinPrice;

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

    const addCoinDetails = new Coin({
      coinName: coinName,
      price: updatedCoinPrice,
      createdAt: formattedDate,
    });

    const saveCoin = await addCoinDetails.save();

    res.status(200).json({
      success: true,
      message: "successfully added items",
      data: saveCoin,
    });
  } catch (error) {}
};

export const getAllCoins = async (req, res) => {
  try {
    const getAllCoins = await Coin.find();

    res
      .status(200)
      .json({ success: true, message: "fetched all items", data: getAllCoins });
  } catch (error) {}
};
