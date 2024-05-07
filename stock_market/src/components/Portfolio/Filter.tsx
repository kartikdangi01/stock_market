import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store/Store";
import { clearAllFilter, setEndDate, setSearch, setSelectedStocks, setStartDate, setStocks, setTxnType } from "../../redux/slices/PortfolioSlice";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Loader from "../Loader/Loader";

export default function Filter() {
    const { startDate, endDate, txnType, initialTxns, stocks, selectedStocks, status } = useSelector((state: RootState) => state.portfolio);
    const dispatch = useDispatch<DispatchType>();

    useEffect(() => {
        dispatch(setStocks(initialTxns));
    }, [initialTxns])
    return (
        <div className="filter-section">
            <div className="filter-section-head">
                <p className="filter-section-head-filter">Filters</p>
                <button className="clear-btn" onClick={() => dispatch(clearAllFilter())}>Clear All</button>
            </div>
            <div className="filter-section-search">
                <input type="search" placeholder="Search for a stock" onChange={(e) => dispatch(setSearch(e.target.value))} />
            </div>
            <div className="filter-section-date">
                <DatePicker selected={startDate.length!== 0 ? new Date(startDate) : null} onChange={(date) => dispatch(setStartDate(date))} className="custom-date-picker" placeholderText="Enter Start Date" maxDate={new Date()}/>
                <p>to</p>
                <DatePicker selected={endDate.length!==0 ? new Date(endDate) : null} onChange={(date) => dispatch(setEndDate(date))} className="custom-date-picker" placeholderText="Enter End Date" maxDate={new Date()}/>
            </div>
            <div className="filter-section-check">
                <FormControlLabel
                    control={<Checkbox checked={txnType.includes("Passed")} onChange={() => dispatch(setTxnType("Passed"))} />}
                    label="Passed" className="filter-section-check-form"
                />
                <FormControlLabel
                    control={<Checkbox checked={txnType.includes("Failed")} onChange={() => dispatch(setTxnType("Failed"))} />}
                    label="Failed" className="filter-section-check-form"
                />
            </div>
            {status == "loading" ? <Loader/> : ''}
            <div className="filter-section-stocks">
                {
                    stocks.map((stock) => {
                        return <FormControlLabel
                            control={<Checkbox checked={selectedStocks.includes(stock)} onChange={() => dispatch(setSelectedStocks(stock))} />}
                            label={stock} key={stock} className="filter-section-check-form"
                        />
                    })
                }
            </div>
        </div>
    )
}
