import { PnlType } from '@/types/PnlData';
import { handleCopy } from '@/utils/clipboardUtils';
import Link from 'next/link';
import React, { useState } from 'react';

interface PnlButtonProps {
    title?: string;
    button_subtitle_1?: string;
    button_subtitle_2?: string;
    link?: string;
    copy_text?: string;
    pnl_data_type?: string;
    selectedButton?: string;
    pnl_data?: PnlType,
    isDashButton: boolean,
    handleClickButon?: (pnl_data_type: string, pnl_data: PnlType) => void;
}

export default function PnlButton({ title, button_subtitle_1, button_subtitle_2, link, copy_text, pnl_data_type, selectedButton, pnl_data, handleClickButon, isDashButton }: PnlButtonProps) {

  const handleButtonClick = () => {
    const selectedText = copy_text || pnl_data_type || '';
    
    if (copy_text) {
      handleCopy(selectedText);
    }

    if (handleClickButon) {
      handleClickButon(selectedText, pnl_data!);
    }
  };

  const isActive = selectedButton === pnl_data_type;
  const buttonClass = `pnl-button ${isActive ? "active" : ""}`;

  const ButtonContent = (
    <div className={buttonClass} onClick={handleButtonClick}>
      <svg className="svg-button" version="1.1" viewBox="0 0 2080 1085" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid">
        <path d="M 1926.11 555 C 2012.587 464.2 2060.351 389.084 2062 289.1 C 2060.351 189.084 2019.937 118.789 1930 18 L 402.577 18 L 402.577 78 L 331.871 18 L 37.025 18 C 37.025 18 155.971 157.533 155 285.3 C 156 423.7 37.025 555 37.025 555 L 890 555 L 890 650 L 20 650 L 20 1069 L 2061.07 1069 L 2062 650 L 1210 650 L 1210 555 L 1926.11 555 Z" />
        <text x="52%" y="30%" className="svg-button__title" textAnchor="middle" dominantBaseline="middle">{title}</text>
        <text x="50%" y="74%" className="svg-button__subtitle" textAnchor="middle" dominantBaseline="middle">
          <tspan x="50%" dy="0">{button_subtitle_1}</tspan>
          <tspan x="50%" dy="1.2em">{button_subtitle_2}</tspan>
        </text>
      </svg>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {ButtonContent}
    </a>
  ) : isDashButton ? (
    <Link href={`/pnl-single/${pnl_data_type}`}>
      {ButtonContent}
    </Link>
  ) : (
    ButtonContent
  );
}
