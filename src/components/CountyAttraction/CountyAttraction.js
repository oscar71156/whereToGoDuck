import { useEffect, useContext, useState } from "react";
import classes from "./CountyAttraction.module.css";
import NearbyButton from "../UI/Button/Nearby";
import Nearby from "../Nearby/Nearby";

import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";

import ScenicSpot from "./ScenicSpot";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fecthAttractionsByIdAndCounty } from "../../store/actions/countyAttractions";
import { clearCenterAttraction } from "../../store/actions/nearbyAttractions";
import { setCenterAttraction } from "../../store/slice/nearbyAttractions";
import NearbyModalContext from "../../contexts/NearbyModalContext";
import NotFound from "../NotFound";

const CountyScenicSpot = () => {
  const [attraction, setAttraction] = useState(null);
  const {
    attraction: attractionId,
    county: selectedCounty,
    nearbyType,
    nearbySpot: nearbySpotId,
  } = useParams();

  const nearbyCenterAttraction = useSelector(
    (state) => state.nearbyAttractions.centerAttraction
  );

  const nearbyAttractions = useSelector(
    (state) => state.nearbyAttractions.data
  );

  const isAttractionFromNearby = useSelector(
    (state) => state.countyAttractions.isCountyAttractionFromNearby
  );

  const isLoadingData = useSelector(
    (state) => state.countyAttractions.isLoading
  );

  const fetchingDataError = useSelector(
    (state) => state.countyAttractions.error
  );
  const { toggle: toggleNearbySpot } = useContext(NearbySpotModalContext);

  const { isShow: isShowNearby, toggle: toggleNearbyModal } =
    useContext(NearbyModalContext);

  const dispatch = useDispatch();

  const isNotFoundAttraction = useSelector(
    (state) => state.countyAttractions.isFetchAll
  );

  const countyAttractions = useSelector(
    (state) => state.countyAttractions.data
  );

  useEffect(() => {
    let foundAttraction = null;
    if (isAttractionFromNearby) {
      if (nearbyAttractions) {
        foundAttraction = nearbyAttractions.find(
          ({ ScenicSpotID }) => ScenicSpotID === attractionId
        );
      }
    } else {
      if (countyAttractions) {
        foundAttraction = countyAttractions.find(
          ({ ScenicSpotID }) => ScenicSpotID === attractionId
        );
      }
    }

    if (foundAttraction) {
      setAttraction(foundAttraction);
    } else {
      if (!isNotFoundAttraction) {
        dispatch(fecthAttractionsByIdAndCounty(selectedCounty, attractionId));
      }
    }
  }, [
    countyAttractions,
    attractionId,
    isAttractionFromNearby,
    nearbyAttractions,
    selectedCounty,
    isNotFoundAttraction,
  ]);

  useEffect(() => {
    if (!nearbyCenterAttraction) {
      document.title = `???????????????${
        attraction ? "-" + attraction.ScenicSpotName : ""
      }`;
    }
  }, [attraction, nearbyCenterAttraction]);

  ///=>:county/:attraction/nearby/:nearbyType",
  //=>/:county/:attraction/nearby/:nearbyType/:nearbySpot"
  //?????????url???????????????centerAttraction
  useEffect(() => {
    if (nearbyType && attraction) {
      dispatch(setCenterAttraction(attraction));
    } else if (!nearbyType) {
      dispatch(clearCenterAttraction(null));
    }
  }, [nearbyType, attraction]);

  ///modal control
  useEffect(() => {
    if (
      nearbyType === "restaurant" ||
      nearbyType === "hotel" ||
      (nearbyType === "scenicSpot" && !nearbySpotId)
    ) {
      ///??????????????????????????????????????????modal?????????modal???????????????????????????????????????
      if (nearbyCenterAttraction) {
        toggleNearbyModal(true);
      }
    } else {
      toggleNearbyModal(false);
    }
  }, [nearbyType, nearbySpotId, nearbyCenterAttraction]);

  useEffect(() => {
    if (!nearbySpotId) {
      toggleNearbySpot(false);
    } else {
      toggleNearbySpot(true);
    }
  }, [nearbySpotId]);

  const _renderContent = () => {
    if (fetchingDataError) {
      return (
        <p className={classes.error}>
          ?????????????????????????????????????????????????????????????????????
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
          <p>?????????...</p>
          <p>?????????...</p>
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
