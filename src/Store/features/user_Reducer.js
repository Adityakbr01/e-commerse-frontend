import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    usernotExist: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, usernotExist } = userReducer.actions;
export default userReducer.reducer;
