import { useEffect, useContext, useState } from "react";
import classes from "./CountyAttraction.module.css";
import NearbyButton from "../UI/Button/NearbyButton";
import Nearby from "../Nearby/Nearby";

import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";

import ScenicSpot from "./ScenicSpot";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeCountyAttractionFrom, fecthAttractionsByIdAndCounty } from "../../store/actions/countyAttractions";
import {
  clearCenterAttraction,
  setCenterAttraction,
} from "../../store/actions/nearbyAttractions";
import NearbyModalContext from "../../contexts/NearbyModalContext";

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

  const isLoadingData=useSelector(
    (state) => state.countyAttractions.isLoading
  );

  const fetchingDataError=useSelector(
    (state) => state.countyAttractions.error
  );
  const { toggle: toggleNearbySpot } = useContext(NearbySpotModalContext);

  const {isShow:isShowNearby, toggle:toggleNearbyModal}=useContext(NearbyModalContext);
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
      setAttraction(foundAttraction)
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
    isNotFoundAttraction
  ]);


  useEffect(() => {
    if (!nearbyCenterAttraction) {
      document.title = `要去哪裡鴨${
        attraction ? "-" + attraction.ScenicSpotName : ""
      }`;
    }
  }, [attraction, nearbyCenterAttraction]);




  ///=>:county/:attraction/nearby/:nearbyType",
  //=>/:county/:attraction/nearby/:nearbyType/:nearbySpot"
  //這兩個url都會使用到centerAttraction
  useEffect(() => {
    if (nearbyType&&attraction) {
      dispatch(setCenterAttraction(attraction));
    }
  }, [nearbyType, attraction]);

  ///modal control
  useEffect(()=>{
    if (nearbyType==='restaurant'|| nearbyType==='hotel'||(nearbyType==='scenicSpot'&&!nearbySpotId)) {
      ///當中心點資料有時，才可以展開modal
      if(nearbyCenterAttraction){
        toggleNearbyModal(true);
      }
    } else {
      toggleNearbyModal(false);
    }
  },[nearbyType,nearbySpotId,nearbyCenterAttraction])

  useEffect(() => {
    if (!nearbySpotId) {
      toggleNearbySpot(false);
    } else {
      toggleNearbySpot(true);
    }
  }, [nearbySpotId]);

  if(fetchingDataError){
    return(<div>
      {fetchingDataError}
    </div>)
  }


  if(isNotFoundAttraction&&!attraction){
    return(<div>can't find</div>)
  }

  if(isLoadingData||!attraction){
    return(<div>仔入中</div>)
  }




  return (
    <div className={classes.countyAttraction}>
      <ScenicSpot attraction={attraction} />
      <div className={classes.nearbyButton}>
        <NearbyButton attraction={attraction} />
      </div>
      {isShowNearby && (
        <Nearby
          centeredAttraction={attraction}
          close={() => toggleNearbyModal(false)}
        />
      )}
    </div>
  );
};

export default CountyScenicSpot;
