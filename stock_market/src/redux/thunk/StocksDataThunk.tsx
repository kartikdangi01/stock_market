import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IStock } from "../slices/StocksSlice";

const API_URL = 'https://kdu-automation.s3.ap-south-1.amazonaws.com/mini-project-apis/stocks.json';

interface IItemInfo{
    stock_name : string,
    stock_symbol: string,
    base_price: number
}

export const fetchStocks = createAsyncThunk<IStock[]>(
    "stocks/fetchStocks",
    async () => {
        const response = await axios.get(API_URL);
        if (response.data) {
            const responseData = response.data;
            const mappedData: IStock[] = responseData.map((item: IItemInfo) => ({
                name: item.stock_name,
                symbol: item.stock_symbol,
                basePrice: item.base_price,
                isWatchlist: false
            }));
            return mappedData;
        } else {
            throw new Error("Failed to fetch stocks");
        }
    }
);