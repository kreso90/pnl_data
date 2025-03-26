import { ItemDetails } from '@/types/PnlData';
import React, { useEffect, useState } from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

interface PaginationProps{
  items?: ItemDetails;
  itemsPerPage: number;
  handleItemClick: (item: ItemDetails) => void; 
}

export default function PaginationList({items, itemsPerPage, handleItemClick}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil((items ? Object.keys(items).length : 0) / itemsPerPage);

  const currentItems = items && Object.values(items).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
      setCurrentPage(1);
  }, [items]);

  return (
    <div className="box__list">
      <ul className="opacity-effect">
        {currentItems && currentItems.map((item, index) => (
        <li className='track' key={index} onClick={() => handleItemClick(item)}>
            {item.item_name}
        </li>
        ))}
      </ul>
      <div className="box__pagination">
        <div onClick={goToPrevPage}><HiChevronDoubleLeft size={20}/></div>
        <span>{currentPage} / {totalPages}</span>
        <div onClick={goToNextPage}><HiChevronDoubleRight size={20}/></div>
      </div>
    </div>
  )
}
