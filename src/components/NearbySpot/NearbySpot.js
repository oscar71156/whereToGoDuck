import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";

import classes from "./NearbySpot.module.css";

import { fecthAttractionsByIdAndNearbyType } from "../../store/actions/nearbyAttractions";

import NotFound from "../NotFound";

import Restaurant from "./Restaurant";
import Hotel from "./Hotel";
import Modal from "../UI/Modal/Modal";
import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";

const NearbySpot = () => {
  const dispatch = useDispatch();
  const {
    nearbySpot,
    nearbyType,
    attraction: centerAttractionID,
    county,
  } = useParams();
  const history = useHistory();

  const [attraction, setAttraction] = useState(null);

  const [headerName, setHeaderName] = useState(null);
  const nearbyAttractions = useSelector(
    (state) => state.nearbyAttractions.data
  );

  const isFetchAllAttractions = useSelector(
    (state) => state.nearbyAttractions.isFetchAll
  );

  const isLoadingData = useSelector(
    (state) => state.nearbyAttractions.isLoading
  );
  const fetchingDataError = useSelector(
    (state) => state.nearbyAttractions.error
  );

  const { toggle: toggleNearbySpotModal } = useContext(NearbySpotModalContext);

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
      document.title = `要去哪裡鴨`;
    }
  }, [attraction, nearbyType]);

  useEffect(() => {
    let findedAttraction = null;
    if (nearbyAttractions) {
      //RestaurantID or HotelID
      let idKeyName='';
      if (nearbyType === "restaurant") {
        idKeyName='RestaurantID'
      } else if (nearbyType === "hotel") {
        idKeyName='HotelID'
      }
      findedAttraction = nearbyAttractions.find(
        ({ [idKeyName]:id }) => id === nearbySpot
      );
      setAttraction(findedAttraction);
    }
    if (!findedAttraction && !isFetchAllAttractions) {
      dispatch(
        fecthAttractionsByIdAndNearbyType(
          nearbySpot,
          nearbyType
        )
      );
    }
  }, [
    nearbySpot,
    nearbyAttractions,
    nearbyType,
    isFetchAllAttractions,
    centerAttractionID,
  ]);

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
    toggleNearbySpotModal(false);
    history.push(`/${county}/${centerAttractionID}/nearby/${nearbyType}`);
  };
  const _renderContent = () => {
    if (fetchingDataError) {
      return (
        <p className={classes.error}>
          內部發生錯誤，稍待片刻再重新整理或洽詢管理員。
        </p>
      );
    } else if (!attraction && isFetchAllAttractions) {
      return <NotFound />;
    } else if (attraction && !isLoadingData) {
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
