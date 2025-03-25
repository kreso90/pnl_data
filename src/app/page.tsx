"use client";
import ItemsList from "@/components/ItemsList";
import Loader from "@/components/Loader";
import PnlButton from "@/components/PnlButton";
import usePnlData from "@/hooks/usePnlData";
import { PnlType } from "@/types/PnlData";
import {AffiliateContent, DisclaimerContent, FaqContent, KolContent, PnlCardsContent, PrivateContent, RoadmapContent, TrackContent, UpcomingContent, WalletContent, XAccountContent} from "@/components/Docs";
import React, { JSX, useState } from "react";
import { HiX } from "react-icons/hi";

export default function HomePage() {
  const { data, loading } = usePnlData(); 
  const [selectedDoc, setSelectedDoc] = useState('')
  const [selectedPnlType, setSelectedPnlType] = useState<PnlType | null>(null);
  
  const handleButtonClick = (pnlType: PnlType) => {
    setSelectedPnlType(pnlType); 
    setSelectedDoc(''); 
  };

  const handleClose = () => {
    setSelectedPnlType(null);
    setSelectedDoc(''); 
  };

  const handleDocsButtonClick = (doc_type: string) => {
    setSelectedDoc(doc_type);  
    setSelectedPnlType(null);
  };
  
  const contentMap: Record<string, () => JSX.Element> = {
      roadmap: RoadmapContent,
      faq: FaqContent,
      disclaimer: DisclaimerContent,
      track: TrackContent,
      kol: KolContent,
      private: PrivateContent,
      xaccount: XAccountContent,
      wallet: WalletContent,
      upcoming: UpcomingContent,
      pnlcards: PnlCardsContent,
      affiliate: AffiliateContent
  };

  return (
    <>
      {!loading ? (
        <div className="main">
          <div className="header">

            <div className="header__column">
              <div className="header__logo">
                <img src="/images/pnl-logo.png" alt="PnL Logo" />
              </div>
            </div>

            <div className="header__column">

              <div className="row space-center">
                {data.slice(0,5).map((pnlType, index) => (
                  <div key={index} className="col xs-6 s-4 lg-2">
                    <PnlButton 
                      title={pnlType.button_title ?? ""} 
                      button_subtitle_1={pnlType.button_subtitle_1 ?? ""} 
                      button_subtitle_2={pnlType.button_subtitle_2 ?? ""}
                      copy_text={pnlType.copy_text ?? ""}
                      link={pnlType.link}
                      pnl_data_type={pnlType.pnl_data_type}
                      selectedButton={selectedPnlType?.pnl_data_type}
                      pnl_data={pnlType}
                      handleClickButon={() => handleButtonClick(pnlType)}
                    />
                  </div>
                ))}
              </div>

              <div className="row space-center">
                {data.slice(5).map((pnlType, index) => (
                  <div key={index} className="col xs-6 s-4 lg-2">
                    <PnlButton 
                      title={pnlType.button_title ?? ""} 
                      button_subtitle_1={pnlType.button_subtitle_1 ?? ""} 
                      button_subtitle_2={pnlType.button_subtitle_2 ?? ""}
                      copy_text={pnlType.copy_text ?? ""}
                      link={pnlType.link}
                      pnl_data_type={pnlType.pnl_data_type}
                      selectedButton={selectedPnlType?.pnl_data_type}
                      pnl_data={pnlType}
                      handleClickButon={() => handleButtonClick(pnlType)}
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>

          {selectedPnlType?.pnl_data_type != null ?
          <ItemsList 
            pnl_data_title_1={selectedPnlType?.pnl_data_title_1}
            pnl_data_title_2={selectedPnlType?.pnl_data_title_2}
            pnl_data_title_3={selectedPnlType?.pnl_data_title_3}
            pnl_data_title_small_1={selectedPnlType?.pnl_data_title_small_1}
            pnl_data_title_small_2={selectedPnlType?.pnl_data_title_small_2}
            pnl_data_subtitle={selectedPnlType?.pnl_data_subtitle}
            items={selectedPnlType?.items}
            pnl_data_type={selectedPnlType?.pnl_data_type}
            handleCloseClick={handleClose}
          /> : null}

          {selectedDoc && contentMap[selectedDoc] ? (
          <div className="content-container">
            <div className="box__close">
              <HiX size={32} onClick={handleClose} />
            </div>
            {React.createElement(contentMap[selectedDoc])}
          </div>
          ) : null}
       
          <footer>
            <div className={`pnl-button-gold ${selectedDoc === 'roadmap' ? 'active' : ''}`}
                  onClick={() => handleDocsButtonClick('roadmap')}> 
                <span>Roadmap</span>
            </div>

            <div className={`pnl-button-gold ${selectedDoc === 'faq' ? 'active' : ''}`} onClick={() => handleDocsButtonClick('faq')}> 
                <span>FAQ</span>
            </div>

            <div className={`pnl-button-gold ${selectedDoc === 'kol' ? 'active' : ''}`} onClick={() => handleDocsButtonClick('kol')}>
                <span>Submit Kol<br/>Request</span>
            </div>

            <div className={`pnl-button-gold ${selectedDoc === 'private' ? 'active' : ''}`} onClick={() => handleDocsButtonClick('private')}>
                <span>Submit Private<br/>TG Group Request</span>
            </div>

            <div className={`pnl-button-gold ${selectedDoc === 'xaccount' ? 'active' : ''}`} onClick={() => handleDocsButtonClick('xaccount')}>
                <span>Submit Best<br/>X Account Request</span>
            </div>

            <div className={`pnl-button-gold ${selectedDoc === 'wallet' ? 'active' : ''}`} onClick={() => handleDocsButtonClick('wallet')}>
                <span>Submit Top 10<br/>Wallet Request</span>
            </div>

            <div className={`pnl-button-gold ${selectedDoc === 'upcoming' ? 'active' : ''}`} onClick={() => handleDocsButtonClick('upcoming')}>
                <span>Submit Upcoming<br/>Project Request</span>
            </div>

            <div className={`pnl-button-gold ${selectedDoc === 'pnlcards' ? 'active' : ''}`} onClick={() => handleDocsButtonClick('pnlcards')}>
                <span>Upload Your<br/>PnL Cards</span>
            </div>

            <div className={`pnl-button-gold ${selectedDoc === 'track' ? 'active' : ''}`} onClick={() => handleDocsButtonClick('track')}>
                <span>How to track<br/>And copy trade</span>
            </div>

            <div className={`pnl-button-gold ${selectedDoc === 'affiliate' ? 'active' : ''}`} onClick={() => handleDocsButtonClick('affiliate')}> 
                <span>Affiliate Links</span>
            </div>

            <div className={`pnl-button-gold ${selectedDoc === 'disclaimer' ? 'active' : ''}`} onClick={() => handleDocsButtonClick('disclaimer')}> 
                <span>Disclaimer</span>
            </div>
          
          </footer>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
