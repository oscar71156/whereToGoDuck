import { useSelector,useDispatch } from "react-redux";
import NearbyAttraction from "./NearbyAttraction";
import MoreButton from "../UI/Button/More";
import NotFound from "../CountyAttractions/NotFound";
import classes from "./NearbyList.module.css";
import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import {fetchAttractions as fetchNearbyAttractions} from '../../store/actions/nearbyAttractions'

const NearbyList = () => {

  const attractions = useSelector((state) => state.nearbyAttractions.data);
  const isFetchAll=useSelector((state)=>state.nearbyAttractions.isFetchAll);
  const fetchingDataError=useSelector((state)=>state.nearbyAttractions.error);
  const isLoadingData=useSelector((state)=>state.nearbyAttractions.isLoading);

  const dispatch=useDispatch();

  const {nearbyType}=useParams();

  const _handleMore=()=>{
    dispatch(fetchNearbyAttractions(nearbyType))
  }

  const _mapFun =useCallback( (attraction) => {
    switch (nearbyType) {
      case "hotel":
        return (
          <NearbyAttraction
            key={nearbyType+attraction.HotelID}
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
            key={nearbyType+attraction.RestaurantID}
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
            key={nearbyType+attraction.ScenicSpotID}
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
  },[attractions]);

  const _renderContent = () => {


    if(fetchingDataError){
      return <div>{fetchingDataError}</div>
    }


    if(attractions&&attractions.length===0&&isFetchAll){
      return <NotFound />;
    }

    return (
      <div>
        {attractions.map(_mapFun)}
        {isLoadingData&&<div>載入中...</div>}
        <div className={classes.button}>
          {!isFetchAll&&<MoreButton onClick={_handleMore} />}
        </div>
      </div>
    );
    
   
  };

  return <div className={classes.nearbyList}>{_renderContent()}</div>;
};

export default NearbyList;
