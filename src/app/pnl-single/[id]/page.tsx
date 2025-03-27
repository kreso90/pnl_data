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
import { PutBlobResult } from '@vercel/blob';


export default function PnlSinglePage() {
  const { id } = useParams();
  const { logout } = useAuth();
  const { singleData, loading, singleItemData, handleDragEnd, handleInputChange, handleUpdateItems, handleAddNewItem, addNewWalletHolder, deleteWalletHolder, deleteItem, fileUpload } = usePnlSingleData(id as string); 
  const [ useNewItemName, setNewItemName ] = useState('')
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const sensors = useSensors(
    ...(isMobile ? [useSensor(TouchSensor, { activationConstraint: { delay: 0, tolerance: 5 } })] 
    : [useSensor(PointerSensor)])
  );

  const onInputChange = (item_name: string) => {
    setNewItemName(item_name)
  }

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

      <div>
      <input type="file" ref={inputFileRef} />
      <button onClick={() => fileUpload(inputFileRef as React.RefObject<HTMLInputElement>)}>
        Upload
      </button>
    </div>

      <div className="dashboard-container">
        <div className="m-top-20">
          <div className="row space-between flex-align-end">
            <div className="col md-6 m-bottom-20">
              <label htmlFor="item_name">Item name</label>
              <input type="text" id="item_name" onChange={(e) => onInputChange(e.target.value)}/>
            </div>
            <div className="col md-6 m-bottom-20">
              <button className="button add m-right-10" onClick={() => handleAddNewItem(id as string, useNewItemName)}>Add new item</button>
              <button className="button update" type="button" onClick={() => handleUpdateItems(id as string)}>Update List</button>
            </div>
          </div>
        </div>
        

        <DndContext sensors={sensors} onDragEnd={(e) => handleDragEnd(e, id as string)}>
          <SortableContext items={singleData?.items ? Object.keys(singleData.items) : []} strategy={verticalListSortingStrategy}>
            {singleData.items && Object.entries(singleData.items).map(([key, item]) => (
              <SingleItems key={key} itemKey={key} itemName={item.item_name || ''} pnlDataType={singleData.pnl_data_type} singleItemData={singleItemData} onInputChange={handleInputChange} addNewHolder={addNewWalletHolder} deleteWalletHolder={deleteWalletHolder} deleteItem={deleteItem}/>
          ))}
          </SortableContext>
        </DndContext>
      </div>

    </div> 
    : <Loader/>}
    </>
  )
}
