import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from '../slices/StocksSlice'
import portfolioReducer from '../slices/PortfolioSlice'
import userReducer from '../slices/UserSlice'
import SnackbarReducer from '../slices/SnackbarSlice'

const store = configureStore({
    reducer:{
        stocks: stocksReducer,
        portfolio: portfolioReducer,
        user: userReducer,
        snackbar: SnackbarReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch