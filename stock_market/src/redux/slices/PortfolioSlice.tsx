import { createSlice } from "@reduxjs/toolkit";
import { fetchPortfoliosTxns } from "../thunk/PortfolioThunk";
import { findAllStocks } from "../../components/Utils/Utils";

export interface TransactionsByDate {
    [date: string]: StockTransaction[];
}

export interface StockTransaction {
    stock_name: string;
    stock_symbol: string;
    transaction_price: number;
    timestamp: string;
    status: string;
}

export interface IPortfolio {
    initialTxns: TransactionsByDate;
    search: string;
    startDate: string;
    endDate: string;
    txnType: string[];
    selectedStocks: string[];
    stocks: string[];
    status: "pending" | "loading" | "success" | "fail";
    error: string | undefined;
}

const initialState : IPortfolio = {
    initialTxns: {},
    search: '',
    startDate: '',
    endDate: '',
    txnType: [],
    selectedStocks: [],
    stocks: [],
    status: "pending",
    error: ''
}

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setSearch: (state,action) => {
            state.search = action.payload
        },
        setStartDate: (state,action) => {
            state.startDate = action.payload
        },
        setEndDate: (state,action) => {
            state.endDate = action.payload
        },
        setTxnType: (state,action) => {
            if(state.txnType.includes(action.payload)){
                const txnArray = state.txnType.filter((type) => type !== action.payload);
                state.txnType = txnArray;
            }
            else{
                state.txnType.push(action.payload);
            }
        },
        setStocks: (state,action) => {
            const avlStocks = findAllStocks(action.payload);
            state.stocks = avlStocks;
        },
        setSelectedStocks: (state,action) => {
            if(state.selectedStocks.includes(action.payload)){
                const selectedArr = state.selectedStocks.filter((type) => type !== action.payload);
                state.selectedStocks = selectedArr;
            }
            else{
                state.selectedStocks.push(action.payload);
            }
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        clearAllFilter: (state) => {
            state.search = '';
            state.endDate = '';
            state.startDate = '';
            state.txnType = [];
            state.selectedStocks = [];
        },
        addTransaction: (state,action) => {
            const date = action.payload.timestamp.split('T')[0]; 
            if(!state.initialTxns[date]){
                state.initialTxns = Object.assign({[date] : [action.payload]},state.initialTxns);
            }
            else{
                const arr = state.initialTxns[date];
                arr.push(action.payload);
                state.initialTxns[date] = (arr);
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPortfoliosTxns.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPortfoliosTxns.fulfilled, (state, action) => {
                state.status = "success";
                const stocksTxns = action.payload;
                state.initialTxns = stocksTxns;
            })
            .addCase(fetchPortfoliosTxns.rejected, (state, action) => {
                state.status = "fail";
                state.error = action.error.message;
            });
    },
})

export default portfolioSlice.reducer;
export const {setEndDate,setSearch,setSelectedStocks,setStartDate,setTxnType,setStocks,setStatus,clearAllFilter,addTransaction} = portfolioSlice.actions;