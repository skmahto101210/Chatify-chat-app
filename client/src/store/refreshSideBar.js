import { createSlice } from "@reduxjs/toolkit";

export const refreshSideBar = createSlice({
  name: "refreshSideBar",
  initialState: true,
  reducers: {
    refreshFun: (state) => {
      console.log("refresh sidebar from redux");
      return state = !state;
    },
  },
});

export const { refreshFun } = refreshSideBar.actions;
export default refreshSideBar.reducer;
