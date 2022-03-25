import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    role: "",
    userid: "",
    notiCount: 0,
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
  },
});
export default userSlice.reducer;

export const { setRole, setId, setNotiCount } = userSlice.actions;

export const getRole = (state) => state.users.role;
export const getUserID = (state) => state.users.userid;
export const getNotiCount = (state) => state.users.notiCount;
