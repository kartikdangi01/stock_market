import { createSlice } from "@reduxjs/toolkit";
import { fetchStocks } from "../thunk/StocksDataThunk";
import { sortFn } from "../../components/Utils/Utils";

export interface IStock{
    name: string;
    symbol: string;
    basePrice: number;
    isWatchlist: boolean
}

export interface IStockDetail{
    name: string;
    oldPrice: number;
    newPrice: number;
    change: number;
    isPositive: boolean;
}

export interface IStockState{
    stocksData: IStock[];
    status: "pending" | "loading" | "success" | "fail";
    error: string | undefined;
    isExplore: boolean;
    stockDetail: IStockDetail | undefined;
}

const initialState : IStockState = {
    stocksData: [],
    status: "pending",
    error: '',
    isExplore: true,
    stockDetail: undefined,
}

const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        addToWatchlist: (state, action) => {
            const stockIndex = state.stocksData.findIndex(stock => stock.name === action.payload.name);
            state.stocksData[stockIndex].isWatchlist = !state.stocksData[stockIndex].isWatchlist;
        },

        setExplore: (state, action) => {
            state.isExplore = action.payload;
        },

        addStockDetail: (state,action) => {
            state.stockDetail = {
                name: action.payload.name,
                oldPrice: action.payload.basePrice,
                newPrice: action.payload.basePrice,
                change: 0.00,
                isPositive: true
            };
        },
        updateStockPrice: (state,action) => {
            if (state.stockDetail) {
                state.stockDetail.newPrice = action.payload;
            }
        },
        updateStockAfterCalc: (state,action) => {
            if (state.stockDetail){
                state.stockDetail.oldPrice = action.payload.oldPrice;
                state.stockDetail.change = action.payload.change;
                state.stockDetail.isPositive = action.payload.isPositive;
                state.stockDetail.newPrice = action.payload.newPrice;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchStocks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStocks.fulfilled, (state, action) => {
                state.status = "success";
                const stocks = action.payload;
                stocks.sort(sortFn);
                state.stocksData = stocks;
            })
            .addCase(fetchStocks.rejected, (state, action) => {
                state.status = "fail";
                state.error = action.error.message;
            });
    },

})

export default stocksSlice.reducer;
export const {addToWatchlist,setExplore,addStockDetail,updateStockPrice,updateStockAfterCalc} = stocksSlice.actions;
