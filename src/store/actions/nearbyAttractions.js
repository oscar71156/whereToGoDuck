import {
  FETCH_NEARBY_ATTRACTIONS,
  SET_NEARBY_ISFETECHALL,
  SET_NEARBY_CENTER,
  SET_NEARBY_LOADING,
  SET_NEARBY_ERROR,
  RESET_NEARBY_FETCHING_STATUS,
} from "./types";
import nearbyAttraction from "../../assets/nearbyAttraction";
import nearbyHotel from "../../assets/nearbyHotel";
import nearbyRestaurant from "../../assets/nearbyRestaurant";
import MOTCPTX from "../../apis/MOTCPTX ";
const FETCHAMOUNT = 5;

export const fetchAttractions = (nearbyType) => async (dispatch, getState) => {
  try {


    dispatch(_setIsLoadingData(true));
    const { nearbyAttractions: nearbyAttractionsState } = getState();
    const { page: currentPage, centerAttraction } = nearbyAttractionsState;
    const { Position: centerAttractionPosition } = centerAttraction;

    let totalData = nearbyAttraction;
    if (nearbyType === "restaurant") {
      totalData = nearbyRestaurant;
    } else if (nearbyType === "hotel") {
      totalData = nearbyHotel;
    } else {
    }
    let data = totalData.slice(
      FETCHAMOUNT * currentPage,
      FETCHAMOUNT * (currentPage + 1)
    );

    // let url = "/Tourism/ScenicSpot";
    // if (nearbyType === "restaurant") {
    //   url = "/Tourism/Restaurant";
    // } else if (nearbyType === "hotel") {
    //   url = "/Tourism/Hotel";
    // } else {
    // }

    // const response=await MOTCPTX.get(url,{
    //   params:{
    //     $top:FETCHAMOUNT,
    //     $skip: FETCHAMOUNT * currentPage,
    //     $spatialFilter:`nearby(${centerAttractionPosition.PositionLat},${centerAttractionPosition.PositionLon},1000)`
    //   }
    // })
    // const {data}=response;

    if (data && data.length > 0) {
      dispatch({
        type: FETCH_NEARBY_ATTRACTIONS,
        payload: data,
      });
    } else {
      dispatch(_changeIsFetchAll(true))
    }
    dispatch(_setIsLoadingData(false));
  } catch (e) {
    dispatch(writeError("內部發生發生錯誤"));
    dispatch(_setIsLoadingData(false));
    dispatch(_changeIsFetchAll(true))
  }
};


const _changeIsFetchAll = (isFetchAll) => {
  return {
    type: SET_NEARBY_ISFETECHALL,
    payload: isFetchAll,
  };
};




export const fecthAttractionsByIdAndNearbyType = 
(attractionID, nearbyType, centerAttractionId) =>
  async (dispatch, getState) => {
    try{
      dispatch(_setIsLoadingData(true))
      let data = [];
      if (nearbyType === "restaurant") {
        data = nearbyRestaurant;
      } else if (nearbyType === "hotel") {
        data = nearbyHotel;
      } else {
        data = nearbyAttraction;
      }
  
      // const { nearbyAttractions: nearbyAttractionsState } = getState();
      // const { centerAttraction } = nearbyAttractionsState;
      // console.log('centerAttraction',centerAttraction)

      // const { Position: centerAttractionPosition } = centerAttraction;
      // let url = "/Tourism/ScenicSpot";
      // if (nearbyType === "restaurant") {
      //   url = "/Tourism/Restaurant";
      // } else if (nearbyType === "hotel") {
      //   url = "/Tourism/Hotel";
      // } else {
      // }
  
      // console.log("centerAttractionPosition",centerAttractionPosition)
      // const response=await MOTCPTX.get(url,{
      //   params:{
      //     $spatialFilter:`nearby(${centerAttractionPosition.PositionLat},${centerAttractionPosition.PositionLon},1000)`
      //   }
      // })
  
      // let {data}=response;
      if (data.length > 0) {
        if (nearbyType === "restaurant") {
          data = data.filter(({ RestaurantID }) => RestaurantID === attractionID);
        } else if (nearbyType === "hotel") {
          data = data.filter(({ HotelID }) => HotelID === attractionID);
        }
        dispatch({
          type: FETCH_NEARBY_ATTRACTIONS,
          payload: data,
        });
      }else{
        dispatch({
          type: FETCH_NEARBY_ATTRACTIONS,
          payload: [],
        });
      }
      dispatch(_changeIsFetchAll(true));
      dispatch(_setIsLoadingData(false))
    }catch(e){
      dispatch(writeError("內部發生發生錯誤"));
      dispatch(_setIsLoadingData(false));
      dispatch(_changeIsFetchAll(true))
    } 
};

export const setCenterAttraction = (attraction) => {
  return {
    type: SET_NEARBY_CENTER,
    payload: attraction,
  };
};

// export const clearCenterAttraction = () => {
//   return {
//     type: SET_NEARBY_CENTER,
//     payload: null,
//   };
// };

export const restNearbyFetchingStatus=()=>{
  return{
    type:RESET_NEARBY_FETCHING_STATUS
  }
}

const writeError=(message)=>{
  return{
    type:SET_NEARBY_ERROR,
    payload:message
  }
}

const _setIsLoadingData=(isLoading)=>{
  return{
    type:SET_NEARBY_LOADING,
    payload:isLoading
  }
}

