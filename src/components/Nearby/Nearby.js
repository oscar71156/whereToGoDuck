import React, { useEffect, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Modal from "../UI/Modal/Modal";
import ButtonOptions from "./ButtonOptions";
import NearbyList from "./NearbyList";

import classes from "./Nearby.module.css";


const Nearby = () => {
  const centerAttractionNearby = useSelector(
    (state) => state.displayedAttraction.data
  );
  const history = useHistory();
  const { pathname } = useLocation();
  const { nearbyType } = useParams();

  const handleCloseClick = () => {
    history.push(pathname.replace(`/nearby/${nearbyType}`, ""));
  };

  useEffect(() => {
    if (centerAttractionNearby) {
      let nearbyTypeTW = "景點";
      switch (nearbyType) {
        case "restaurant":
          nearbyTypeTW = "餐飲";
          break;
        case "hotel":
          nearbyTypeTW = "旅宿";
          break;
        case "scenicSpot":
        default:
          nearbyTypeTW = "景點";
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
    </>
  );
};

export default Nearby;
