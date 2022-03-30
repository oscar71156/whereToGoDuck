import Modal from "../UI/Modal/Modal";
import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";
import { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fecthAttractionsByID } from "../../store/actions/nearbyAttractions";
import Restaurant from "./Restaurant";
import Hotel from "./Hotel";
const NearbySpot = () => {
  const dispatch = useDispatch();
  const {
    nearbySpot,
    nearbyType,
    attraction: centerAttractionID,
  } = useParams();

  const [attraction, setAttraction] = useState(null);

  const nearbyAttractions = useSelector(
    (state) => state.nearbyAttractions.data
  );

  const isAttractionNotFound = useSelector(
    (state) => state.nearbyAttractions.isFetchAll
  );


  useEffect(()=>{
    let attractionKeyname='ScenicSpotName';
    switch(nearbyType){
      case 'restaurant':
        attractionKeyname='RestaurantName';
        break;
      case 'hotel':
        attractionKeyname='HotelName';
        break;
      case 'scenicSpot':
      default:
        attractionKeyname='ScenicSpotName';
        break;
    }
    if(attraction){
      document.title=`要去哪裡鴨${attraction[attractionKeyname]?'-'+attraction[attractionKeyname]:''}`;
    }else{
      document.title=`要去哪裡鴨`;
    }
    
  },[attraction,nearbyType])
  
  useEffect(() => {
    if (nearbySpot && nearbyAttractions) {
      let findedAttraction = null;
      if (nearbyType === "restaurant") {
        findedAttraction = nearbyAttractions.find(
          ({ RestaurantID }) => RestaurantID === nearbySpot
        );
      } else if (nearbyType === "hotel") {
        findedAttraction = nearbyAttractions.find(
          ({ HotelID }) => HotelID === nearbySpot
        );
      }

      setAttraction(findedAttraction);
      if (!findedAttraction && !isAttractionNotFound) {
        dispatch(
          fecthAttractionsByID(nearbySpot, nearbyType, centerAttractionID)
        );
      }
    }
  }, [nearbySpot, nearbyAttractions, nearbyType, isAttractionNotFound]);


  const _renderContent = () => {
    if (!attraction) {
      return <div>loading</div>;
    }
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
  };

  return (
    <Modal>
      {_renderContent()}
    </Modal>
  );
};

export default NearbySpot;
