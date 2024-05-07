import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/Store";
import { formatDate, formatTime } from "../Utils/Utils";
import Loader from "../Loader/Loader";
import { TransactionsByDate } from "../../redux/slices/PortfolioSlice";

export default function FilterData() {

    const { initialTxns, status, search,startDate, endDate, txnType, selectedStocks } = useSelector((state: RootState) => state.portfolio);

    let filteredTxns : TransactionsByDate = {};
    if(search.length !== 0 || startDate.length !== 0 || endDate.length !==0 || txnType.length!==0 || selectedStocks.length!==0){
        Object.keys(initialTxns).forEach(date => {
            const filteredTxn = initialTxns[date].filter(txn =>
                txn.stock_name.toLowerCase().includes(search) &&
                (startDate.length === 0 || new Date(date) >= new Date(startDate)) &&
                (endDate.length === 0 || new Date(`${date}T00:00:00.000`) <= new Date(endDate)) &&
                (txnType.length === 0 || txnType.includes(txn.status)) &&
                (selectedStocks.length === 0 || selectedStocks.includes(txn.stock_name))
            );
    
            if (filteredTxn.length > 0) {
                if(!filteredTxns[date]){
                    filteredTxns[date] = [];
                }
                filteredTxns[date] = filteredTxn;
            }
        });
    }
    else{
        filteredTxns = initialTxns;
    }

    return (
        <div className="filter-data">
            {status == "loading" ? <Loader/> : ''}
            {
                Object.entries(filteredTxns).map(([date, transactions]) => (
                    <div key={date} className="filter-data-collection">
                        <h2 className="filter-data-date">{formatDate(date)}</h2>
                        <ul className="filter-data-info">
                            {transactions.map((transaction, index) => (
                                <div key={index} className="filter-data-info-each">
                                    <p className="filter-data-info-name">{transaction.stock_name}</p>
                                    <p className="filter-data-info-other">{transaction.stock_symbol}</p>
                                    <p className="filter-data-info-other">₹ {transaction.transaction_price}</p>
                                    <p className="filter-data-info-other">{formatTime(transaction.timestamp)}</p>
                                    <p className="filter-data-info-status">{transaction.status === "Failed" ? <p className="red-dot"></p> : <p className="green-dot"></p>}</p>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}
