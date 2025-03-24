import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/AuthSlice'
import pnlDataReducer from '@/redux/slices/PnlDataSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pnlData: pnlDataReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
