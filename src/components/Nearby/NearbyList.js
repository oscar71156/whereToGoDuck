import { useSelector,useDispatch } from "react-redux";
import NearbyAttraction from "./NearbyAttraction";
import MoreButton from "../UI/Button/More";
import NotFound from "../CountyAttractions/NotFound";
import classes from "./NearbyList.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {fetchAttractions,fetchInitAttractions} from '../../store/actions/nearbyAttractions'

const NearbyList = () => {

  const attractions = useSelector((state) => state.nearbyAttractions.data);

  const isFetchAll=useSelector((state)=>state.nearbyAttractions.isFetchAll);


  const dispatch=useDispatch();

  const {attraction:attractionId,nearbyType}=useParams();


  //for input directly
  useEffect(()=>{
    if(!attractions){
      dispatch(fetchInitAttractions(attractionId,nearbyType));
    }
  },[attractionId,nearbyType])


  const _handleMore=()=>{
    dispatch(fetchAttractions(attractionId,nearbyType))
  }

  const _mapFun = (attraction) => {
    switch (nearbyType) {
      case "hotel":
        return (
          <NearbyAttraction
            key={attraction.HotelID}
            address={attraction.Address}
            name={attraction.HotelName}
            phone={attraction.Phone}
            pictureAlt={attraction.Picture.PictureDescription1}
            pictureURL={attraction.Picture.PictureUrl1}
            distance={1}
            spotID={attraction.HotelID}
          />
        );
      case "restaurant":
        return (
          <NearbyAttraction
            key={attraction.RestaurantID}
            address={attraction.Address}
            name={attraction.RestaurantName}
            phone={attraction.Phone}
            openTime={attraction.OpenTime}
            pictureAlt={attraction.Picture.PictureDescription1}
            pictureURL={attraction.Picture.PictureUrl1}
            distance={1}
            spotID={attraction.RestaurantID}
          />
        );
      case "scenicSpot":
      default:
        return (
          <NearbyAttraction
            key={attraction.ScenicSpotID}
            name={attraction.ScenicSpotName}
            ticketInfo={attraction.TicketInfo}
            spotID={attraction.ScenicSpotID}
            pictureAlt={attraction.Picture.PictureDescription1}
            pictureURL={attraction.Picture.PictureUrl1}
            address={attraction.Address}
            openTime={attraction.OpenTime}
            distance={1}
          />
        );
    }
  };

  const _renderContent = () => {
    if (attractions && attractions?.length > 0) {
      return (
        <div>
          {attractions.map(_mapFun)}
          <div className={classes.button}>

            {!isFetchAll&&<MoreButton onClick={_handleMore} />}
          </div>
        </div>
      );
    }

    return <NotFound />;
  };

  return <div className={classes.nearbyList}>{_renderContent()}</div>;
};

export default NearbyList;
