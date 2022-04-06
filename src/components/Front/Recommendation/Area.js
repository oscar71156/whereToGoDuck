import styles from "./Area.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Area = ({ imgSrc, imgAlt, caption, name }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const _handleClickNavigate = () => {
    history.push("/" + name);
  };

  return (
    <figure className={styles.area} onClick={_handleClickNavigate}>
      <img src={imgSrc} alt={imgAlt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default Area;
