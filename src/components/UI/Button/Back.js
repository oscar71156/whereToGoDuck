import { Backspace } from "../../../assets/icons";
import classes from "./Back.module.css";
const BackButton = ({onClick}) => {
  return (
    <button className={classes.back} onClick={onClick}>
      <Backspace />
    </button>
  );
};

export default BackButton;
