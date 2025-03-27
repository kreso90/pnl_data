import { ItemDetails } from '@/types/PnlData'
import React, { useState } from 'react'
import { useSortable } from "@dnd-kit/sortable";
import { LuGrip } from 'react-icons/lu';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

interface SingleItemsPros{
  itemKey: string;
  itemName: string;
  pnlDataType?: string;
  singleItemData?: Record<string, any>;
  onInputChange: (itemKey: string, field: string, value: string) => void;
  addNewHolder: (itemKey: string) => void;
  deleteWalletHolder: (itemKey: string, walletAddress: string) => void;
  deleteItem: (itemKey: string) => void;
}

export default function Single({itemKey, itemName, pnlDataType, singleItemData, onInputChange, addNewHolder, deleteWalletHolder, deleteItem}: SingleItemsPros) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: itemKey! });

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
    cursor: 'pointer',
  };

  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  };

  return (
    <div key={itemKey} className="track" ref={setNodeRef} style={style}>
      <div className="font-18 flex-v-center space-between" onClick={(e) => toggleDropdown(itemKey!, e)}>
        <div className="flex-v-center">
          <LuGrip {...attributes} {...listeners} style={{ cursor: "grab", marginRight: "10px", position: "relative", top: "0px"}} size={20}/>
          <p className="m-0 m-top-5">{itemName}</p>
        </div>
      
        <span>{openDropdowns[itemKey] ? <HiOutlineChevronUp size={20} className="icon-button" /> : <HiOutlineChevronDown size={20} className="icon-button"/>}</span>
      </div>

      {openDropdowns[itemKey] && (
        <div className="track__dropdown">

          <ul>
          {singleItemData && Object.entries(singleItemData[itemKey]).map(([field, value]: any) => (
            field !== "wallet_holders" ? (
            <li key={field}>
              <label className="block font-medium">{field.replace(/_/g, " ")}</label>
              <input
                type="text"
                value={typeof value === "string" ? value : ""}
                onChange={(e) => onInputChange(itemKey, field, e.target.value)}
                className="border p-2 w-full rounded"
              />
            </li>
            ):null
          ))}
          </ul>
          <button className="delete" onClick={() => deleteItem(itemKey)}>Delete Item</button>
          {singleItemData![itemKey].wallet_holders  && Object.entries(singleItemData![itemKey].wallet_holders).map(([field, index]: any) => (
            <div key={field + index}>
              <h2>Wallet Holder {field}</h2>
              <ul>
                {Object.entries(index as Record<string, any>).map(([holderkey, holdervalue]) => (
                  <li key={index + holderkey}>
                    <label className="block font-medium">{holderkey.replace(/_/g, " ")}</label>
                    <input
                      type="text"
                      value={typeof holdervalue === "string" ? holdervalue : ""}
                      onChange={(e) => onInputChange(itemKey, `wallet_holders${field}${holderkey}`, e.target.value)}
                      className="border p-2 w-full rounded"
                    />
                  </li>
                ))}
              </ul>
              <button className="delete" onClick={() => deleteWalletHolder(itemKey, index.wallet_address)}>Delete wallet holder</button>
            </div>
          ))}

          {(pnlDataType === "meme_coins" || pnlDataType === "first_originals") && (
            <button className="button update" type="button" onClick={() => addNewHolder(itemKey)}>
              Add wallet holder
            </button>
          )}
        </div>
      )}
    </div>
  )
}

