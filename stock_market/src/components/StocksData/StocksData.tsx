import { useState } from 'react'
import './StocksData.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/Store'
import Stock from './Stock';
import { Pagination } from '@mui/material';
import Loader from '../Loader/Loader';

export default function StocksData() {

    const { stocksData, status } = useSelector((state: RootState) => state.stocks);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const indexOfLastStock = currentPage * rowsPerPage;
    const indexOfFirstStock = indexOfLastStock - rowsPerPage;
    const currentStocks = stocksData.slice(indexOfFirstStock, indexOfLastStock);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="stocks-data">
            <div className="stocks-table-head stock-table-heading">
                <p className='company-head'>Company</p>
                <div className="priceWatchlist">
                    <p className='base-price' style={{paddingLeft: '7%'}}>Base Price</p>
                    <p>Watchlist</p>
                </div>
            </div>
            <div className="data-stocks">
                {
                    status === "success" ? currentStocks.map((stock) => {
                        return <Stock key={stock.name} stock={stock} />
                    }) : status === "fail" ? <h2 className="error-api">Error fetching data from API</h2> : <Loader />
                }
            </div>
            {
                status === "success" ? <Pagination
                    count={Math.ceil(stocksData.length / rowsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    className='pagination'
                    color='primary'
                    size='large'
                /> : ''
            }
        </div>
    )
}
