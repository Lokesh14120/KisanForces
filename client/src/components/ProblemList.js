import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "../store/store";
import { CodeSlice } from "../store/CodeSlice";



export default function ProblemList() {
  const problems = useSelector((state) => state.problem.problems);
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate();
  const loading = useSelector((state) => state.problem.loading);
  
  const isItSolved = (solvedArr) => {
    if(!solvedArr) return false
    return solvedArr.includes(user?._id)
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12">
    <h1 className="text-3xl font-medium text-black mb-8">Select a problem to solve</h1>
    <div className="space-y-4">
        {!loading
            ? problems.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
                    onClick={() => navigate(`/problem/${item._id}`)}
                >
                    <div>
                        <h2 className="text-lg font-medium text-black hover:underline cursor-pointer">
                            {item.title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <div>
                        <button className={`bg-indigo-500 text-white py-2 px-4 rounded-lg text-center ${isItSolved(item.whoSolved) ? "bg-green-600 font-semibold line-through" : "bg-indigo-500 hover:bg-white hover:text-indigo-800"}`}>
                            {isItSolved(item.whoSolved) ? 'Solved' : "Solve Now"}
                        </button>
                    </div>
                </div>
            ))
            : [0, 1, 2].map((item) => (
                <div
                    key={item}
                    className="bg-gray-100 border border-gray-300 rounded-md p-4 max-w-4xl w-full mx-auto"
                >
                    <div className="animate-pulse flex items-center space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-3 bg-gray-300 rounded max-w-md"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="h-2 bg-gray-300 rounded col-span-3 max-w-xs"></div>
                                </div>
                            </div>
                        </div>
                        <div className="h-8 bg-gray-300 rounded w-24"></div>
                    </div>
                </div>
            ))}
    </div>
</div>

  );
}
