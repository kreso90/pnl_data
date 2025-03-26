export interface WalletHolder {
    wallet_address?: string;
    total_holdings?: string;
    amount_sold_in?: string;
    holdings_in?: string;
    holdings_since?: string;
    total_deployed_projects?: string;
    total_migrated?: string;
    wallet_address_deployer?: string;
}

export interface ItemDetails{
    number?: string;
    item_name?: string;
    status?: string;
    description?: string;
    logo?: string;
    image_date?: string;
    twitter?: string;
    telegram?: string;
    average_daily_trades?: string;
    average_holding_time_per_token?: string;
    average_holding_time?: string;
    win_rate?: string;
    average_lose_percentage?: string;
    average_win_percentage?: string;
    best_single_trade?: string;
    pnl_data_score?: string;
    wallet_holders?: WalletHolder;
    followers?: string;
    total_posts?: string;
    posts_last_seven_days?: string;
    frequent_challenges?: string;
    most_endorsed_token?: string;
    contract_address_token?: string;
    token_logo?: string;
    profile_img?: string;
    token_website?: string;
    token_telegram?: string;
    token_x?: string;
    daily_trading_average?: string;
    frequency?: string;
    monthly_fee?: string;
    free_version_available?: string;
    token_bullx_chart?: string;
    token_ox_fun?: string;
    wallet_number?: string;
    project_name?: string;
    start_date?: string;
    bullx_referral?: string;
    subscribers?: string;
    total_videos?: string;
    monthly_frequency?: string;
    wallet_address?: string;
}

export interface PnlType{
    button_title?: string;
    button_subtitle_1?: string,
    button_subtitle_2?: string,
    pnl_data_title_1?: string,
    pnl_data_title_2?: string,
    pnl_data_title_3?: string,
    pnl_data_subtitle?: string,
    pnl_data_title_small_1?: string;
    pnl_data_title_small_2?: string;
    pnl_data_type?: string;
    link?: string;
    copy_text?: string;
    items?: Record<string, ItemDetails>;
}

export interface PnlTypeData{
    data: PnlType[];
    loading: boolean,
    error: string | null,
}

export interface PnlSingleTypeData{
    singleData: PnlType;
    loading: boolean,
    error: string | null,
}