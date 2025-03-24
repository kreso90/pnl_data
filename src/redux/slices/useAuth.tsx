import { User, UserData } from "@/types/UserData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserData = {
    user: null,
    loading: true,
    error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
        state.loading = true;
        state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
    },
    logout(state) {
        state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
