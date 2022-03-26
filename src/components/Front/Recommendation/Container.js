import styles from "./Container.module.css";
import Content from "./Content";
import MoreButton from "../../UI/Button/More";
import county from "../../../assets/county";

import { useEffect, useState } from "react";

const Recommendation = () => {
  const [areaPatch, setAreaPatch] = useState(1);
  const [counties, setCounties] = useState([]);
  const [isShowMoreButton, setIsShowMoreButton] = useState(true);

  useEffect(() => {
    if (Number.isInteger(areaPatch)) {
      setCounties(county.slice(0, 4 * areaPatch));

      if (areaPatch * 4 > county.length) {
        setIsShowMoreButton(false);
      }
    }
  }, [areaPatch]);

  const _addPatch = () => {
    setAreaPatch((areaPatch) => areaPatch + 1);
  };

  return (
    <div className={styles.recommendation}>
      <h3>找幾個沒去過的</h3>
      <Content areaPatch={areaPatch} county={counties} />
      {isShowMoreButton && (
        <MoreButton
          onClick={() => {
            _addPatch();
          }}
        />
      )}
    </div>
  );
};
export default Recommendation;
