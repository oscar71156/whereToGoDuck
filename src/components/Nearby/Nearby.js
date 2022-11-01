import React, { useEffect } from "react";
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
  const { pathname, state: locationState } = useLocation();
  const { nearbyType } = useParams();

  //判斷若是直接按網址進入此頁(無prePathname)則用景點詳細頁取代
  //若是有前一頁的紀錄則回上一頁。
  const handleCloseClick = () => {
    if (locationState?.prePathname) {
      history.goBack();
    } else {
      history.replace(pathname.replace(`/nearby/${nearbyType}`, ""));
    }
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
        centerAttractionNearby?.name
          ? "-" + centerAttractionNearby.name + "の附近" + nearbyTypeTW
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
