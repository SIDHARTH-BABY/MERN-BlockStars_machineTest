import React, { useEffect, useRef } from "react";
import { addCoinDetails, fetchALLCoins } from "../../services/Coin";

const Coin = () => {
  const coinNameRef = useRef();
  const cointPriceRef = useRef();

  useEffect(() => {
    try {
      const getItems = async () => {
        const response = await fetchALLCoins();
        if (response.data.success) {
          console.log(response.data);
        }
      };
      getItems();
    } catch (error) {}
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let coinName = coinNameRef.current.value;
      let coinPrice = parseFloat(cointPriceRef.current.value);

      const response = await addCoinDetails(coinName, coinPrice);
      if (response.data.success) {
        console.log(response.data, "success");
      }
    } catch (error) {}
  };

  return (
    <div>
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
            <button
              type="submit"
              class="rounded-full bg-sky-600 w-28 mt-5 h-7 text-sm font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div class="flex justify-center mt-16">
        <table class="table-auto border-separate border-spacing-2 border border-slate-500">
          <thead>
            <tr>
              <th class="border border-slate-600 bg-green-200">Coin Name</th>
              <th class="border border-slate-600 bg-green-200">Price</th>
              <th class="border border-slate-600 bg-green-200">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-600 bg-violet-300 font-semibold">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td class="border border-slate-600 bg-violet-300 font-semibold ">
                Malcolm Lockyer
              </td>
              <td class="border border-slate-600 bg-violet-300 font-semibold ">
                Malcolm Lockyer
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coin;
