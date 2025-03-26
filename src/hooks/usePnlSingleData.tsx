import { pnlSingleDataFetchError, pnlSingleDataFetchSuccess, pnlSingleDataLoading } from "@/redux/slices/PnlSingleDataSlice";
import { RootState } from "@/redux/store";
import { ItemDetails, PnlType, WalletHolder } from "@/types/PnlData";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const usePnLSingleData = (pnl_data_type: string) =>{
    const dispatch = useDispatch();

    const { loading, error, singleData } = useSelector((state: RootState) => state.pnlSingleDataReducer);
    const [ singleItemData, setSingleItemData ] = useState<Record<string, Record<string, string | WalletHolder[]>>>({})

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
    }, [dispatch])

    useEffect(() => {
        if (singleData?.items) {
            const initialFormData: Record<string, Record<string, string | WalletHolder[]>> = {};
            Object.entries(singleData.items).forEach(([key, item]) => {
              initialFormData[key] = {
                  item_name: item.item_name || "",
                ...(pnl_data_type === "top_wallets" && { 
                  number: item?.number || "",
                  average_daily_trades: item.average_daily_trades || "",
                  average_holding_time_per_token: item.average_holding_time_per_token || "",
                  win_rate: item.win_rate || "",
                  average_lose_percentage: item.average_lose_percentage || "",
                  average_win_percentage: item.average_win_percentage || "",
                  best_single_trade: item.best_single_trade || "",
                }),
                ...(pnl_data_type === "kol_wallets" && { 
                  logo: item.logo || "",
                  wallet_address: item.wallet_address || "",
                  win_rate: item.win_rate || "",
                  average_lose_percentage: item.average_lose_percentage || "",
                  average_win_percentage: item.average_win_percentage || "",
                  best_single_trade: item.best_single_trade || "",
                  daily_trading_average: item. daily_trading_average || "",
                  average_holding_time: item.average_holding_time || "",
                  frequency: item.frequency || "",
                  twitter: item.twitter || "",
                  pnl_data_score: item.pnl_data_score || "",
                }),
                ...(pnl_data_type === "daily_best" && { 
                  image_date: item.image_date || "",
                  wallet_address: item.wallet_address || "",
                  win_rate: item.win_rate || "",
                  average_lose_percentage: item.average_lose_percentage || "",
                  average_win_percentage: item.average_win_percentage || "",
                  best_single_trade: item.best_single_trade || "",
                }),
                ...(pnl_data_type === "top_x_accounts" && { 
                  followers: item.followers || "",
                  total_posts: item.total_posts || "",
                  posts_last_seven_days: item.posts_last_seven_days || "",
                  frequent_challenges: item.frequent_challenges || "",
                  most_endorsed_token: item.most_endorsed_token || "",
                  contract_address_token: item.contract_address_token || "",
                  token_logo: item.token_logo || "",
                  profile_img: item.profile_img || "",
                  token_website: item.token_website || "",
                  token_telegram: item.token_telegram || "",
                  token_x: item.token_x || "",
                }),
                ...(pnl_data_type === "alpha_groups" && { 
                  logo: item.logo || "",
                  telegram: item.telegram || "",
                  win_rate: item.win_rate || "",
                  average_lose_percentage: item.average_lose_percentage || "",
                  average_win_percentage: item.average_win_percentage || "",
                  best_single_trade: item.best_single_trade || "",
                  daily_trading_average: item.daily_trading_average || "",
                  frequency: item.frequency || "",
                  monthly_fee: item.monthly_fee || "",
                  free_version_available: item.free_version_available || "",
                  pnl_data_score: item.pnl_data_score || "",
                }),
                ...(pnl_data_type === "meme_coins" && { 
                  logo: item.logo || "",
                  wallet_address: item.wallet_address || "",
                  token_website: item.token_website || '',
                  token_telegram: item.token_telegram || '',
                  token_x: item.token_x || '',
                  token_bullx_chart: item.token_bullx_chart || '',
                  token_ox_fun: item.token_ox_fun || '',
                  wallet_holders: item.wallet_holders 
                  ? Object.values(item.wallet_holders) 
                  : [],
                }),
                ...(pnl_data_type === "upcoming_projects" && { 
                  status: item.status || '',
                  project_name: item.project_name || '',
                  description: item.description || '',
                  logo: item.logo || '',
                  start_date: item.start_date || '',
                  token_website: item.token_website || '',
                  token_telegram: item.token_telegram || '',
                  token_x: item.token_x || '',
                }),
                ...(pnl_data_type === "first_originals" && { 
                  logo: item.logo || "",
                  wallet_address: item.wallet_address || "",
                  token_website: item.token_website || '',
                  token_telegram: item.token_telegram || '',
                  token_x: item.token_x || '',
                  token_bullx_chart: item.token_bullx_chart || '',
                  bullx_referral: item.bullx_referral || '',
                  wallet_holders: item.wallet_holders 
                  ? Object.values(item.wallet_holders) 
                  : [],
                }),
                ...(pnl_data_type === "top_yt_accounts" && { 
                  token_logo: item.token_logo || "",
                  subscribers: item.subscribers || "",
                  total_videos: item.total_videos || "",
                  monthly_frequency: item.monthly_frequency || "",
                  frequent_challenges: item.frequent_challenges || "",
                  most_endorsed_token: item.most_endorsed_token || "",
                  contract_address_token: item.contract_address_token || "",
                  profile_img: item.profile_img || "",
                  token_website: item.token_website || "",
                  token_telegram: item.token_telegram || "",
                  token_x: item.token_x || "",
                }),
                ...(pnl_data_type === "top_yt_accounts" && { 
                  token_logo: item.token_logo || "",
                  subscribers: item.subscribers || "",
                  total_videos: item.total_videos || "",
                  monthly_frequency: item.monthly_frequency || "",
                  frequent_challenges: item.frequent_challenges || "",
                  most_endorsed_token: item.most_endorsed_token || "",
                  contract_address_token: item.contract_address_token || "",
                  profile_img: item.profile_img || "",
                  token_website: item.token_website || "",
                  token_telegram: item.token_telegram || "",
                  token_x: item.token_x || "",
                })
              };
            });
            setSingleItemData(initialFormData);
        }
    }, [singleData, pnl_data_type])


    async function handleDragEnd(event: DragEndEvent, item_type: string) {
      const { active, over } = event;
  
      if (!over || !singleData.items || active.id === over.id) return;
  
      const walletKeys = Object.keys(singleData.items);
      const oldIndex = walletKeys.indexOf(active.id as string);
      const newIndex = walletKeys.indexOf(over.id as string);
  
      if (oldIndex === -1 || newIndex === -1) return;
  
      const reorderedKeys = arrayMove(walletKeys, oldIndex, newIndex);

      const reorderedItems = reorderedKeys.reduce((acc, key) => {
        if (singleData.items) {
            acc[key] = singleData.items[key]; 
        }
      return acc;
      }, {} as Record<string, typeof singleData.items[keyof typeof singleItemData.items]>);

      dispatch(pnlSingleDataFetchSuccess({ ...singleData, items: reorderedItems }));
    }

    const handleInputChange = (itemKey: string, field: string, value: string) => {
      console.log(itemKey, field, value);
      setSingleItemData((prevData) => {
        const updatedItem = { ...prevData[itemKey] };

        if (field.startsWith("wallet_holders")) {
          const match = field.match(/^wallet_holders(\d+)(.+)$/);
          if (match) {
            const index = Number(match[1]);
            const holderField = match[2];
          
            if (!updatedItem.wallet_holders || !Array.isArray(updatedItem.wallet_holders)) {
              updatedItem.wallet_holders = [];
            }
    
            if (!updatedItem.wallet_holders[index]) {
              updatedItem.wallet_holders[index] = {};
            }
    
            updatedItem.wallet_holders[index] = {
              ...updatedItem.wallet_holders[index],
              [holderField]: value,
            };
          }
        }else{
          updatedItem[field] = value;
        }
        return {
          ...prevData,
          [itemKey]: updatedItem,
        };
      })
    }

    return { singleData, loading, error, singleItemData, handleDragEnd, handleInputChange };

}

export default usePnLSingleData;