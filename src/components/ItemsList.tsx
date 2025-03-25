import { ItemDetails } from "@/types/PnlData";
import React, { useEffect, useState } from "react";
import Pagination from "./PaginationList";
import ItemsDetails from "./ItemsDetails";
import { HiX } from "react-icons/hi";

interface PnlDataTypePros {
  pnl_data_title_1?: string;
  pnl_data_title_2?: string;
  pnl_data_title_3?: string;
  pnl_data_subtitle?: string;
  pnl_data_title_small_1?: string;
  pnl_data_title_small_2?: string;
  pnl_data_type?: string;
  items?: ItemDetails;
  handleCloseClick: () => void;
}

export default function ItemsList({
  pnl_data_title_1,
  pnl_data_title_2,
  pnl_data_title_3,
  pnl_data_subtitle,
  pnl_data_title_small_1,
  pnl_data_title_small_2,
  pnl_data_type,
  items,
  handleCloseClick
}: PnlDataTypePros) {

  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemDetails | null>(null);

  const handleItemClick = (items: ItemDetails) => {
    setSelectedItem(items);
  };

  const handleCloseButton = () => {
    setIsActive(false);
    setSelectedItem(null);
    handleCloseClick();
  };

  useEffect(() => {
    setIsActive(false);
    setSelectedItem(null);
    const timer = setTimeout(() => setIsActive(true), 200);
    return () => clearTimeout(timer);
  }, [pnl_data_type]);

  return ( 
  <div className={`box ${isActive ? "active" : ""}`}>

    <div className="box__close">
      <HiX size={32} onClick={handleCloseButton} />
    </div>
    
    <div className="box__title">
      <svg version="1.1" viewBox="0 0 2080 830" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid">
        <path style={{
            fill: "rgba(9, 62, 41, 0.8)",
            stroke: "rgb(38, 227, 194)",
            strokeWidth: "20px"
        }} d="M 1926.11 818 C 2012.59 682.731 2060.35 570.825 2062 421.874 C 2060.35 272.874 2019.94 168.152 
            1930 18 L 402.577 18 L 402.577 107.386 L 331.871 18 L 37.025 18 C 37.025 18 155.971 225.871 155 416.213 
            C 156 622.394 37.025 818 37.025 818 L 1926.11 818 Z"></path>
        <text x="50%" y={pnl_data_title_3 != '' ? "25%" : "35%"} className="svg-box__title" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy="0">{pnl_data_title_1}</tspan>
            <tspan x="50%" dy="1.2em">{pnl_data_title_2}</tspan>
            <tspan x="50%" dy="1.2em">{pnl_data_title_3}</tspan>
        </text>
        <text x="50%" y="35%" className="svg-box__title__small" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy="1.25em">{pnl_data_title_small_1}</tspan>
            <tspan x="50%" dy="1em">{pnl_data_title_small_2}</tspan>
        </text>
        <text x="50%" y="85%" className="svg-box__subtitle" textAnchor="middle" dominantBaseline="middle">{pnl_data_subtitle}</text>
      </svg>
    </div>

    <div className="box__content">
      <Pagination itemsPerPage={5} items={items} handleItemClick={handleItemClick}/>
      {selectedItem && <ItemsDetails pnl_data_type={pnl_data_type!} details={selectedItem}/>}
    </div>
  </div>
  );
}
