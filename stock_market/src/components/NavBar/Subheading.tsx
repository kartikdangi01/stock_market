import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store/Store";
import { setExplore } from "../../redux/slices/StocksSlice";

export default function Subheading() {

  const dispatch = useDispatch<DispatchType>();
  const { isExplore } = useSelector((state: RootState) => state.stocks);

  const openExplore = () => {
    dispatch(setExplore(true));
  }

  const openWatchList = () => {
    dispatch(setExplore(false));
  }

  return (
    <div className="subheading">
      <button className={`subheading-title ${isExplore ? 'showBottomBorder' : ''}`} onClick={openExplore}>Explore</button>
      <button className={`subheading-title ${isExplore ? '' : 'showBottomBorder'}`} onClick={openWatchList}>My WatchList</button>
    </div>
  )
}
