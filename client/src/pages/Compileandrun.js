import React, { useState } from "react";
import Editor from "../components/Editor";
import { useSelector } from "react-redux";
import axios from "axios";
import * as qs from "qs";

function Compileandrun() {
  const [bottomDrawer, setBottomDrawer] = useState("input");
  const [output, setOutput] = useState("");
  const [userInput, setUserInput] = useState("");
  const currentCode = useSelector((state) => state.code.currentCode);
  const currentLang = useSelector((state) => state.code.currentLang);
  const checkCode = async () => {
    console.log("here comes cuurent");
    console.log(currentCode);
    console.log(currentLang);

    setBottomDrawer("output");
    setOutput("");

    var data = qs.stringify({
      code: currentCode,
      language: currentLang,
      userInput,
    });
    var config = {
      method: "post",
      url: "http://localhost:5000/api/codetest/run",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setOutput(response.data.output); // update the output value
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="flex">
      <div className="flex-grow h-screen overflow-y-auto sc1 Compileandrun pb-2 relative">
        <div className="px-4 pl-12 pr-12 mt-4 ">
          <div className="min-w-[45%] border problemPage border-r-0 pr-0 pb-0 p-3 flex flex-col overflow-hidden">
            <>
              <div className="">
                <Editor />
              </div>
              <div className="bg-gray-100 text-sm text-gray-700 space-x-4 p-2">
                <button
                  className={`${
                    bottomDrawer === "input" && "bg-white shadow"
                  } p-2 px-4 rounded-md`}
                  onClick={() => setBottomDrawer("input")}
                >
                  Custom Input
                </button>
                <button
                  className={`${
                    bottomDrawer === "output" && "bg-white shadow"
                  } p-2 px-4 rounded-md`}
                  disabled={!output}
                  // onClick={() => setBottomDrawer("output")}
                  onClick={() => setBottomDrawer("output")}
                >
                  Output
                </button>
              </div>
              <div className="bg-gray-100 flex-grow flex flex-col items-end p-4 pt-2 min-h-[125px]">
                {bottomDrawer === "input" ? (
                  <textarea
                    className="bg-white flex-grow w-full border outline-none p-2 text-xs font-bold rounded-sm shadow"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  ></textarea>
                ) : (
                  <div className="w-full h-full bg-white rounded shadow">
                    {/* {status === "in queue" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Loading size="xl" type="points-opacity" />
                    <span className="font-mono mt-2 font-bold text-blue-600">
                      Submission is in queue...
                    </span>
                  </div>
                ) : (
                  <textarea
                    className="font-mono text-sm p-2 h-full w-full px-4 outline-none textarea"
                    value={output}
                    readOnly
                  ></textarea>
                )} */}
                    <textarea
                      className="bg-white flex-grow w-full border outline-none p-2 text-xs font-bold rounded-sm shadow"
                      value={output}
                      readOnly
                    ></textarea>
                  </div>
                )}
                <div className="space-x-4 text-sm mt-3">
                  <button
                    className="p-2 shadow-md  px-8 border bg-white rounded-lg"
                    // onClick={handleRun}
                    // onClick={checkCode}
                    onClick={() => {
                      console.log("run");
                      checkCode();
                    }}
                  >
                    Run
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compileandrun;
