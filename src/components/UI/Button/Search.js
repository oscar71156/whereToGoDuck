import classes from './Search.module.css';
import { Search } from "../../../assets/icons";
const SearchButton = ({onClick}) => {
  return (
    <button className={classes.search} onClick={onClick}>
      <span className={classes.text}>
        搜尋
      </span>
      <span className={classes.icon}><Search/></span>
    </button>
  );
};
export default SearchButton;
