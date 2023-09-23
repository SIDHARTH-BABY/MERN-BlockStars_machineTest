import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const registerUser =(userName,password)=>API.post("/user/register",{userName,password})
export const loginUser =(userName,password)=>API.post("/user/login",{userName,password})

export const getUserData=()=>API.get('/user/get-user-info-by-id',{
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  })