import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useContext } from "react";
import { getTWName as getCountyTWName } from "../../assets/data/county";
import { fecthDisplayedAttractionById } from "../../store/actions/displayedAttraction";

import NearbyModalContext from "../../contexts/NearbyModalContext";

import classes from "./CountyAttraction.module.css";
import NearbyButton from "../UI/Button/Nearby";
import Nearby from "../Nearby/Nearby";
import NotFound from "../NotFound";
import ScenicSpot from "./ScenicSpot";

const CountyScenicSpot = () => {
  const {
    attraction: attractionId,
    county: selectedCounty,
    nearbyType,
    nearbySpot: nearbySpotId,
  } = useParams();

  const nearbyCenterAttraction = useSelector(
    (state) => state.displayedAttraction.data
  );

  const attraction = useSelector((state) => state.displayedAttraction.data);

  const isLoadingData = useSelector(
    (state) => state.displayedAttraction.isLoading
  );

  const fetchingDataError = useSelector(
    (state) => state.displayedAttraction.error
  );

  const { isShow: isShowNearby, toggle: toggleNearbyModal } =
    useContext(NearbyModalContext);

  const dispatch = useDispatch();

  const isNotFoundAttraction = useSelector(
    (state) => state.displayedAttraction.isFetchAll
  );

  useEffect(() => {
    if (attractionId && selectedCounty) {
      dispatch(
        fecthDisplayedAttractionById({ attractionId, county: selectedCounty })
      );
    }
  }, [attractionId, selectedCounty]);

  useEffect(() => {
    if (attraction && selectedCounty) {
      document.title = `要去哪裡鴨${
        attraction
          ? "-" +
            getCountyTWName(selectedCounty) +
            "の" +
            attraction.name
          : ""
      }`;
    }
  }, [attraction, selectedCounty]);

  ///modal control
  useEffect(() => {
    if (
      nearbyType === "restaurant" ||
      nearbyType === "hotel" ||
      (nearbyType === "scenicSpot" && !nearbySpotId)
    ) {
      ///當中心點資料有時，才可以展開modal，因為modal內的資料有需要有中心點資料
      if (nearbyCenterAttraction) {
        toggleNearbyModal(true);
      }
    } else {
      toggleNearbyModal(false);
    }
  }, [nearbyType, nearbySpotId, nearbyCenterAttraction]);

  const _renderContent = () => {
    if (fetchingDataError) {
      return (
        <p className={classes.error}>
          內部發生錯誤，稍待片刻再重新整理或洽詢管理員。
        </p>
      );
    }

    if (isNotFoundAttraction && !attraction) {
      return (
        <div className={classes.notFound}>
          <NotFound />
        </div>
      );
    }

    if (isLoadingData || !attraction) {
      return (
        <div className={classes.isLoading}>
          <p>載入中...</p>
          <p>請稍候...</p>
        </div>
      );
    }
    return (
      <>
        <ScenicSpot attraction={attraction} />
        <div className={classes.nearbyButton}>
          <NearbyButton attraction={attraction} />
        </div>
        {isShowNearby && <Nearby />}
      </>
    );
  };

  return <div className={classes.countyAttraction}>{_renderContent()}</div>;
};

export default CountyScenicSpot;
