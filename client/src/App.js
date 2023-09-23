import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Coin from "./components/Dashboard/Coin";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import { getUserData } from "./services/Auth";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "./Route/ProtectedRoute";
import PublicRoute from "./Route/PublicRoute";

export const userContext = React.createContext();
function App() {
  const [details, setDetails] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserData();
        console.log(response.data.data, "haii");

        setDetails(response.data.data);
      } catch (error) {
        console.log("eroorrr");
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div className="App">
      <userContext.Provider value={details}>
        <BrowserRouter>
          <Routes>
            {/* <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route element={<Coin />} path="/" /> */}
            <Route
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
              path="/register"
            />
            <Route
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
              path="/login"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Coin />
                </ProtectedRoute>
              }
              path="/"
            />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
