import { useSelector } from "react-redux";
import Header from "../NavBar/Header";
import Subheading from "../NavBar/Subheading";
import StocksData from "../StocksData/StocksData";
import { RootState } from "../../redux/store/Store";
import Watchlist from "../Watchlist/Watchlist";

export default function Home() {
  const { isExplore } = useSelector((state: RootState) => state.stocks);

  return (
    <>
      <Header />
      <Subheading />
      {
        isExplore ? <StocksData /> : <Watchlist />
      }
    </>
  )
}
