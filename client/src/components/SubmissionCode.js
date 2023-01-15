import CodeMirror, { EditorFromTextArea } from "codemirror";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import store from "../store/store";


export default function SubmissionCode() {
  const EditorRef = useRef();
  const location = useLocation()

  useEffect(() => {
    const init = () => {
      // Initialize Codemirror

      const editorId = document.getElementById(
        "realtimeEditor"
      );

      EditorRef.current = CodeMirror.fromTextArea(editorId, {
        // mode:
        //   language === "cpp"
        //     ? "text/x-c++src"
        //     : language === "c"
        //     ? "text/x-csrc"
        //     : "text/x-python",
        mode: "text/x-c++src",
        theme: "idea",
        autoCloseBrackets: true,
        lineNumbers: true,
        tabSize: 2,
        tabindex: 2,
        indentWithTabs: true,
      });

      const codemirror = document.getElementsByClassName(
        "CodeMirror"
      )[0];
      codemirror.style.minHeight = `calc(100vh - 120px)`;
      codemirror.style.pointerEvents = "none";
    };

    if (!EditorRef.current) init();
    return () => {
      EditorRef.current = undefined;
      const codemirror = document.getElementsByClassName(
        "CodeMirror"
      )[0];
      codemirror.style.minHeight = `unset`;
      codemirror.style.pointerEvents = "unset";
      codemirror.style.display = 'none'
    };
  }, [location]);
  return <textarea className="h-full" id="realtimeEditor"></textarea>;
}
