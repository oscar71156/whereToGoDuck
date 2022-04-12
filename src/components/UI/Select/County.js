import classes from "./County.module.css";
import county from "../../../assets/data/county";

const CountySelect = ({ selectedCounty, onSelected }) => {
  const _handleSelect = (e) => {
    onSelected(e.target.value);
  };
  return (
    <select
      className={classes.countySelect}
      value={selectedCounty}
      onChange={_handleSelect}
    >
      <option value="" disabled>
        請選擇縣市
      </option>
      {county.map(({ name, nameTW }) => (
        <option key={name} value={name}>
          {nameTW}
        </option>
      ))}
    </select>
  );
};

export default CountySelect;
