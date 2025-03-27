'use client';
import Loader from '@/components/Loader';
import SingleItems from '@/components/SingleItem';
import useAuth from '@/hooks/useAuth';
import usePnlSingleData from '@/hooks/usePnlSingleData';
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { isMobile } from 'react-device-detect';


export default function PnlSinglePage() {
  const { id } = useParams();
  const { logout } = useAuth();
  const { singleData, loading, singleItemData, handleDragEnd, handleInputChange, handleUpdateItems } = usePnlSingleData(id as string); 

  const sensors = useSensors(
    ...(isMobile ? [useSensor(TouchSensor, { activationConstraint: { delay: 0, tolerance: 5 } })] 
    : [useSensor(PointerSensor)])
  );

  return (
    <>
    {!loading ?
    <div className='main'>
      <nav>
          <Link href="/dashboard">
            <HiOutlineArrowLeft  size={32} className="icon-button"/>
          </Link>
          <h1 className="m-0">{singleData.button_title}</h1>
          <button onClick={logout}>Logout</button>
      </nav>
      
      <button className="button update" type="button" onClick={() => handleUpdateItems(id as string)}>Update List</button>

      <DndContext sensors={sensors} onDragEnd={(e) => handleDragEnd(e, id as string)}>
        <SortableContext items={singleData?.items ? Object.keys(singleData.items) : []} strategy={verticalListSortingStrategy}>
          {singleData.items && Object.entries(singleData.items).map(([key, item]) => (
            <SingleItems key={key} itemKey={key} itemName={item.item_name || ''} singleItemData={singleItemData} onInputChange={handleInputChange}/>
          ))}
        </SortableContext>
      </DndContext>
    </div> 
    : <Loader/>}
    </>
  )
}
