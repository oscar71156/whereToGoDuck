import MOTCPTX from "../../apis/MOTCPTX ";
import locations from "../../assets/data/locations";
import {
  setIsLoadingData,
  fetchAllData,
  fetchAttractions as fetchAttractionsAction,
  writeError,
} from "../slice/countyAttractions";

const FETCHAMOUNT = 10;

export const fetchAttractions = (county) => async (dispatch, getState) => {
  try {
    dispatch(setIsLoadingData(true));
    const { countyAttractions: countyAttractionsState } = getState();
    const { page: currentPage } = countyAttractionsState;

    /******************************/
    //temp Data
    // const data = locations.slice(
    //   currentPage * FETCHAMOUNT,
    //   (currentPage + 1) * FETCHAMOUNT
    // );
    /******************************/

    /**********************/
    /****GET MOTCPTX DATA****/
    const response = await MOTCPTX.get(`/Tourism/ScenicSpot/${county}`, {
      params: {
        $top: FETCHAMOUNT,
        $skip: currentPage * FETCHAMOUNT,
      },
    });

    const { data } = response;
    /**********************/

    if (data && data.length > 0) {
      dispatch(fetchAttractionsAction(data));
    } else {
      dispatch(fetchAllData());
    }
    dispatch(setIsLoadingData(false));
  } catch (e) {
    dispatch(writeError("內部發生發生錯誤"));
    dispatch(fetchAllData());
    dispatch(setIsLoadingData(false));
  }
};

export const fecthAttractionsByIdAndCounty =
  (county, attractionID) => async (dispatch) => {
    try {
      dispatch(setIsLoadingData(true));
      // let data = locations;

      /**********************/
      /****GET MOTCPTX DATA****/
      const response = await MOTCPTX.get(`/Tourism/ScenicSpot/${county}`);
      let { data } = response;
      /**********************/
      data = data.filter(({ ScenicSpotID }) => ScenicSpotID === attractionID);
      if (data && data.length > 0) {
        dispatch(fetchAttractionsAction(data));
      }
      dispatch(fetchAllData());
      dispatch(setIsLoadingData(false));
    } catch (e) {
      console.error("fecthAttractionsByIdAndCounty action error", e.message);
      dispatch(writeError("內部發生發生錯誤"));
      dispatch(fetchAllData());
      dispatch(setIsLoadingData(false));
    }
  };
