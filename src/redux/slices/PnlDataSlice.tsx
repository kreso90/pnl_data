import { PnlType, PnlTypeData } from "@/types/PnlData";;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PnlTypeData = {
    data: [],
    loading: true,
    error: null,
};

const pnlDataSlice = createSlice({
  name: "pnl_data",
  initialState,
  reducers: {
    pnlDataLoading(state) {
        state.loading = true;
        state.error = null;
    },
    pnlDataFetchSuccess(state, action: PayloadAction<[PnlType]>) {
        state.data = action.payload,
        state.loading = false;
        state.error = null;
    },
    pnlDataFetchError(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const { pnlDataLoading, pnlDataFetchSuccess, pnlDataFetchError } = pnlDataSlice.actions;

export default pnlDataSlice.reducer;
