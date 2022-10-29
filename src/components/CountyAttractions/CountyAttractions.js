import classes from "./CountyAttractions.module.css";
import searchInputClasses from "./SearchInput.module.css";
import SearchInput from "../SearchInput/SearchInput";
import CountyAttractionList from "./AttractionList";
import { getTWName } from "../../assets/data/county";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAttractions as fetchCountyAttractions } from "../../store/actions/countyAttractions";
import { changeInputCounty } from "../../store/slice/selectedCounty";
import { useParams } from "react-router-dom";

const CountyAttractions = () => {

  const { county: countyParam } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const countyName = getTWName(countyParam);
    document.title = `要去哪裡鴨-${countyName}`;
  }, [countyParam]);

  /***
   * For input county directly in URL
   */
  useEffect(() => {
    dispatch(changeInputCounty(countyParam));
  }, [countyParam]);

  useEffect(() => {
      dispatch(fetchCountyAttractions({county:countyParam,isNewCounty:true}));
  }, [countyParam]);

  return (
    <div className={classes.countyAttractions}>
      <div className={classes.countyAttractionsContent}>
        <SearchInput classes={searchInputClasses} />
        <CountyAttractionList/>
      </div>
    </div>
  );
};

export default CountyAttractions;
