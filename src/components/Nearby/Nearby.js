import React, { useEffect, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Nearby.module.css";

import Modal from "../UI/Modal/Modal";
import ButtonOptions from "./ButtonOptions";
import NearbyList from "./NearbyList";
import NearbySpotModal from "../NearbySpot/NearbySpot";

import { changeCountyAttractionFrom } from "../../store/actions/countyAttractions";
import {
  fetchAttractions as fetchNearbyAttractions,
  restNearbyFetchingStatus,
} from "../../store/actions/nearbyAttractions";

import NearbyModalContext from "../../contexts/NearbyModalContext";
import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";

const Nearby = () => {
  const dispatch = useDispatch();
  const { isShow: isShowNearbySpot } = useContext(NearbySpotModalContext);
  const { toggle: toggleNearby } = useContext(NearbyModalContext);
  const centerAttractionNearby = useSelector(
    (state) => state.nearbyAttractions.centerAttraction
  );
  const isAttractionFromNearby = useSelector(
    (state) => state.countyAttractions.isCountyAttractionFromNearby
  );
  const history = useHistory();
  const { pathname } = useLocation();
  const { nearbyType, nearbySpot } = useParams();

  const handleCloseClick = () => {
    history.push(pathname.replace(`/nearby/${nearbyType}`, ""));
    toggleNearby(false);
  };

  useEffect(() => {
    if (centerAttractionNearby) {
      let nearbyTypeTW = "觀光景點";
      switch (nearbyType) {
        case "restaurant":
          nearbyTypeTW = "餐飲";
          break;
        case "hotel":
          nearbyTypeTW = "旅宿";
          break;
        case "scenicSpot":
        default:
          nearbyTypeTW = "觀光景點";
          break;
      }
      document.title = `要去哪裡鴨${
        centerAttractionNearby?.ScenicSpotName
          ? "-" +
            centerAttractionNearby.ScenicSpotName +
            "的附近" +
            nearbyTypeTW
          : ""
      }`;
    }
  }, [centerAttractionNearby, nearbyType]);

  ///依照類型抓取特定類型的附近景點
  useEffect(() => {
    if (!nearbySpot && nearbyType) {
      dispatch(restNearbyFetchingStatus());
      dispatch(fetchNearbyAttractions(nearbyType));
    }
  }, [nearbyType, nearbySpot]);

  useEffect(() => {
    if (nearbyType === "scenicSpot" && isAttractionFromNearby === false) {
      dispatch(changeCountyAttractionFrom(true));
    } else if (
      (nearbyType === "restaurant" || nearbyType === "hotel" || !nearbyType) &&
      isAttractionFromNearby === true
    ) {
      dispatch(changeCountyAttractionFrom(false));
    }
  }, [nearbyType, isAttractionFromNearby]);

  ///當NearbyModal unmount時，isAttractionFromNearby必定為false
  useEffect(() => {
    return () => {
      dispatch(changeCountyAttractionFrom(false));
    };
  }, []);

  return (
    <>
      <Modal
        modalName="nearby"
        onClose={handleCloseClick}
        headerName="附近景點"
        majorClasses={classes}
      >
        <ButtonOptions />
        <NearbyList />
      </Modal>
      {isShowNearbySpot && <NearbySpotModal />}
    </>
  );
};

export default Nearby;
