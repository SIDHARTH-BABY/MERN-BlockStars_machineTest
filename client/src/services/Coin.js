import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });


export const addCoinDetails=(coinName,coinPrice,userId)=>API.post("/coin/addCoinDetails",{coinName,coinPrice,userId})

export const fetchALLCoins=(userId)=>API.get(`/coin/getAllCoins/${userId}`)