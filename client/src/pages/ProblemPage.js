import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useLocation,
  useSearchParams,
} from "react-router-dom";

import ProblemEditor from "../components/ProblemEditor";
import ProblemStatement from "../components/ProblemStatement";
import { asyncSingleProblemGet } from "../store/ProblemSlice";


function ProblemPage() {
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[2];
  
  const [searchParams] = useSearchParams();
  const drawer = searchParams.get("drawer");

  useEffect(() => {
    dispatch(asyncSingleProblemGet(location));
  }, [dispatch, location]);

  return (
    <div className="flex">
      <div className="flex-grow h-screen overflow-y-auto  pb-2 relative">
       
        <div className="px-4 pl-16 mt-4">
          <ProblemStatement />
        </div>
      </div>
      {(drawer === "description" || !drawer) && <ProblemEditor />}
    </div>
  );
}

export default ProblemPage;
