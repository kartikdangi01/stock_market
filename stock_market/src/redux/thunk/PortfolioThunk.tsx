import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TransactionsByDate } from "../slices/PortfolioSlice";
import { mapData, sortFnByDate } from "../../components/Utils/Utils";

const API_URL = 'https://kdu-automation.s3.ap-south-1.amazonaws.com/mini-project-apis/portfolio-transactions.json';

export interface StockTransactionJSON {
    stock_name: string;
    stock_symbol: string;
    transaction_price: number;
    timestamp: string;
    status: string;
}

export const fetchPortfoliosTxns = createAsyncThunk<TransactionsByDate>(
    "portfolio/fetchPortfoliosTxns",
    async () => {
        const response = await axios.get(API_URL);
        if (response.data) {
            const responseData = response.data;
            responseData.sort(sortFnByDate);
            const mappedData = mapData(responseData);
            return mappedData;
        } else {
            throw new Error("Failed to fetch products");
        }
    }
);