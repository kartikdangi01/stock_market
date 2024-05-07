import { useDispatch } from "react-redux"
import { IStock, addToWatchlist } from "../../redux/slices/StocksSlice"
import { DispatchType } from "../../redux/store/Store"
import { useState } from "react";
import { Link } from "react-router-dom";

interface IStockInfo {
    stock: IStock
}

export default function Stock({ stock }: Readonly<IStockInfo>) {
    const dispatch = useDispatch<DispatchType>();
    const [hovered, setHovered] = useState(false);

    return (
        <div className="stocks-table-head stocks-table-data-info">
            <Link to={`/stock/${stock.name}`} className='company-head'>{stock.name}</Link>
            <div className="priceWatchlist">
                <p className='base-price'>₹ {stock.basePrice}</p>
                <p><button id="watchlist-btn" onClick={() => dispatch(addToWatchlist(stock))} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    {stock.isWatchlist ? (
                        hovered ? <i className="fi fi-rr-cross"></i> : <i className="fi fi-rr-check"></i>
                    ) : (
                        <i className="fi fi-rr-add"></i>
                    )}
                </button></p>
            </div>
        </div>
    )
}
