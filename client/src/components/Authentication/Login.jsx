import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/Auth";

const Login = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [validateUser, setValidateUser] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userName = userNameRef.current.value;
    let password = passwordRef.current.value;

    if (!userName || !password) {
      console.error("Username and password are required.");
      setValidateUser(false);
      return;
    }
    setValidateUser(true);

    try {
      const response = await loginUser(userName, password);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token)
        navigate("/");
      }
    } catch (error) {}
  };
  return (
    <div>
      <div class=" mt-36 py-8 px-8 max-w-sm mx-auto bg-emerald-200 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
    
        <div class="text-center space-y-2 sm:text-left">
        <p class="text-yellow-900 leading-6 font-extrabold">LOGIN</p>
          <form onSubmit={handleSubmit}>
            <label class="block">
              <span class="block text-sm font-medium text-slate-700 ">
                Username
              </span>

              <input
                type="username"
                ref={userNameRef}
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    invalid:border-pink-500 invalid:text-pink-600
    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
  "
              />
              <span class="block text-sm font-medium text-slate-700 mt-6">
                Password
              </span>

              <input
                type="password"
                ref={passwordRef}
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    invalid:border-pink-500 invalid:text-pink-600
    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
  "
              />
            </label>
            <p class="mt-2  peer-invalid:visible text-pink-600 text-sm">
              {!validateUser && "Username and password are required"}
            </p>

            <button
              type="submit"
              class="rounded-full bg-sky-600 w-28 mt-6 h-7 text-sm font-semibold"
            >
              Login
            </button>
           
          </form>
         
          <p class="underline underline-offset-1 w-72 hover:cursor-pointer"    onClick={() => {
                navigate("/register");
              }}> Dont have an account? Register </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
