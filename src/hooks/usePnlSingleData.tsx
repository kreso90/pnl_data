import { pnlSingleDataFetchError, pnlSingleDataFetchSuccess, pnlSingleDataLoading } from "@/redux/slices/PnlSingleDataSlice";
import { RootState } from "@/redux/store";
import { ItemDetails, PnlType, WalletHolder } from "@/types/PnlData";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";


const usePnLSingleData = (pnl_data_type: string) =>{
    const dispatch = useDispatch();

    const { loading, error, singleData } = useSelector((state: RootState) => state.pnlSingleDataReducer);
    const [ singleItemData, setSingleItemData ] = useState<Record<string, Record<string, string | WalletHolder[]>>>({})
    const [blobs, setBlobs] = useState([]);
    const [originalData, setOriginalData] = useState<any>(null);
    
    const [newWalletHolder, setNewWalletHolder] = useState(() => {
      return pnl_data_type === "meme_coins"
        ? {
            wallet_address: "",
            total_holdings: "",
            amount_sold_in: "",
            holdings_in: "",
            holdings_since: "",
          }
        : {
            wallet_address_deployer: "",
            total_deployed_projects: "",
            total_migrated: "",
          };
    });
    

    const fetchWallets = async () => {
      dispatch(pnlSingleDataLoading());
      try {
          const response = await fetch(`/api/pnl_single/${pnl_data_type}`);
          const singleData: PnlType = await response.json();
          dispatch(pnlSingleDataFetchSuccess(singleData));
          setOriginalData(_.cloneDeep(singleData.items)); 
      } catch (error) {
          dispatch(pnlSingleDataFetchError("Failed to load single PnL Data"));
      }
    };

    const fetchBlobsData = async () => {
      const response = await fetch("/api/file");
      const data = await response.json();
      setBlobs(data);
    }

    useEffect(() => {
      fetchWallets();
      fetchBlobsData();

    }, [dispatch])
 
    const isDataChanged = () => {
      if (!originalData || !singleItemData) return false;
      
      return !_.isEqual(originalData, singleItemData); 
    };
  

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
                  box_image: item.box_image || "",
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


    const handleDragEnd = async (event: DragEndEvent, item_type: string) => {
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
      }, {} as Record<string, ItemDetails>);
    
      dispatch(pnlSingleDataFetchSuccess({ ...singleData, items: reorderedItems }));

      await handleReorderItems(item_type, reorderedItems);
    };
    
    const handleReorderItems = async (item_type: string, reorderedItems: Record<string, ItemDetails>) => {
      const response = await fetch(`/api/pnl_single/${item_type}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: reorderedItems }),
      });
    
      const data = await response.json();
      if (response.ok) {
        console.log("Items updated successfully:", data);
      } else {
        console.error("Error updating items:", data.error);
      }
    };
    
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

    const handleUpdateItems = async (pnl_data_type: string) => {
      const response = await fetch(`/api/pnl_single/${pnl_data_type}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: singleItemData })
      });

      if(response.ok){
        alert("List data is updated")
      }else{
        alert("Something went wrong")
      }
    };

    const handleAddNewItem = async (pnl_data_type: string) => {
      const newItem = {
        item_name: '',
      };

      const response = await fetch(`/api/pnl_single/${pnl_data_type}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newItem })
      });

      const data = await response.json();
      console.log("Add item response:", data);
      fetchWallets();
    }

    const addNewWalletHolder = (itemKey: string) => {
      setSingleItemData((prevData) => {

        const updatedItem = { ...prevData[itemKey] };
    
        if (!Array.isArray(updatedItem.wallet_holders)) {
          updatedItem.wallet_holders = [];
        }
    
        updatedItem.wallet_holders = [
          ...updatedItem.wallet_holders,
          { ...newWalletHolder },
        ];
    
        return {
          ...prevData,
          [itemKey]: updatedItem, 
        };
      });
    
      setNewWalletHolder(
        pnl_data_type === "top_wallets"
          ? {
              wallet_address: "",
              total_holdings: "",
              amount_sold_in: "",
              holdings_in: "",
              holdings_since: "",
            }
          : {
              wallet_address_deployer: "",
              total_deployed_projects: "",
              total_migrated: ""
            }
        );
    };

    const deleteWalletHolder = (itemKey: string, walletAddress: string) => {
      setSingleItemData((prevData) => {
        const updatedItem = { ...prevData[itemKey] };
    
        if (Array.isArray(updatedItem.wallet_holders)) {
          updatedItem.wallet_holders = updatedItem.wallet_holders.filter(
            (holder) => holder.wallet_address !== walletAddress
          );
        }
    
        return {
          ...prevData,
          [itemKey]: updatedItem,
        };
      });
    };

    const deleteItem = async (itemKey: string) => {
      const response = await fetch(`/api/pnl_single/${pnl_data_type}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemKey }),
      });
  
      const data = await response.json();
      if (response.ok) {
        fetchWallets();
        console.log("Item deleted successfully:", data.message);
      } else {
        console.error("Error deleting item:", data.error);
      }
    };

    const fileUpload = async (inputFileRef: React.RefObject<HTMLInputElement>) => {
      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }

      const file = inputFileRef.current.files[0];

      const response = await fetch(
        `/api/file?filename=${file.name}`,
        {
          method: 'POST',
          body: file,
        },
      );

      if(response.ok){
        alert("Image is uploaded")
        inputFileRef.current.value = ""; 
        fetchBlobsData();
      }else{
        alert("Something went wrong")
      }

    };

    
    return { singleData, loading, error, singleItemData, handleDragEnd, handleInputChange, handleUpdateItems, handleAddNewItem, addNewWalletHolder, deleteWalletHolder, deleteItem, fileUpload, blobs, isDataChanged };

}

export default usePnLSingleData;