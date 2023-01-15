import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/theme/idea.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";

import stub from "../codeStub";
import { useDispatch } from "react-redux";
import { setCurrentCode, setCurrentLang} from "../store/CodeSlice";

import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

export default function Editor() {
  console.log("editor");
  const EditorRef = useRef();
  const [language, setLanguage] = useState("cpp");
  const [stubs, setStubs] = useState(stub);
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[2];
  const currentCode = useSelector((state) => state.code.currentCode);

  useEffect(() => {
    const localLanguage = localStorage.getItem("language") || language;
    setLanguage(localLanguage);
    let localCode = JSON.parse(localStorage.getItem(`${location}-${localLanguage}-code`)) || stub[localLanguage];
    const temp = { ...stubs };
    temp[localLanguage] = localCode;
    setStubs(temp);
    dispatch(setCurrentCode(temp[localLanguage]));
    console.log("locallang0");
    console.log(temp[localLanguage])
    console.log("locallang0");
    dispatch(setCurrentLang(localLanguage));
  }, []);

  useEffect(() => {
    const init = () => {
      // Initialize Codemirror

      const editorId = document.getElementById(
        "realtimeEditor"
      );

      EditorRef.current = Codemirror.fromTextArea(editorId, {
        mode:
          language === "cpp"
            ? "text/x-c++src"
            : language === "c"
            ? "text/x-csrc"
            : "text/x-python",
        theme: "idea",
        autoCloseBrackets: true,
        lineNumbers: true,
        tabSize: 2,
        tabindex: 2,
        indentWithTabs: true,
      });
      // Get initial code from localstorage if it exist or use the default stub code

      const tempStub = JSON.parse(localStorage.getItem(`${location}-${language}-code`)) || stub[language];

      EditorRef.current?.getDoc().setValue(tempStub);
    };

    if (!EditorRef.current) init();
    else {
      // Handle codemirror code change

      EditorRef.current?.on("change", (instance, changes) => {
        const code = instance.getValue();
        if (changes.origin !== "setValue") {
          dispatch(setCurrentCode(code));
          console.log(code);
          console.log("now the corrent");
          console.log(currentCode);
          localStorage.setItem(`${location}-${language}-code`, JSON.stringify(code));
        }
      });
    }
  }, [location,language,stubs]);

  return (
    <>
      <div>
        <select value={language} onChange={(e) => {
            setLanguage(e.target.value);
            dispatch(setCurrentLang(e.target.value));
            // console.log(e.target.value);
            localStorage.setItem("language", e.target.value);
          }}>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="py">Python</option>
        </select>
      </div>
      <textarea id="realtimeEditor"></textarea>
    </>
  );
}

