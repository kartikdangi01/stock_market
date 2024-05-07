import Header from "../NavBar/Header";
import Filter from "./Filter";
import FilterData from "./FilterData";
import './Portfolio.scss'

export default function Portfolio() {

  return (
    <div className="portfolio">
        <Header/>
        <div className="filter-body">
            <Filter/>
            <FilterData/>
        </div>
    </div>
  )
}
