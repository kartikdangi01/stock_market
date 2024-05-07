import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import StockInfo from './components/StockInfo/StockInfo'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DispatchType } from './redux/store/Store';
import { fetchStocks } from './redux/thunk/StocksDataThunk';
import Portfolio from './components/Portfolio/Portfolio';
import { fetchPortfoliosTxns } from './redux/thunk/PortfolioThunk';

function App() {

  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchPortfoliosTxns());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/stock/:stockname" element={<StockInfo />} />
        <Route path='/my-portfolio' element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
