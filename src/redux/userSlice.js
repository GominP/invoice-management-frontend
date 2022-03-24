import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    role: "",
    userid: ""
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setId: (state, action) => {
      state.userid = action.payload;
    },
  },
});
export default userSlice.reducer;

export const { setRole,setId } = userSlice.actions;

export const getUsers = (state) => state.users.role;
