import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProblemList from "./components/ProblemList";
import AddProblem from "./pages/AddProblem";
import Compileandrun from "./pages/Compileandrun";
import Home from "./pages/Home";
import ProblemPage from "./pages/ProblemPage";
import { asyncLogin } from "./store/authSlice";
// import store from "./store/store";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncLogin())  
  }, []);

  return (
    <div>
      {/* <div>Lokesh</div> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/create" element={<AddProblem />} />
        <Route path="/problemlist" element={<ProblemList/>} />
        <Route path="/compile" element={<Compileandrun/>} />
      </Routes>
    </div>
  );
}

export default App;
