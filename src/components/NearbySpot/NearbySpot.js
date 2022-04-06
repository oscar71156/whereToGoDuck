import Modal from "../UI/Modal/Modal";
import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";
import { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fecthAttractionsByIdAndNearbyType } from "../../store/actions/nearbyAttractions";
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

  const isFetchAllAttractions= useSelector(
    (state) => state.nearbyAttractions.isFetchAll
  );

  const isLoadingData=useSelector((state)=>state.nearbyAttractions.isLoading);
  const fetchingDataError=useSelector((state)=>state.nearbyAttractions.error);


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
    console.log('useEffect in NearbySpot','nearbySpot',nearbySpot,'nearbyAttractions',nearbyAttractions)
    let findedAttraction = null;
    if (nearbyAttractions) {
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
    }
    
    if(!findedAttraction&&!isFetchAllAttractions){
      dispatch(
        fecthAttractionsByIdAndNearbyType(nearbySpot, nearbyType, centerAttractionID)
      );
    }
  }, [nearbySpot, nearbyAttractions, nearbyType, isFetchAllAttractions,centerAttractionID]);


 
  useEffect(()=>{
    if(isFetchAllAttractions&&!attraction&&(!nearbyAttractions||nearbyAttractions.length===0)){
      throw new Error('cant find this site');
    }
  },[isFetchAllAttractions,attraction,nearbyAttractions])

  const _renderContent = () => {
    if(fetchingDataError){
      return <div>內部發生錯誤</div>;
    }
    if(!attraction&&isFetchAllAttractions){
      return (<div>嗚嗚找不到</div>)
    }
    if (isLoadingData||!attraction) {
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
