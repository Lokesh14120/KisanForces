import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero/Hero";
import { asyncProblemGet } from "../store/ProblemSlice";
// import store from "../store/store";


export default function Home() {
  const dispatch = useDispatch()
  const problems = useSelector((state) => state.problem.problems)

  useEffect(() => {
    dispatch(asyncProblemGet())
  }, [])

  return (
    <>
    <Hero/>
      
      
    </>
  );
}
