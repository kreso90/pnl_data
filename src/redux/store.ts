import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/AuthSlice'
import pnlDataReducer from '@/redux/slices/PnlDataSlice'
import pnlSingleDataReducer from '@/redux/slices/PnlSingleDataSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pnlData: pnlDataReducer,
    pnlSingleDataReducer: pnlSingleDataReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
