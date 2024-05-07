import { useSelector } from "react-redux"
import { RootState } from "../../redux/store/Store"
import { formatDate, formatTime } from "../Utils/Utils";
import { useEffect, useState } from "react";
import {socket} from "./StockInfo";
import { IHistory } from "../../redux/slices/UserSlice";


export default function History() {
    const { history } = useSelector((state: RootState) => state.user);
    const {stockDetail} = useSelector((state : RootState) => state.stocks);
    const [globalHis, setGlobalHis] = useState<IHistory[]>([]);

    useEffect(() => {

        socket.emit('fetch-history', stockDetail?.name);
        socket.on('init', (oldHistory) => {
            setGlobalHis(oldHistory);
        })
        socket.on("update", (data) => {
            setGlobalHis(globalHis => [...globalHis,data]);
        })

        return () => {
            socket.off('init');
            socket.off('update');
        }
    },[socket,stockDetail])

    return (
        <>
            <div className="history-own">
                <p id="history-tag">History</p>
                {
                    history.map((txn) => {
                        return <div className="history-div" key={txn.date}>
                            <div className="history-price-qty-date">
                                <p className="history-price-qty">{txn.qty} stocks (Price : {txn.price})</p>
                                <p className="history-date">{formatDate(txn.date)} {formatTime(txn.date)}</p>
                            </div>
                            <div className={txn.buyOrSell === 'Buy' ? 'history-buy-txn' : 'history-sell-txn'}>
                                {txn.buyOrSell === 'Buy' ? 'Buy' : 'Sell'}
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="history-global">
                {
                    globalHis.map((his) => {
                        return <p style={{fontSize: 'large'}}>Someone {his.buyOrSell == "Buy" ? "bought" : "sold"} {his.qty} stocks</p>
                    })
                }
            </div>
        </>
    )
}
