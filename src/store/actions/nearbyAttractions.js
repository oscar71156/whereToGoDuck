import nearbyAttraction from "../../assets/data/nearbyAttraction";
import nearbyHotel from "../../assets/data/nearbyHotel";
import nearbyRestaurant from "../../assets/data/nearbyRestaurant";
import MOTCPTX from "../../apis/MOTCPTX ";
import {
  changeIsFetchAll,
  setIsLoadingData,
  writeError,
  setCenterAttraction,
  fetchAttractions as fetchAttractionsAction,
} from "../slice/nearbyAttractions";

const FETCHAMOUNT = 5;

export const fetchAttractions = (nearbyType) => async (dispatch, getState) => {
  try {
    dispatch(setIsLoadingData(true));
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
      dispatch(fetchAttractionsAction(data));
    } else {
      dispatch(changeIsFetchAll(true));
    }
    dispatch(setIsLoadingData(false));
  } catch (e) {
    dispatch(writeError("內部發生發生錯誤"));
    dispatch(setIsLoadingData(false));
    dispatch(changeIsFetchAll(true));
  }
};

export const fecthAttractionsByIdAndNearbyType =
  (attractionID, nearbyType) => async (dispatch, getState) => {
    try {
      dispatch(setIsLoadingData(true));

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
      dispatch(fetchAttractionsAction(data));
      dispatch(changeIsFetchAll(true));
      dispatch(setIsLoadingData(false));
    } catch (e) {
      dispatch(writeError("內部發生發生錯誤"));
      dispatch(setIsLoadingData(false));
      dispatch(changeIsFetchAll(true));
    }
  };

export const clearCenterAttraction = () => {
  return setCenterAttraction(null);
};
