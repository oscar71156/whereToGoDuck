import classes from "./Navigation.module.css";
import searchInputClasses from "./SearchInput.module.css";
import { WhereDuck, HereDuck } from "../../assets/icons";
import SearchInput from "../SearchInput/SearchInput";
const Navigation = () => {

  return (
    <div className={classes.navigation}>
      <div className={classes.searchGroup}>
        <p className={classes.description}>368區域鄉鎮市區 總有一個你的菜</p>
        <h3>這次想去哪裡鴨?</h3>
        <SearchInput classes={searchInputClasses}/>
      </div>
      <span className={classes.hereDuck}>
        <HereDuck/>
      </span>
      <span  className={classes.whereDuck}>
        <WhereDuck/>
      </span>
    </div>
  );
};
export default Navigation;
