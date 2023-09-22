import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });


export const addCoinDetails=(coinName,coinPrice)=>API.post("/coin/addCoinDetails",{coinName,coinPrice})

export const fetchALLCoins=()=>API.get("/coin/getAllCoins")