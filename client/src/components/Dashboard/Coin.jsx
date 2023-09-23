import React, { useContext, useEffect, useRef, useState } from "react";
import { addCoinDetails, fetchALLCoins } from "../../services/Coin";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";

const Coin = () => {
  const coinNameRef = useRef();
  const cointPriceRef = useRef();
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState([]);
  const [itemAdded, setItemAdded] = useState();
  const [validate, setValidate] = useState(true);
  const [numValidate, setNumValidate] = useState(true);
  const user = useContext(userContext);
  console.log(user ? user.id : "pp", "userOnee");
  const userId = user ? user.id : "";
  useEffect(() => {
    try {
      const getItems = async () => {
        const response = await fetchALLCoins(userId);
        if (response.data.success) {
          console.log(response.data.data.coinDetails,'coinDetails');
          setCoinData(response.data.data.coinDetails);
        }else{
          console.log(response.data.message);
        }
      };
      getItems();
    } catch (error) {}
  }, [itemAdded,user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let coinName = coinNameRef.current.value;
    let coinPrice = parseFloat(cointPriceRef.current.value);
    setValidate(true);
    setNumValidate(true);
    if (coinName === "" || isNaN(cointPriceRef.current.value)) {
      if (coinName === "") {
        setValidate(false);
      }
      if (isNaN(coinPrice)) {
        setNumValidate(false);
      }
      return; // Exit early if there are validation errors
    }
    const userId = user ? user.id : "";
    try {
      const response = await addCoinDetails(coinName, coinPrice, userId);
      if (response.data.success) {
        setItemAdded(response.data.data);
        coinNameRef.current.value = "";
        cointPriceRef.current.value = "";
      }else{
        console.log(response.data.message);
      }
    } catch (error) {}
  };

  return (
    <div>
      <div class="flex justify-end mr-32">
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          class="rounded-full bg-red-500 w-28 mt-5 h-7 text-sm font-semibold"
        >
          LogOut
        </button>
      </div>

      <div class="flex justify-center ">
        <div class="w-72 h-40 mt-32">
          <form onSubmit={handleSubmit}>
            <label class="block">
              <span class="block text-sm font-medium text-slate-700">
                Coin Name
              </span>
              <input
                type="text"
                placeholder="Enter Coin Name"
                ref={coinNameRef}
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
              />
              <span class="block text-sm font-medium text-slate-700 mt-5">
                Price
              </span>
              <input
                type="text"
                placeholder="Enter Price"
                ref={cointPriceRef}
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
              />
            </label>
            <p class="mt-2  peer-invalid:visible text-pink-600 text-sm">
              {!validate && "Enter a value in the Coin Name field"}
              {!numValidate && "Enter a valid number in the Price field"}
            </p>
            <button
              type="submit"
              class="rounded-full bg-sky-600 w-28 mt-5 h-7 text-sm font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div class="flex justify-center mt-28">
        <table class="table-auto border-separate border-spacing-2 border border-slate-500">
          <thead>
            <tr>
              <th class="border border-slate-600 bg-green-200">Coin Name</th>
              <th class="border border-slate-600 bg-green-200">Price</th>
              <th class="border border-slate-600 bg-green-200">Time</th>
            </tr>
          </thead>
          {coinData
            ? coinData.map((data, index) => (
                <tbody>
                  <tr key={data._id}>
                    <td class="border border-slate-600 bg-violet-300 font-semibold">
                      {data.coinName}
                    </td>
                    <td class="border border-slate-600 bg-violet-300 font-semibold ">
                      {data.price}
                    </td>
                    <td class="border border-slate-600 bg-violet-300 font-semibold ">
                      {data.createdAt}
                    </td>
                  </tr>
                </tbody>
              ))
            : ""}
        </table>
      </div>
    </div>
  );
};

export default Coin;
