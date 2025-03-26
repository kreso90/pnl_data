'use client';
import Loader from '@/components/Loader';
import useAuth from '@/hooks/useAuth';
import usePnlSingleData from '@/hooks/usePnlSingleData';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi';

export default function PnlSinglePage() {
  const { id } = useParams();
  const { logout } = useAuth();
  const { singleData, loading } = usePnlSingleData(id as string); 
  console.log(singleData)

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
    </div> 
    : <Loader/>}
    </>
  )
}
