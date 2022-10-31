import { useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import classes from "./NearbySpot.module.css";

import { getTempNearbySpotsByType } from "../../assets/data";
import { getDataById, getMOTCPTXURLByType } from "../../utilities";
import MOTCPTX from "../../apis/MOTCPTX ";

import NotFound from "../NotFound";

import Restaurant from "./Restaurant";
import Hotel from "./Hotel";
import Modal from "../UI/Modal/Modal";
import { useCallback } from "react";

const NearbySpot = () => {
  const {
    nearbySpot: nearbySpotID,
    nearbyType,
    attraction: centerAttractionID,
    county,
  } = useParams();
  const history = useHistory();

  const { state: locationState } = useLocation();
  const [attraction, setAttraction] = useState(null);

  const [headerName, setHeaderName] = useState(null);
  const nearbyAttractions = useSelector(
    (state) => state.countyAttractions.data
  );
  const centerAttraction = useSelector(
    (state) => state.displayedAttraction.data
  );

  const [fetchingDataError, setFetchingDataError] = useState(null);

  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    let attractionKeyname = "";
    switch (nearbyType) {
      case "restaurant":
        attractionKeyname = "RestaurantName";
        break;
      case "hotel":
        attractionKeyname = "HotelName";
        break;
      case "scenicSpot":
      default:
        attractionKeyname = "ScenicSpotName";
        break;
    }
    if (attraction) {
      document.title = `要去哪裡鴨${
        attraction[attractionKeyname] ? "-" + attraction[attractionKeyname] : ""
      }`;
    } else {
      document.title = `要去哪裡鴨-NearbySpot`;
    }
  }, [attraction, nearbyType]);

  useEffect(() => {
    let findedAttraction = null;
    //RestaurantID or HotelID
    let idKeyName = "";
    if (nearbyType === "restaurant") {
      idKeyName = "RestaurantID";
    } else if (nearbyType === "hotel") {
      idKeyName = "HotelID";
    }
    findedAttraction = nearbyAttractions.find(
      ({ [idKeyName]: id }) => id === nearbySpotID
    );
    if (findedAttraction) {
      setAttraction(findedAttraction);
    } else {
      fecthAttractionsByIdAndNearbyType(nearbySpotID, nearbyType)
        .then((data) => {
          setAttraction(data);
          setIsFetched(true);
        })
        .catch((e) => setFetchingDataError(true));
    }
  }, [nearbySpotID, nearbyAttractions, nearbyType, centerAttractionID]);

  useEffect(() => {
    if (attraction) {
      switch (nearbyType) {
        case "restaurant":
          setHeaderName(attraction.RestaurantName);
          break;
        case "hotel":
          setHeaderName(attraction.HotelName);
          break;
        default:
          setHeaderName(null);
      }
    } else {
      setHeaderName(null);
    }
  }, [attraction]);

  const _handleCloseClick = () => {
    // toggleNearbySpotModal(false);
    /**修正 判斷有goback 無則push*/
    if (locationState?.prePathname) {
      history.goBack();
    }else{
      history.push(`/${county}/${centerAttractionID}/nearby/${nearbyType}`);
    }
  };

  const fecthAttractionsByIdAndNearbyType = useCallback(
    async (attractionID, nearbyType) => {
      let data = null;
      if (process.env.REACT_APP_IS_GET_ONLINE_DATA === "true") {
        const { Position: centerAttractionPosition } = centerAttraction;
        let url = getMOTCPTXURLByType(nearbyType);
        const response = await MOTCPTX.get(url, {
          params: {
            $spatialFilter: `nearby(${centerAttractionPosition.PositionLat},${centerAttractionPosition.PositionLon},1000)`,
          },
        });
        data = response.data;
      } else {
        data = getTempNearbySpotsByType(nearbyType);
      }

      return getDataById(attractionID, nearbyType, data);
    },
    [centerAttraction]
  );

  const _renderContent = () => {
    if (fetchingDataError) {
      return (
        <p className={classes.error}>
          內部發生錯誤，稍待片刻再重新整理或洽詢管理員。
        </p>
      );
    } else if (!attraction && isFetched) {
      return <NotFound />;
    } else if (attraction) {
      if (nearbyType === "restaurant") {
        return (
          <Restaurant
            name={attraction.RestaurantName}
            pictureURL={attraction.Picture.PictureUrl1}
            pictureAlt={attraction.Picture.PictureDescription1}
            address={attraction.Address}
            phone={attraction.Phone}
            openTime={attraction.OpenTime}
            description={attraction.Description}
          />
        );
      } else if (nearbyType === "hotel") {
        return (
          <Hotel
            name={attraction.HotelName}
            pictureURL={attraction.Picture.PictureUrl1}
            pictureAlt={attraction.Picture.PictureDescription1}
            address={attraction.Address}
            phone={attraction.Phone}
            parkingInformation={attraction.ParkingInfo}
          />
        );
      }
    }
    return <p className={classes.loading}>載入中...請稍後</p>;
  };

  return (
    <Modal
      majorClasses={classes}
      modalName="nearbySpot"
      headerName={headerName ? headerName : "烏托邦"}
      onClose={_handleCloseClick}
    >
      {_renderContent()}
    </Modal>
  );
};

export default NearbySpot;
