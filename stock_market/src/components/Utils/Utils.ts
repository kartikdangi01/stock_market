import { StockTransaction, TransactionsByDate } from "../../redux/slices/PortfolioSlice";
import { IStock } from "../../redux/slices/StocksSlice";
import { IHistory } from "../../redux/slices/UserSlice";
import { StockTransactionJSON } from "../../redux/thunk/PortfolioThunk";

export const sortFn = (a : IStock,b : IStock) : number => {
    return a.name < b.name ? -1 : 1;
}

export const sortFnByDate = (a : StockTransactionJSON,b : StockTransactionJSON) : number => {
    return new Date(a.timestamp) > new Date(b.timestamp) ? -1 : 1;
}

export const formatDate = (dateString : string) : string => {
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${day} ${months[monthIndex]} ${year}`;
};

export function formatTime(date : string) {
    const timeString = new Date(date).toISOString().split('T')[1].split('.')[0];
    const [hours, minutes] = timeString.split(':').map(Number);

    let formattedHours = hours % 12;
    formattedHours = formattedHours || 12; 

    const period = hours < 12 ? 'AM' : 'PM';

    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export const mapData = (responseData : StockTransactionJSON[]) => {
    let mappedData : TransactionsByDate = {};

    responseData.map((transaction : StockTransactionJSON) => {
        const date = new Date(transaction.timestamp);
        const dateString = date.toISOString().split('T')[0]; 
    
        if (!mappedData[dateString]) {
            mappedData[dateString] = [];
        }
    
        mappedData[dateString].push(transaction);
    })

    for (const date in mappedData) {
        mappedData[date].sort((a, b) => {
            const timeA = new Date(a.timestamp).getTime();
            const timeB = new Date(b.timestamp).getTime();
            return timeA - timeB;
        });
    }

    return mappedData;
}

export const findAllStocks = (transactions : TransactionsByDate) : string[] => {
    const stocks = new Set<string>();
    for(const date in transactions){
        const transactionsArr = transactions[date];
        for(const transaction of transactionsArr){
            stocks.add(transaction.stock_name);
        }
    }
    return Array.from(stocks);
}

export function convertToStockTransaction(history: IHistory, status: string): StockTransaction {
    const stockTransaction: StockTransaction = {
        stock_name: history.name,
        stock_symbol: history.name.substring(0, 3).toUpperCase(), 
        transaction_price: history.price * history.qty,
        timestamp: history.date,
        status: status === 'success' ? 'Success' : 'Failed' 
    };

    return stockTransaction;
}