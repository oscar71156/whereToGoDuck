import classes from "./CountyAttractions.module.css";
import searchInputClasses from "./SearchInput.module.css";
import SearchInput from "../SearchInput/SearchInput";
import CountyAttractionList from "./AttractionList";
import { getTWName } from "../../assets/data/county";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAttractions as fetchCountyAttractions } from "../../store/actions/countyAttractions";
import { resetCountyStatus } from "../../store/slice/countyAttractions";
import { changeInputCounty } from "../../store/slice/selectedCounty";
import { useParams } from "react-router-dom";

const CountyAttractions = () => {
  const countyAttractions = useSelector(
    (state) => state.countyAttractions.data
  );
  const isFetchALLAttractions = useSelector(
    (state) => state.countyAttractions.isFetchAll
  );
  const { county: countyParam } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const countyName = getTWName(countyParam);
    document.title = `要去哪裡鴨-${countyName}`;
  }, [countyParam]);

  useEffect(() => {
    dispatch(changeInputCounty(countyParam));
  }, [countyParam]);

  useEffect(() => {
    if (!isFetchALLAttractions) {
      dispatch(resetCountyStatus());
      dispatch(fetchCountyAttractions(countyParam));
    }
  }, [countyParam, isFetchALLAttractions]);

  return (
    <div className={classes.countyAttractions}>
      <div className={classes.countyAttractionsContent}>
        <SearchInput classes={searchInputClasses} />
        <CountyAttractionList data={countyAttractions} />
      </div>
    </div>
  );
};

export default CountyAttractions;
