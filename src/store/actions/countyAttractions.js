import {
  SET_COUNTY_ISFETECHALL,
  FETCH_COUNTY_ATTRACTIONS,
  SET_COUNTY_ATTRACTION_IN_NEARBY,
  SET_COUNTY_ERROR,
  SET_COUNTY_LOADING,
} from "./types";
import MOTCPTX from "../../apis/MOTCPTX ";
import locations from "../../assets/locations";

const FETCHAMOUNT = 10;

export const fetchAttractions = (county) => async (dispatch, getState) => {
  try {
    dispatch(_setIsLoadingData(true));
    const { countyAttractions: countyAttractionsState } = getState();
    const { page: currentPage } = countyAttractionsState;
    // const data = locations.slice(
    //   currentPage * FETCHAMOUNT,
    //   (currentPage + 1) * FETCHAMOUNT
    // );

    const response = await MOTCPTX.get(`/Tourism/ScenicSpot/${county}`, {
      params: {
        $top: FETCHAMOUNT,
        $skip: currentPage * FETCHAMOUNT,
      },
    });

    const { data } = response;
    if (data && data.length > 0) {
      dispatch({
        type: FETCH_COUNTY_ATTRACTIONS,
        payload: data,
      });
    } else {
      dispatch(_fetchAllData());
    }
    dispatch(_setIsLoadingData(false));
  } catch (e) {
    dispatch(writeError("內部發生發生錯誤"));
    dispatch(_fetchAllData());
    dispatch(_setIsLoadingData(false));
  }
};

const _fetchAllData = () => {
  return {
    type: SET_COUNTY_ISFETECHALL,
    payload: true,
  };
};

const _setIsLoadingData = (isLoadingData) => {
  return {
    type: SET_COUNTY_LOADING,
    payload: isLoadingData,
  };
};

export const fecthAttractionsByIdAndCounty = (county, attractionID) => async (dispatch) => {

    try{
      dispatch(_setIsLoadingData(true));
      // let data = locations;
      const response = await MOTCPTX.get(`/Tourism/ScenicSpot/${county}`);
      let { data } = response;
      data = data.filter(({ ScenicSpotID }) => ScenicSpotID === attractionID);
      if (data && data.length > 0) {
        dispatch({
          type: FETCH_COUNTY_ATTRACTIONS,
          payload: data,
        });
      }
      // console.log('fecthAttractionsByIdAndCounty',data)
      dispatch(_fetchAllData());
      dispatch(_setIsLoadingData(false));
    }catch(e){
      console.error('fecthAttractionsByIdAndCounty action error',e.message)
      dispatch(writeError("內部發生發生錯誤"));
      dispatch(_fetchAllData());
      dispatch(_setIsLoadingData(false));
    }

  };

export const changeCountyAttractionFrom = (isFromNearbyBy) => {
  return {
    type: SET_COUNTY_ATTRACTION_IN_NEARBY,
    payload: isFromNearbyBy,
  };
};

const writeError = (message) => {
  return {
    type: SET_COUNTY_ERROR,
    payload: message,
  };
};

