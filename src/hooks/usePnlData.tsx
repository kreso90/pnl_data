import { pnlDataFetchError, pnlDataFetchSuccess, pnlDataLoading } from "@/redux/slices/PnlDataSlice";
import { RootState } from "@/redux/store";
import { PnlType } from "@/types/PnlData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const usePnlData = () => {
    const dispatch = useDispatch();

    const { loading, error, data } = useSelector((state: RootState) => state.pnlData);

    useEffect(() => {
        const fetchWallets = async () => {
            dispatch(pnlDataLoading());
            try {
                const response = await fetch("/api/pnl");
                const data: [PnlType] = await response.json();
                dispatch(pnlDataFetchSuccess(data));
            } catch (error) {
                dispatch(pnlDataFetchError("Failed to PnL Data"));
            }
        };

        fetchWallets();
    },[dispatch])

    return { data, loading, error };
}

export default usePnlData;