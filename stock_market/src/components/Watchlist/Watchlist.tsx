import { useSelector } from "react-redux"
import { RootState } from "../../redux/store/Store"
import Stock from "../StocksData/Stock";
import './watchlist.scss'
import { Pagination, PaginationItem } from "@mui/material";
import { useState } from "react";
import { sortFn } from "../Utils/Utils";

export default function Watchlist() {

    const { stocksData } = useSelector((state: RootState) => state.stocks);

    const watchlist = stocksData.filter((stock) => stock.isWatchlist === true);
    watchlist.sort(sortFn);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const indexOfLastStock = currentPage * rowsPerPage;
    const indexOfFirstStock = indexOfLastStock - rowsPerPage;
    const currentWatchlist = watchlist.slice(indexOfFirstStock, indexOfLastStock);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        currentWatchlist.length === 0 ? <h2 className="error-watchlist">No Watchlisted stocks!</h2> :
            <div className="stocks-data">
                <div className="stocks-table-head stocks-table-heading">
                    <p className='company-head'>Company</p>
                    <div className="priceWatchlist">
                        <p className='base-price'>Base Price</p>
                        <p>Watchlist</p>
                    </div>
                </div>
                <div className="watchlist">
                    {
                        currentWatchlist.map((stock) => {
                            return <Stock key={stock.name} stock={stock} />
                        })
                    }
                </div>
                {
                    currentWatchlist.length !== 0 ? <Pagination
                        count={Math.ceil(watchlist.length / rowsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        shape="rounded"
                        className='pagination'
                        color='primary'
                        size='large'
                        renderItem={(item) => {
                            const maxPage = Math.ceil(watchlist.length / rowsPerPage);
                            return (
                                <PaginationItem
                                    {...item}
                                    disabled={item.page === null || item.page > maxPage}
                                />
                            );
                        }}
                    /> : ''
                }
            </div>
    )
}
