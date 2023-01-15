import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axios from 'axios';

const initialState = {
  currentCode: "",
  currentLang: "",
  codeLoading: false,
  codeOutput: "",
  jobId: "",
  userSubmission: [],
  loading: false
};

const URL = 'http://localhost:5000/api'

export const asyncProgrammemRun = createAsyncThunk(
  "code/runProgramme",
  async ({ currentCode, currentLang, userInput }) => {
    const res = await fetch(`${URL}/codetest/runtest`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: currentCode,
        language: currentLang,
        userInput,
      }),
    });
    console.log('i am in 2');
    const data = await res.json();
    if (res.ok) return data.jobId;
    else {
      toast.error(data);
    }
  }
);

// export const asyncProgrammemSubmit = createAsyncThunk(
//   "code/submitProgramme",
//   async ({ currentCode, currentLang, userInput, problemId, userId }) => {
//     const res = await fetch(`${URL}/code/submit`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         code: currentCode,
//         language: currentLang,
//         userInput,
//         problemId,
//         userId,
//       }),
//     });
//     const data = await res.json();
//     if (res.ok) return data.jobId;
//     else {
//       toast.error(data);
//     }
//   }
// );
export const asyncProgrammemSubmit = createAsyncThunk(
  "code/submitProgramme",
  async ({ currentCode, currentLang, problemId, userId }) => {
    var data = {
      'code': currentCode,
      'language': currentLang,
      'problemId': problemId,
      'userId': userId,
    };
    var config = {
      method: 'post',
      url: 'http://localhost:5000/api/codetest/runtest',
      headers: {
        "Content-Type": "application/json",
      },
      data: data
    };

    try {
      const response = await axios(config);
      if (response.data.success) {
        return response.data.jobId;
      } else {
        throw new Error(response.data.error);
      }
    } catch (err) {
      throw err;
    }
  }
);


export const asyncSubmissionGet = createAsyncThunk('code/getSubmission', async (problemId) => {
  const res = await fetch(`${URL}/code/submission/${problemId}`, {
    credentials: 'include'
  })
  const data = await res.json()
  if (res.ok) return data;
  else toast.error(data);
});

export const asyncSubmissionDownload = createAsyncThunk('code/downloadSubmission', async (jobId) => {
  window.open(`${URL}/code/download/${jobId}`)
});




export const CodeSlice = createSlice({
  name: 'codex',
  initialState,
  reducers: {
    setCurrentCode: (state, action) => {
      state.currentCode = action.payload;
      },
    setCurrentLang: (state, action) => {
        state.currentLang = action.payload;
      }
  },
  extraReducers: {
    [asyncProgrammemRun.pending.type]: (state) => {
      state.codeLoading = true;
    },
    [asyncProgrammemRun.fulfilled.type]: (state, action) => {
      state.codeLoading = false;
      state.jobId = action.payload;
    },
    [asyncProgrammemSubmit.pending.type]: (state) => {
      state.codeLoading = true;
    },
    [asyncProgrammemSubmit.fulfilled.type]: (state, action) => {
      state.codeLoading = false;
      state.jobId = action.payload;
      console.log("state job id ",state.jobId);
    },
    [asyncSubmissionGet.pending.type]: (state, action) => {
      state.loading = true;
    },
    [asyncSubmissionGet.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.userSubmission = action.payload;
    },
    [asyncSubmissionGet.rejected.type]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { setCurrentCode, setCurrentLang } = CodeSlice.actions;
// export const setCurrentCode= (state) = state.codex.value;

export default CodeSlice.reducer;

