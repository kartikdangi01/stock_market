import { createSlice } from "@reduxjs/toolkit";

export interface IHistory{
    name: string,
    qty: number,
    date: string,
    buyOrSell: string,
    price: number
}

interface StocksObj {
    [key: string]: number;
}

export interface IUser{
    history: IHistory[];
    wallet: number;
    stocks: StocksObj
}

const initialState : IUser = {
    history: [],
    wallet: 10000,
    stocks: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        purchaseStock: (state,action) => {
            state.history.push(action.payload);
            state.wallet -= action.payload.price * action.payload.qty;
            if(!state.stocks[action.payload.name])
                state.stocks[action.payload.name] = 0;
            state.stocks[action.payload.name] += action.payload.qty;
        },
        sellStock: (state,action) => {
            state.history.push(action.payload);
            state.wallet += action.payload.price * action.payload.qty;
            state.stocks[action.payload.name] -= action.payload.qty;
        }
    }
})

export default userSlice.reducer;
export const {purchaseStock,sellStock} = userSlice.actions;