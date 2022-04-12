import styles from "./Area.module.css";
import { useHistory } from "react-router-dom";
import useImage from "../../../hooks/useImage";

const Area = ({ imgAlt, caption, name }) => {
  const history = useHistory();
  const _handleClickNavigate = () => {
    history.push("/" + name);
  };

  const image = useImage(name);
  return (
    <figure className={styles.area} onClick={_handleClickNavigate}>
      <img src={image} alt={imgAlt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default Area;
