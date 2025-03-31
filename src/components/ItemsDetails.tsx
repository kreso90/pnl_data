import { ItemDetails } from '@/types/PnlData';
import { handleCopy } from '@/utils/clipboardUtils';
import React, { useEffect, useState } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

type ItemDetailsProps = {
  pnl_data_type: string;
  details: ItemDetails;
};

export default function ItemsDetails({ pnl_data_type, details }: ItemDetailsProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setIsActive(false);
    setCurrentPage(1);
    const timer = setTimeout(() => setIsActive(true), 200);
    return () => clearTimeout(timer);
  }, [pnl_data_type, details]);

  if (pnl_data_type === "top_wallets") {
    return (
        <div className={`box__details-wrapper ${isActive ? "active" : ""}`}>
            <div className="box__details">
                <div className="text-center m-bottom-15 effect-delay-1">
                    <div className="title-bg">
                    Number {details?.number} Wallet
                    </div>
                </div>

                <div className="copy effect-delay-2" onClick={() => handleCopy(details.item_name ?? '')}>
                    <div className="track gold">{details.item_name}</div>
                </div>

                <div className="effect-delay-3">
                    <p>Last 20 Trades:</p>
                    <ul className="list between-space-list">
                        <li>
                            <span>Average Daily Trades</span>
                            <span>${details?.average_daily_trades}</span>
                        </li>
                        <li>
                            <span>Average Holding Time Per Token</span>
                            <span>${details?.average_holding_time_per_token}</span>
                        </li>
                        <li>
                            <span>WinRate</span>
                            <span>${details?.win_rate}</span>
                        </li>
                        <li>
                            <span>Average Lose Percentage</span>
                            <span>${details?.average_lose_percentage}</span>
                        </li>
                        <li>
                            <span>Average Win Percentage</span>
                            <span>${details?.average_win_percentage}</span>
                        </li>
                        <li>
                            <span>Best Single Trade</span>
                            <span>${details?.best_single_trade}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
  }

  if (pnl_data_type === "daily_best") {
    return (
        <div className={`box__details-wrapper p-0 extra-box ${isActive ? "active" : ""}`}>
          <div className='box__image-wrapper effect-delay-1'>
            {details.box_image != '' ?
            <div className='box__image'>
                <img src={details.box_image} alt={details.box_image} style={{height:"100%"}}/>
            </div> : <div className='box__image'></div>}
          </div>

          <div className="box__details extra-box effect-delay-2">
            <div className="text-center m-bottom-15 ">
                <div className="title-bg brown">
                {details.item_name}
                </div>
            </div>

            <div className="copy effect-delay-3" onClick={() => handleCopy(details.wallet_address as string)}>
                <div className="track gold">{details.wallet_address}</div>
            </div>

            <div className="effect-delay-4">
                <p>Last 20 Trades:</p>
                <ul className="list between-space-list">
                    <li>
                        <span>WinRate</span>
                        <span>${details?.win_rate}</span>
                    </li>
                    <li>
                        <span>Average Lose Percentage</span>
                        <span>${details?.average_lose_percentage}</span>
                    </li>
                    <li>
                        <span>Average Win Percentage</span>
                        <span>${details?.average_win_percentage}</span>
                    </li>
                    <li>
                        <span>Best Single Trade</span>
                        <span>${details?.best_single_trade}</span>
                    </li>
                </ul>
            </div>
          </div>
      </div>
    );
  }

  if (pnl_data_type == "kol_wallets") {
    return(
        <div className={`box__details-wrapper ${isActive ? "active" : ""}`}>
            <div className="box__details xl">
                <div className="row">
                    <div className="col md-8 effect-delay-1">
                        <div className="text-center m-bottom-15">
                            <div className="title-bg brown"><a href={`https://${details.twitter}`} target='_blank'>{details.twitter}</a></div>
                        </div>

                        <div className="copy  effect-delay-2" onClick={() => handleCopy(details.wallet_address as string)}>
                            <div className="track">{details.wallet_address}</div>
                        </div>
                    </div>
                    <div className="col md-4  effect-delay-3">
                        <div className="box__details-logo m-side-auto m-lg-0 m-lg-left-auto">
                            <img src={`images/logo/${details.logo}`} alt={details.logo} />
                        </div>
                    </div>
                </div>
                <p className="m-0 effect-delay-4">Last 20 Trades:</p>
                <div className="column-lines effect-delay-5">
                    <div className="row">
                        <div className='col md-6 effect-delay-6'>
                            <ul className='m-0 between-space-list'>
                                <li>
                                    <span>Win Rate</span>
                                    <span>${details?.win_rate}</span>
                                </li>
                                <li>
                                    <span>Average Lose Percentage</span>
                                    <span>${details?.average_lose_percentage}</span>
                                </li>
                                <li>
                                    <span>Average Win Percentage</span>
                                    <span>${details?.average_win_percentage}</span>
                                </li>
                                <li>
                                    <span>Best Single Trade</span>
                                    <span>${details?.best_single_trade}</span>
                                </li>
                            </ul>
                        </div>
                        <div className='col md-6 effect-delay-7'>
                            <ul className='m-0 between-space-list'>
                                <li>
                                    <span>Daily Trading Average</span>
                                    <span>${details?.daily_trading_average}</span>
                                </li>
                                <li>
                                    <span>Average Holding Time</span>
                                    <span>${details?.average_holding_time_per_token}</span>
                                </li>
                                <li>
                                    <span>Frequency</span>
                                    <span>${details?.frequency}</span>
                                </li>
                                <li>
                                    <span>PnL Data Score</span>
                                    <span>${details?.pnl_data_score}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  if (pnl_data_type == "meme_coins") {

    const totalPages = Math.ceil((details.wallet_holders ? Object.keys(details.wallet_holders).length : 0) / 1);

    const currentItems = details.wallet_holders && Object.values(details.wallet_holders).slice((currentPage - 1) * 1, currentPage * 1);
 
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return(
        <div className={`box__details-wrapper box-logo-left ${isActive ? "active" : ""}`}>

            <div className="box__logo">
                <img className="effect-delay-1" src={details.logo} alt={details.logo} />
            </div>
          
            <div className="box__details lg">
                <div className="m-bottom-5 effect-delay-2">
                    <p className="m-0">Contract Address Token</p>
                    <div className="copy" onClick={() => handleCopy(details.wallet_address as string)}>
                        <div className="track gold">{details.wallet_address}</div>
                    </div>
                </div>

                {currentItems &&
                Object.values(currentItems).map((item, index) => (
                <div key={index}>
                    <div className="m-bottom-10 effect-delay-3">
                        <p className="m-0">Wallet Address Holder {currentPage}</p>
                        <div className="copy" onClick={() => handleCopy(item.wallet_address as string)}>
                            <div className="track gold">{item.wallet_address}</div>
                        </div>
                    </div>
                    <p className="m-0 effect-delay-4">Last 20 Trades:</p>
                    <div className="column-lines">
                        <div className="row">
                            <div className='col md-6 effect-delay-5'>
                                <ul className='m-0 between-space-list'>
                                    <li>
                                        <span>Total Holdings</span>
                                        <span>{item.total_holdings}</span>
                                    </li>
                                    <li>
                                        <span>Amount sold in</span>
                                        <span>{item.amount_sold_in}</span>
                                    </li>
                                    <li>
                                        <span>Average Win Percentage</span>
                                        <span>{item.holdings_in}</span>
                                    </li>
                                    <li>
                                        <span>Best Single Trade</span>
                                        <span>{item.holdings_since}</span>
                                    </li>
                                </ul>
                                <div className="box__pagination">
                                    <div onClick={goToPrevPage}><HiChevronDoubleLeft size={20}/></div>
                                    <span>{currentPage} / {totalPages}</span>
                                    <div onClick={goToNextPage}><HiChevronDoubleRight size={20}/></div>
                                </div>
                            </div>
                            <div className='col md-6 effect-delay-6'>
                                <ul className='m-top-20 m-lg-0'>
                                    <li className="track small m-side-auto m-lg-0">
                                        <a href={details.token_website} target="_blank" >Token Website</a>
                                    </li>
                                    <li className="track small m-side-auto m-lg-0">
                                        <a href={details.telegram} target="_blank">Token Telegram Channel</a>
                                    </li>
                                    <li className="track small m-side-auto m-lg-0">
                                        <a href={details.token_x} target="_blank">Token X Account</a>
                                    </li>
                                    <li className="track small m-side-auto m-lg-0"> 
                                        <a href={details.token_bullx_chart} target="_blank">Open Chart On BullX</a>
                                    </li>
                                    <li className="track small m-side-auto m-lg-0"> 
                                        <a href={details.token_bullx_chart} target="_blank">Open Chart On HyperLiquid</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                ))}

            
            </div>
        </div>
    )
  }

  if(pnl_data_type == "top_x_accounts"){
    return(
        <div className={`box__details-wrapper box-logo-right ${isActive ? "active" : ""}`}>
            <div className="box__logo">
                <img className="effect-delay-1" src={details.profile_img} alt={details.profile_img} />
            </div>
            <div className="box__details lg">
                <div className="row">
                    <div className="col md-6 effect-delay-2">
                        <div className="flex-v-center">
                            <div className="box__details-logo gold m-right-10">
                                <img src={details.logo} alt={details.logo} />
                            </div>
                            <div className="title-bg brown">
                                {details.item_name}
                            </div>
                        </div>
                    </div>
                    <div className="col md-6 effect-delay-3">
                       <ul className='m-top-10 m-lg-0'>
                            <li className="track small m-side-auto m-lg-0 m-lg-left-auto">
                                <a href={details.token_website} target="_blank" >Token Website</a>
                            </li>
                            <li className="track small m-side-auto m-lg-0 m-lg-left-auto">
                                <a href={details.telegram} target="_blank">Token Telegram Channel</a>
                            </li>
                            <li className="track small m-side-auto m-lg-0 m-lg-left-auto">
                                <a href={details.token_x} target="_blank">Token X Account</a>
                            </li>
                       </ul>
                    </div>
                </div>
                <p className="m-0 m-top-10 effect-delay-4">Statistics</p>
                <div className="column-lines effect-delay-5">
                    <div className="row">
                        <div className='col md-6 effect-delay-6'>
                            <ul className='m-0 between-space-list'>
                                <li>
                                    <span>Followers</span>
                                    <span>{details.followers}</span>
                                </li>
                                <li>
                                    <span>Total Posts</span>
                                    <span>{details.total_posts}</span>
                                </li>
                                <li>
                                    <span>Posts in last 7 days</span>
                                    <span>{details.posts_last_seven_days}</span>
                                </li>
                            </ul>
                        </div>
                        <div className='col md-6 effect-delay-7'>
                            <ul className='m-0 between-space-list'>
                                <li>
                                    <span>Frequent Challenges</span>
                                    <span>{details.frequent_challenges}</span>
                                </li>
                                <li>
                                    <span>Most endorsed Token</span>
                                    <span>{details.most_endorsed_token}</span>
                                </li>
                                <li className="flex-column">
                                    <p className="m-0">Contract address Token</p>
                                    <div className="copy bottom-10" onClick={() => handleCopy(details.contract_address_token as string)}>
                                        <div className="track">{details.contract_address_token}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  if(pnl_data_type == "alpha_groups"){
    return(
        <div className={`box__details-wrapper ${isActive ? "active" : ""}`}>
            <div className="box__details xl">
                <div className="row">
                    <div className="col md-8">
                        <div className="text-center m-bottom-15 effect-delay-1">
                            <div className="title-bg brown">{details.item_name}</div>
                        </div>

                        <div className="track effect-delay-2"><a href={`https://${details.telegram}`} target='_blank'>{details.telegram}</a></div>
                        
                    </div>
                    <div className="col md-4 effect-delay-3">
                        <div className="box__details-logo m-side-auto m-top-10 m-bottom-10 m-lg-0 m-lg-left-auto">
                            <img src={details.logo} alt={details.logo} />
                        </div>
                    </div>
                </div>
                <p className="m-0 effect-delay-4">Last 20 Trades:</p>
                <div className="column-lines effect-delay-5">
                    <div className="row">
                        <div className='col md-6 effect-delay-6'>
                            <ul className='m-0 between-space-list'>
                                <li>
                                    <span>Win Rate</span>
                                    <span>${details?.win_rate}</span>
                                </li>
                                <li>
                                    <span>Average Lose Percentage</span>
                                    <span>${details?.average_lose_percentage}</span>
                                </li>
                                <li>
                                    <span>Average Win Percentage</span>
                                    <span>${details?.average_win_percentage}</span>
                                </li>
                                <li>
                                    <span>Best Single Trade</span>
                                    <span>${details?.best_single_trade}</span>
                                </li>
                            </ul>
                        </div>
                        <div className='col md-6 effect-delay-7'>
                            <ul className='m-0 between-space-list'>
                                <li>
                                    <span>Daily Trading Average</span>
                                    <span>${details?.daily_trading_average}</span>
                                </li>
                                <li>
                                    <span>Frequency</span>
                                    <span>${details?.frequency}</span>
                                </li>
                                <li>
                                    <span>Monthly Fee</span>
                                    <span>${details?.monthly_fee}</span>
                                </li>
                                <li>
                                    <span>Free Version Available</span>
                                    <span>${details?.free_version_available}</span>
                                </li>
                                <li>
                                    <span>PnL Data Score</span>
                                    <span>${details?.pnl_data_score}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  if(pnl_data_type == "upcoming_projects"){
    return(
        <div className={`box__details-wrapper ${isActive ? "active" : ""}`}>
            <div className="box__details p-0 flex-lg">

                <div className="p-10 font-20 effect-delay-1">{details.status}</div>

                <div className="flex-v-center side-borders p-10 effect-delay-2">
                    <div className="row">
                        <div className="col lg-4">
                            <p className="m-bottom-5 m-top-0 font-20">Description</p>
                            <p className="m-top-0 font-18">{details.project_name}</p>
                        </div>
                        <div className="col lg-8 m-bottom-30">
                            <div className="all-borders p-10">{details.description}</div>
                        </div>
                        <div className="col lg-4">
                            <p className="m-bottom-5 m-top-0 font-18">Start date: {details.start_date}</p>
                        </div>
                        <div className="col lg-8">
                            <ul className="m-0">
                                <li className="track small m-left-auto">
                                    <a href={details.token_website} target="_blank">Token Website</a>
                                </li>
                                <li className="track small m-left-auto"> 
                                    <a href={details.token_telegram} target="_blank">Token Telegram Channel</a>
                                </li>
                                <li className="track small m-left-auto">
                                    <a href={details.token_x} target="_blank">Token X Account</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="p-10 effect-delay-3">
                    <div className="box__details-logo md">
                        <img src={details.logo} alt={details.logo} />
                    </div>
                </div>
            </div>
        </div>
    )
  }

  if (pnl_data_type == "first_originals") {
    return(
        <div className={`box__details-wrapper box-logo-left ${isActive ? "active" : ""}`}>

            <div className="box__logo">
                <img className="effect-delay-1" src={details.logo} alt={details.logo} />
            </div>
          
            <div className="box__details lg">
                <div className="m-bottom-5 effect-delay-2">
                    <p className="m-0">Contract Address Token</p>
                    <div className="copy" onClick={() => handleCopy(details.wallet_address as string)}>
                        <div className="track gold">{details.wallet_address}</div>
                    </div>
                </div>

                {details.wallet_holders &&
                Object.values(details.wallet_holders).map((item, index) => (
                <div key={index}>
                    <div className="m-bottom-10 effect-delay-3">
                        <p className="m-0">Wallet Address Deployer</p>
                        <div className="copy" onClick={() => handleCopy(item.wallet_address_deployer as string)}>
                            <div className="track gold">{item.wallet_address_deployer}</div>
                        </div>
                    </div>
                    <p className="m-0 effect-delay-4">Statistics:</p>
                    <div className="column-lines effect-delay-5">
                        <div className="row">
                            <div className='col md-6 effect-delay-6'>
                                <ul className='m-0'>
                                    <li className="flex space-between">
                                        <span>Total Deployed Projects</span>
                                        <span>{item.total_deployed_projects}</span>
                                    </li>
                                    <li className="flex space-between">
                                        <span>Total Migrated</span>
                                        <span>{item.total_migrated}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className='col md-6 effect-delay-7'>
                                <ul className='m-top-20 m-lg-0'>
                                    <li className="track small m-side-auto m-lg-0">
                                        <a href={details.token_website} target="_blank" >Token Website</a>
                                    </li>
                                    <li className="track small m-side-auto m-lg-0">
                                        <a href={details.telegram} target="_blank">Token Telegram Channel</a>
                                    </li>
                                    <li className="track small m-side-auto m-lg-0">
                                        <a href={details.token_x} target="_blank">Token X Account</a>
                                    </li>
                                    <li className="track small m-side-auto m-lg-0"> 
                                        <a href={details.token_bullx_chart} target="_blank">Open Chart On BullX</a>
                                    </li>
                                    <li className="track small m-side-auto m-lg-0"> 
                                        <a href={details.bullx_referral} target="_blank">BullX Neo Referral Link</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                ))}

            
            </div>
        </div>
    )
  }

  if (pnl_data_type == "top_yt_accounts") {
    return(
        <div className={`box__details-wrapper box-logo-right ${isActive ? "active" : ""}`}>
            <div className="box__logo">
                <img className="effect-delay-1" src={details.profile_img} alt={details.profile_img} />
            </div>
            <div className="box__details lg">
                <div className="row">
                    <div className="col md-6 effect-delay-2">
                        <div className="flex-v-center">
                            <div className="box__details-logo gold m-right-10">
                                <img src={details.logo} alt={details.logo} />
                            </div>
                            <div className="title-bg brown">
                                {details.item_name}
                            </div>
                        </div>
                    </div>
                    <div className="col md-6 effect-delay-3">
                      <ul className='m-top-20 m-lg-0'>
                          <li className="track small m-side-auto m-lg-0 m-lg-left-auto">
                              <a href={details.token_website} target="_blank" >Token Website</a>
                          </li>
                          <li className="track small m-side-auto m-lg-0 m-lg-left-auto">
                              <a href={details.telegram} target="_blank">Token Telegram Channel</a>
                          </li>
                          <li className="track small m-side-auto m-lg-0 m-lg-left-auto">
                              <a href={details.token_x} target="_blank">Token X Account</a>
                          </li>
                      </ul>
                    </div>
                </div>
                <p className="m-0 m-top-10 effect-delay-4">Statistics</p>
                <div className="column-lines effect-delay-5">
                    <div className="row">
                        <div className='col md-6 effect-delay-6'>
                            <ul className='m-0 between-space-list'>
                                <li>
                                    <span>Subscribers</span>
                                    <span>{details.subscribers}</span>
                                </li>
                                <li>
                                    <span>Total Videos</span>
                                    <span>{details.total_videos}</span>
                                </li>
                                <li>
                                    <span>Monthly frequency</span>
                                    <span>{details.monthly_frequency}</span>
                                </li>
                            </ul>
                        </div>
                        <div className='col md-6 effect-delay-7'>
                            <ul className='m-0 between-space-list'>
                                <li>
                                    <span>Frequent Challenges</span>
                                    <span>{details.frequent_challenges}</span>
                                </li>
                                <li>
                                    <span>Most endorsed Token</span>
                                    <span>{details.most_endorsed_token}</span>
                                </li>
                                <li className="flex-column">
                                    <p className="m-0">Contract address Token</p>
                                    <div className="copy bottom-10" onClick={() => handleCopy(details.contract_address_token as string)}>
                                        <div className="track">{details.contract_address_token}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  return null;
}
