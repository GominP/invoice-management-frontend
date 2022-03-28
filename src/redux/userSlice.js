import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    role: "",
    userid: "",
    notiCount: 0,
    info_slip_verification: {},
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setId: (state, action) => {
      state.userid = action.payload;
    },
    setNotiCount: (state, action) => {
      state.notiCount = action.payload;
    },
    setInfoSlip: (state, action) => {
      state.info_slip_verification = action.payload;
    },
  },
});
export default userSlice.reducer;

export const { setRole, setId, setNotiCount, setInfoSlip } = userSlice.actions;

export const getRole = (state) => state.users.role;
export const getUserID = (state) => state.users.userid;
export const getNotiCount = (state) => state.users.notiCount;
export const get_info_slip_verification = (state) =>
  state.users.info_slip_verification;
