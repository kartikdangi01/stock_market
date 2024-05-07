import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DispatchType, RootState } from "../../redux/store/Store";
import CurrentDetail from "./CurrentDetail";
import StockGraph from "./StockGraph";
import './StockInfo.scss';
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { addStockDetail } from "../../redux/slices/StocksSlice";
import History from "./History";
import Header from "../NavBar/Header";
import io from 'socket.io-client';

export const socket = io('http://localhost:3000'); 

export default function StockInfo() {
  const { stockname } = useParams();
  const { stocksData, stockDetail } = useSelector((state: RootState) => state.stocks);
  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    const tempData = stocksData.find((stock) => stock.name === stockname);
    if (tempData != null) {
      dispatch(addStockDetail(tempData));
    }
  }, [stocksData,stockname]);

  useEffect(() => {
    socket.emit("join-room", stockname);
  },[stockname])

  return (
    <>
      <Header />
      <div id="main">
        {stockDetail ?
          <>
            <div className="info">
              <CurrentDetail />
              <StockGraph />
            </div>
            <div className="history">
              <History />
            </div>
          </> : <Loader />
        }
      </div>
    </>
  )
}
