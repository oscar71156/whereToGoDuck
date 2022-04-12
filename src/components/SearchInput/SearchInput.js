import SearchButton from "../UI/Button/Search";
import CountySelect from "../UI/Select/County";
import { useSelector, useDispatch } from "react-redux";
import { changeInputCounty } from "../../store/actions/selectedCounty";
import { useHistory, useParams } from "react-router-dom";

const SearchInput = ({ classes }) => {
  const selectedCounty = useSelector((state) => state.selectedCounty);
  const dispatch = useDispatch();
  const history = useHistory();
  const urlPathname = history.location.pathname;
  const { county: countyParam } = useParams();
  const handleSearch = (e) => {
    e.preventDefault();
    const updatedURL = countyParam
      ? urlPathname.replace(countyParam, selectedCounty)
      : `/${selectedCounty}`;
    history.push(updatedURL);
  };
  const setNewCounty = (value) => {
    dispatch(changeInputCounty(value));
  };
  return (
    <form onSubmit={handleSearch} className={classes.searchInput}>
      <div className={classes.select}>
        <CountySelect
          selectedCounty={selectedCounty}
          onSelected={setNewCounty}
        />
      </div>
      <div className={classes.button}>
        <SearchButton onClick={handleSearch} />
      </div>
    </form>
  );
};

export default SearchInput;
