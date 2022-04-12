import {
  FETCH_NEARBY_ATTRACTIONS,
  SET_NEARBY_ISFETECHALL,
  SET_NEARBY_CENTER,
  SET_NEARBY_LOADING,
  SET_NEARBY_ERROR,
  RESET_NEARBY_FETCHING_STATUS,
} from "./types";
import nearbyAttraction from "../../assets/data/nearbyAttraction";
import nearbyHotel from "../../assets/data/nearbyHotel";
import nearbyRestaurant from "../../assets/data/nearbyRestaurant";
import MOTCPTX from "../../apis/MOTCPTX ";

const FETCHAMOUNT = 5;

export const fetchAttractions = (nearbyType) => async (dispatch, getState) => {
  try {
    dispatch(_setIsLoadingData(true));
    const { nearbyAttractions: nearbyAttractionsState } = getState();
    const { page: currentPage, centerAttraction } = nearbyAttractionsState;
    const { Position: centerAttractionPosition } = centerAttraction;

    /****************************/
    ///temp Datas
    // let totalData = nearbyAttraction;
    // if (nearbyType === "restaurant") {
    //   totalData = nearbyRestaurant;
    // } else if (nearbyType === "hotel") {
    //   totalData = nearbyHotel;
    // } else {
    // }
    // let data = totalData.slice(
    //   FETCHAMOUNT * currentPage,
    //   FETCHAMOUNT * (currentPage + 1)
    // );
    /****************************/

    /**********************/
    /****GET MOTCPTX DATA****/
    let url = "/Tourism/ScenicSpot";
    if (nearbyType === "restaurant") {
      url = "/Tourism/Restaurant";
    } else if (nearbyType === "hotel") {
      url = "/Tourism/Hotel";
    } else {
    }

    const response = await MOTCPTX.get(url, {
      params: {
        $top: FETCHAMOUNT,
        $skip: FETCHAMOUNT * currentPage,
        $spatialFilter: `nearby(${centerAttractionPosition.PositionLat},${centerAttractionPosition.PositionLon},1000)`,
      },
    });
    const { data } = response;
    /**********************/

    if (data && data.length > 0) {
      dispatch(_fetchAttractions(data));
    } else {
      dispatch(_changeIsFetchAll(true));
    }
    dispatch(_setIsLoadingData(false));
  } catch (e) {
    dispatch(writeError("內部發生發生錯誤"));
    dispatch(_setIsLoadingData(false));
    dispatch(_changeIsFetchAll(true));
  }
};

export const fecthAttractionsByIdAndNearbyType =
  (attractionID, nearbyType) => async (dispatch, getState) => {
    try {
      dispatch(_setIsLoadingData(true));

      /**********************/
      ///temp Data
      // let data = [];
      // if (nearbyType === "restaurant") {
      //   data = nearbyRestaurant;
      // } else if (nearbyType === "hotel") {
      //   data = nearbyHotel;
      // } else {
      //   data = nearbyAttraction;
      // }
      /**********************/

      /**********************/
      /****GET MOTCPTX DATA****/
      const { nearbyAttractions: nearbyAttractionsState } = getState();
      const { centerAttraction } = nearbyAttractionsState;

      const { Position: centerAttractionPosition } = centerAttraction;
      let url = "/Tourism/ScenicSpot";
      if (nearbyType === "restaurant") {
        url = "/Tourism/Restaurant";
      } else if (nearbyType === "hotel") {
        url = "/Tourism/Hotel";
      } else {
      }

      const response = await MOTCPTX.get(url, {
        params: {
          $spatialFilter: `nearby(${centerAttractionPosition.PositionLat},${centerAttractionPosition.PositionLon},1000)`,
        },
      });

      let { data } = response;
      /**********************/

      if (data.length > 0) {
        if (nearbyType === "restaurant") {
          data = data.filter(
            ({ RestaurantID }) => RestaurantID === attractionID
          );
        } else if (nearbyType === "hotel") {
          data = data.filter(({ HotelID }) => HotelID === attractionID);
        }
      }
      dispatch(_fetchAttractions(data));
      dispatch(_changeIsFetchAll(true));
      dispatch(_setIsLoadingData(false));
    } catch (e) {
      dispatch(writeError("內部發生發生錯誤"));
      dispatch(_setIsLoadingData(false));
      dispatch(_changeIsFetchAll(true));
    }
  };

export const _fetchAttractions = (attractions) => {
  return {
    type: FETCH_NEARBY_ATTRACTIONS,
    payload: attractions,
  };
};

export const setCenterAttraction = (attraction) => {
  return {
    type: SET_NEARBY_CENTER,
    payload: attraction,
  };
};

export const clearCenterAttraction = () => {
  return setCenterAttraction(null);
};

///rest all Nearby value to default except centerAttraction
export const restNearbyFetchingStatus = () => {
  return {
    type: RESET_NEARBY_FETCHING_STATUS,
  };
};

const writeError = (message) => {
  return {
    type: SET_NEARBY_ERROR,
    payload: message,
  };
};

const _setIsLoadingData = (isLoading) => {
  return {
    type: SET_NEARBY_LOADING,
    payload: isLoading,
  };
};

const _changeIsFetchAll = (isFetchAll) => {
  return {
    type: SET_NEARBY_ISFETECHALL,
    payload: isFetchAll,
  };
};
