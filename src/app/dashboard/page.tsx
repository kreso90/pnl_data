'use client';
import Loader from '@/components/Loader';
import PnlButton from '@/components/PnlButton';
import useAuth from '@/hooks/useAuth';
import usePnlData from '@/hooks/usePnlData';
import { PnlType } from '@/types/PnlData';
import Link from 'next/link';
import React, { useState } from 'react'
import { HiHome } from 'react-icons/hi';

export default function Dashboard() {
  const { logout } = useAuth();
  const { data, loading } = usePnlData(); 

  const [selectedPnlType, setSelectedPnlType] = useState<PnlType | null>(null);
    
  const handleButtonClick = (pnlType: PnlType) => {
    setSelectedPnlType(pnlType); ; 
  };

  return (
    <>
    {!loading ? 
    <div className="main">
      <div>
        <nav>
          <Link href="/">
            <HiHome size={32} className="icon-button"/>
          </Link>
          <h1 className="m-0">Dashboard</h1>
          <button onClick={logout}>Logout</button>
        </nav>
        
        <div className="row">
          {data.map((pnlType, index) => (   
            pnlType?.pnl_data_type && pnlType.pnl_data_type !== '' ? (         
            <div key={index} className="col xs-6 s-4 lg-2">
              <PnlButton 
                title={pnlType.button_title ?? ""} 
                button_subtitle_1={pnlType.button_subtitle_1 ?? ""} 
                button_subtitle_2={pnlType.button_subtitle_2 ?? ""}
                pnl_token={pnlType.pnl_token ?? ""}
                link={pnlType.link}
                pnl_data_type={pnlType.pnl_data_type}
                selectedButton={selectedPnlType?.pnl_data_type}
                pnl_data={pnlType}
                handleClickButon={() => handleButtonClick(pnlType)}
                isDashButton={true}
              />
            </div>
          ) : null ))}
        </div>
      </div>
    </div> : <Loader/>}
    </>
  )
}
