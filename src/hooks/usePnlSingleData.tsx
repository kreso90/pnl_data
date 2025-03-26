import { pnlSingleDataFetchError, pnlSingleDataFetchSuccess, pnlSingleDataLoading } from "@/redux/slices/PnlSingleDataSlice";
import { RootState } from "@/redux/store";
import { PnlType } from "@/types/PnlData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const usePnLSingleData = (pnl_data_type: string) =>{
    const dispatch = useDispatch();

    const { loading, error, singleData } = useSelector((state: RootState) => state.pnlSingleDataReducer);

    useEffect(() => {

        const fetchWallets = async () => {
            dispatch(pnlSingleDataLoading());
            try {
                const response = await fetch(`/api/pnl_single/${pnl_data_type}`);
                const singleData: PnlType = await response.json();
                dispatch(pnlSingleDataFetchSuccess(singleData));
            } catch (error) {
                dispatch(pnlSingleDataFetchError("Failed to load single PnL Data"));
            }
        };

        fetchWallets();
    },[dispatch])

    return { singleData, loading, error };

}

export default usePnLSingleData;