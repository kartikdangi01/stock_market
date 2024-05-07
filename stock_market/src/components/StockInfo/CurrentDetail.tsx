import { useDispatch, useSelector } from "react-redux"
import { DispatchType, RootState } from "../../redux/store/Store"
import { useEffect, useState } from "react";
import { updateStockAfterCalc } from "../../redux/slices/StocksSlice";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { purchaseStock, sellStock } from "../../redux/slices/UserSlice";
import { socket } from "./StockInfo";
import { showSnackbar } from "../../redux/slices/SnackbarSlice";
import { addTransaction } from "../../redux/slices/PortfolioSlice";
import { convertToStockTransaction } from "../Utils/Utils";
import Snackbar from "../Snackbar/Snackbar";

export default function CurrentDetail() {
    const { stockDetail, stocksData } = useSelector((state: RootState) => state.stocks);
    const {wallet, stocks} = useSelector((state : RootState) => state.user);
    const {open} = useSelector((state : RootState) => state.snackbar);

    const dispatch = useDispatch<DispatchType>();
    const navigate = useNavigate();
    const [qty,setQty] = useState<number>(0);

    useEffect(() => {
        if (stockDetail) {
            const intervalId = setInterval(() => {
                const randomValue = Math.floor(Math.random() * 501); 
                const change = (randomValue - stockDetail.oldPrice) / (stockDetail.oldPrice);
                const isPositive = randomValue >= stockDetail.oldPrice;
                dispatch(updateStockAfterCalc({ oldPrice: randomValue, newPrice: randomValue, change: change * 100, isPositive: isPositive }));
              },5000);

              return () => clearInterval(intervalId);
        }
    }, [stockDetail]);

    const handleStockChange = (e: SelectChangeEvent<string>) => {
        navigate(`/stock/${e.target.value}`);
    };

    const handleBuy = () => {
        if(stockDetail){
            if(qty * stockDetail.newPrice > wallet){
                dispatch(showSnackbar({type: 'fail', message: 'You dont have enough wallet balance! '}))
                dispatch(addTransaction(convertToStockTransaction({name: stockDetail.name,qty: qty,date: new Date(new Date().getTime() +  5.5 * 60 * 60 * 1000).toISOString(),buyOrSell: "Buy",price: stockDetail.newPrice},"fail")));
            }
            else{
                const txnDetail = {name: stockDetail.name, qty: qty, date: new Date(new Date().getTime() +  5.5 * 60 * 60 * 1000).toISOString(), buyOrSell: "Buy", price: stockDetail.newPrice};
                dispatch(purchaseStock(txnDetail));
                dispatch(showSnackbar({type: 'success', message: 'Stock purchased successfully!'}));
                dispatch(addTransaction(convertToStockTransaction({name: stockDetail.name,qty: qty,date: new Date(new Date().getTime() +  5.5 * 60 * 60 * 1000).toISOString(),buyOrSell: "Buy",price: stockDetail.newPrice},"success")));
                socket.emit("send data", txnDetail );
            }
        }
    }   

    const handleSell = () => {
        if(stockDetail){
            if(!stocks[stockDetail.name] || stocks[stockDetail.name] < qty){
                dispatch(showSnackbar({type: 'fail', message: 'You dont have enough stocks to sell!'}));
                dispatch(addTransaction(convertToStockTransaction({name: stockDetail.name,qty: qty,date: new Date(new Date().getTime() +  5.5 * 60 * 60 * 1000).toISOString(),buyOrSell: "Sell",price: stockDetail.newPrice},"fail")));
            }
            else{
                const txnDetail = {name: stockDetail.name, qty: qty, date: new Date(new Date().getTime() +  5.5 * 60 * 60 * 1000).toISOString(), buyOrSell: "Sell", price: stockDetail.newPrice};
                dispatch(sellStock(txnDetail));
                dispatch(showSnackbar({type: 'success', message: 'Stock sold successfully!'}));
                dispatch(addTransaction(convertToStockTransaction({name: stockDetail.name,qty: qty,date: new Date(new Date().getTime() +  5.5 * 60 * 60 * 1000).toISOString(),buyOrSell: "Sell",price: stockDetail.newPrice},"success")));
                socket.emit("send data", txnDetail);
            }
        }
    }   

    return (
        <>
        {open === true ? <Snackbar/> : ''}
            {stockDetail && (
                <div className="stock-info">
                    <div className="stock-name">
                        <Select
                            labelId="stock-select-label"
                            id="stock-select"
                            value={stockDetail.name}
                            onChange={handleStockChange}
                            displayEmpty
                        >
                            {stocksData.map((stock, index) => (
                                <MenuItem key={index} value={stock.name}>
                                    <span className="stock-symbol">{stock.symbol}</span> {stock.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="stock-price">
                        <p id="price-tag">Price</p>
                        <p className={stockDetail.isPositive ? "up" : "down"}>{stockDetail.newPrice}</p>
                        {
                            stockDetail.isPositive ? <p className="up" >&#8593;</p> : <p className="down">&#8595;</p>
                        }
                        <p id="percentChange">{stockDetail.change.toFixed(2)}%</p>
                    </div>
                    <div className="stock-qty">
                        <input type="number" id="qty-input" name="qty-input" placeholder="Enter Qty" onChange={(e) => setQty(parseInt(e.target.value))} />
                    </div>
                    <div className="buy">
                        <button id="buy-btn" onClick={handleBuy}>Buy</button>
                    </div>
                    <div className="sell">
                        <button id="sell-btn" onClick={handleSell}>Sell</button>
                    </div>
                </div>
            )}
        </>
    );
}

