import {
  FETCH_NEARBY_ATTRACTIONS,
  SET_NEARBY_ISFETECHALL,
  FETCH_NEARBY_INIT_ATTRACTIONS,
} from "./types";
import nearbyAttraction from "../../assets/nearbyAttraction";
import nearbyHotel from "../../assets/nearbyHotel";
import nearbyRestaurant from "../../assets/nearbyRestaurant";

const FETCHAMOUNT = 5;

const _fecthAttractions =async (centerAttractionId,nearbyType,currentPage)=>{
  let data = [];
  if (nearbyType === "restaurant") {
    data = nearbyRestaurant.slice(
      FETCHAMOUNT * currentPage,
      FETCHAMOUNT * (currentPage + 1)
    );
  } else if (nearbyType === "hotel") {
    data = nearbyHotel.slice(
      FETCHAMOUNT * currentPage,
      FETCHAMOUNT * (currentPage + 1)
    );
  } else {
    data = nearbyAttraction.slice(
      FETCHAMOUNT * currentPage,
      FETCHAMOUNT * (currentPage + 1)
    );
    
  }

  return data;
  
};



const _changeIsFetchAll = (isFetchAll) => {
  return {
    type: SET_NEARBY_ISFETECHALL,
    payload: isFetchAll,
  };
};


export const fetchInitAttractions=(attractionID,nearbyType)=>async(dispatch)=>{
  const fetchedData=await _fecthAttractions(attractionID,nearbyType,0);
  if(fetchedData&&fetchedData.length>0){
    dispatch({
      type:FETCH_NEARBY_INIT_ATTRACTIONS,
      payload:fetchedData
    })
  }else{
    dispatch({
      type:SET_NEARBY_ISFETECHALL,
      payload:true
    })
  }


}

export const fetchAttractions = (centerAttractionId,nearbyType) => async (dispatch,getState) => {

  const {nearbyAttractions:nearbyAttractionsState}=getState();
  const {page:currentPage}=nearbyAttractionsState;
  const fetchedData=await _fecthAttractions(centerAttractionId,nearbyType,currentPage);
  if(fetchedData&&fetchedData.length>0){
    dispatch({
      type:FETCH_NEARBY_ATTRACTIONS,
      payload:fetchedData
    })
  }else{
    dispatch({
      type:SET_NEARBY_ISFETECHALL,
      payload:true
    })
  }
};



export const fecthAttractionsByID=(attractionID,nearbyType,centerAttractionId)=>async(dispatch)=>{

  

  let data = [];
  if (nearbyType === "restaurant") {
    data = nearbyRestaurant;
    data=data.filter(({RestaurantID})=>attractionID===RestaurantID);
  } else if (nearbyType === "hotel") {
    data = nearbyHotel;
    data=data.filter(({HotelID})=>HotelID===attractionID);
  } else {
    data = nearbyAttraction;
    data=data.filter(({ScenicSpotID})=>ScenicSpotID===attractionID);
  }
 
  if(data.length>0){
    dispatch({
      type: FETCH_NEARBY_INIT_ATTRACTIONS,
      payload: data,
    });
  }else{
    dispatch(_changeIsFetchAll(true))
  }

}
