'use client';
import Loader from '@/components/Loader';
import SingleItems from '@/components/SingleItem';
import useAuth from '@/hooks/useAuth';
import usePnlSingleData from '@/hooks/usePnlSingleData';
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { isMobile } from 'react-device-detect';


export default function PnlSinglePage() {
  const { id } = useParams();
  const { logout } = useAuth();
  const { singleData, loading, singleItemData, pnlToken, handleDragEnd, handleInputChange, handleUpdateItems, handleAddNewItem, addNewWalletHolder, deleteWalletHolder, deleteItem, fileUpload, blobs, isDataChanged } = usePnlSingleData(id as string); 

  const inputFileRef = useRef<HTMLInputElement>(null);
 
  const sensors = useSensors(
    ...(isMobile ? [useSensor(TouchSensor, { activationConstraint: { delay: 0, tolerance: 5 } })] 
    : [useSensor(PointerSensor)])
  );

  return (
    <>
    {!loading ?
    <div className="dashboard-main">
      
      <nav>
          <Link href="/dashboard">
            <HiOutlineArrowLeft  size={32} className="icon-button"/>
          </Link>
          <h1 className="m-0">{singleData.button_title}</h1>
          <button onClick={logout}>Logout</button>
      </nav>

      <div className="dashboard-container">
        
        <div className="m-top-20">
          <div className="row space-between">
            <div className="col md-7 m-bottom-20 flex flex-align-end">
            {singleData.pnl_data_type != "pnl_token" ?(
              <div>
              <input type="file" ref={inputFileRef} />
              <button onClick={() => fileUpload(inputFileRef as React.RefObject<HTMLInputElement>)}>Upload Image</button>
              </div>
            ) : null}
            </div>
            <div className="col md-5 m-bottom-20 flex flex-align-end flex-md-justify-end">
              {singleData.pnl_data_type != "pnl_token" ? (<button className="button add m-right-10" onClick={() => handleAddNewItem(id as string)}>Add new item</button>) : null}
              <button className={`button update ${isDataChanged() ? "active" : ""}`} type="button" onClick={() => handleUpdateItems(id as string)}>Update List</button>
            </div>
          </div>
        </div>

        {singleData.pnl_data_type === "pnl_token" ?
        (<div>
          <label className="block font-medium">PnL Token</label>
          <input
              type="text"
              value={pnlToken}
              onChange={(e) => handleInputChange('', 'pnl_token', e.target.value)}
              className="border p-2 w-full rounded"
            />
        </div>) : null
        }
        <DndContext sensors={sensors} onDragEnd={(e) => handleDragEnd(e, id as string)}>
          <SortableContext items={singleData?.items ? Object.keys(singleData.items) : []} strategy={verticalListSortingStrategy}>
            {singleData.items && Object.entries(singleData.items).map(([key, item]) => (
              <SingleItems key={key} itemKey={key} itemName={item.item_name || ''} pnlDataType={singleData.pnl_data_type} singleItemData={singleItemData} onInputChange={handleInputChange} addNewHolder={addNewWalletHolder} deleteWalletHolder={deleteWalletHolder} deleteItem={deleteItem} blobs={blobs}/>
            ))}
          </SortableContext>
        </DndContext>
      </div>

    </div> 
    : <Loader/>}
    </>
  )
}
