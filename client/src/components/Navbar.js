
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncLogout } from "../store/authSlice";


export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()

  const handleLogin = async () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };
  const handleLogout = () => {
    dispatch(asyncLogout())
  }
  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-500 text-white font-medium tracking-wider px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <Link to={"/"} className="text-2xl font-black text-white ml-6 hover:animate-bounce">
          <span className="text-indigo-300 font-medium">Kisan</span><span className="text-indigo-200 font-medium">Forces</span>
        </Link>
        <div className="flex items-center">
          <Link to={"/create"} className="mx-2 py-1 px-3 rounded-md bg-white text-indigo-700 hover:bg-indigo-700 hover:text-white">
            Add Problem
          </Link>
          <Link to={"/problemlist"} className="mx-2 py-1 px-3 rounded-md bg-white text-indigo-700 hover:bg-indigo-700 hover:text-white">
            ProblemList
          </Link>
          <Link to={"/compile"} className="mx-2 py-1 px-3 rounded-md bg-white text-indigo-700 hover:bg-indigo-700 hover:text-white">
            Compile & Run
          </Link>
        </div>
        {user && (
          <div className="relative inline-block text-left">
            <div className="flex flex-row">
              <span className="rounded-md shadow-sm">
                <button type="button" className=" mr-24 relative z-10 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-700 hover:bg-indigo-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800">
                  <img className="w-8 h-8 rounded-full object-cover object-center" src={user.image} alt="" />
                  <span className="ml-3">
                    {user.displayName}
                  </span>
                </button>
              </span>
            <div className="origin-top-right absolute right-0 mt-1 mb-7 w-30 rounded-md shadow-lg">
              <div className="py-1 rounded-md bg-white shadow-xs">
              <button className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" onClick={handleLogout}>Logout</button>

              </div>
            </div>
            </div>
          </div>
        )}
        {!user && (
          <button className="px-3 py-1 rounded-md text-indigo-700 bg-white hover:bg-indigo-500 hover:text-white" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}