import classes from "./Recommendation.module.css";
import Content from "./Content";
import MoreButton from "../../UI/Button/More";
import county from "../../../assets/county";

import { useEffect, useLayoutEffect, useState } from "react";

const Recommendation = () => {
  const [areaPatch, setAreaPatch] = useState(1);
  const [areaPatchNumber, setAreaPatchNumber] = useState(4);
  const [counties, setCounties] = useState([]);
  const [isShowMoreButton, setIsShowMoreButton] = useState(true);

  const _mapCurrentWidthToPatchNumber = (width, height) => {
    if (height > 1200) {
      //for ipad pro
      setAreaPatchNumber(20);
    } else if (width > 900) {
      setAreaPatchNumber(10);
    } else if (width > 600) {
      setAreaPatchNumber(8);
    } else {
      setAreaPatchNumber(4);
    }
  };
  useLayoutEffect(() => {
    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight;
    _mapCurrentWidthToPatchNumber(deviceWidth, deviceHeight);
  }, []);

  useEffect(() => {
    const _onDeviceWidthChange = (e) => {
      const deviceWidth = e.target.innerWidth;
      _mapCurrentWidthToPatchNumber(deviceWidth);
    };
    window.addEventListener("resize", _onDeviceWidthChange);
    return () => {
      window.removeEventListener("resize", _onDeviceWidthChange);
    };
  }, []);

  useEffect(() => {
    if (Number.isInteger(areaPatch)) {
      setCounties(county.slice(0, areaPatchNumber * areaPatch));
      if (areaPatch * areaPatchNumber > county.length) {
        setIsShowMoreButton(false);
      }
    }
  }, [areaPatch, areaPatchNumber]);

  const _addPatch = () => {
    setAreaPatch((areaPatch) => areaPatch + 1);
  };

  return (
    <div className={classes.recommendation}>
      <h3>找幾個沒去過的</h3>
      <Content county={counties} />
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
