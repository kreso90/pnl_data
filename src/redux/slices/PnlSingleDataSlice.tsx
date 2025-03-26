import { PnlType, PnlSingleTypeData } from "@/types/PnlData";;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PnlSingleTypeData = {
    singleData: {},
    loading: true,
    error: null,
};

const pnlDataSlice = createSlice({
  name: "pnl_single_data",
  initialState,
  reducers: {
    pnlSingleDataLoading(state) {
        state.loading = true;
        state.error = null;
    },
    pnlSingleDataFetchSuccess(state, action: PayloadAction<PnlType>) {
        state.singleData = action.payload,
        state.loading = false;
        state.error = null;
    },
    pnlSingleDataFetchError(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const { pnlSingleDataLoading, pnlSingleDataFetchSuccess, pnlSingleDataFetchError } = pnlDataSlice.actions;

export default pnlDataSlice.reducer;
