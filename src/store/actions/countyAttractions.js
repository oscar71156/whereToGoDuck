import { FETCH_COUNTY_ATTRACTIONS,SET_COUNTY_ISFETECHALL,FETCH_COUNTY_INIT_ATTRACTIONS } from "./types";
import axios from "axios";
import locations from "../../assets/locations";

const FETCHAMOUNT = 10;

export const fecthAttractions = (county) => async(dispatch, getState) => {
  const { countyAttractions: countyAttractionsState } = getState();
  const { page: currentPage } = countyAttractionsState;

  const data = locations.slice(
    currentPage * FETCHAMOUNT,
    (currentPage + 1) * FETCHAMOUNT
  );
  if(data&&data.length>0){
    dispatch({
        type: FETCH_COUNTY_ATTRACTIONS,
        payload: data,
      });
  }else{
      dispatch(_fetchAllData());
  }
};


export const fecthInitAttractions = (county) => async(dispatch) => {

  
    const currentPage=0;
    const data = locations.slice(currentPage * FETCHAMOUNT,(currentPage + 1) * FETCHAMOUNT);
    if(data&&data.length>0){
      dispatch({
          type: FETCH_COUNTY_INIT_ATTRACTIONS,
          payload: data,
        });
    }else{
        dispatch(_fetchAllData());
    }
};


const _fetchAllData=()=>{
    return{
        type:SET_COUNTY_ISFETECHALL,
        payload:true
    }
}


export const fecthAttractionsByID = (county,attractionID) => async(dispatch) => {

    let data = locations;
    data=data.filter(({ScenicSpotID})=>ScenicSpotID===attractionID);
    if(data&&data.length>0){
      dispatch({
          type: FETCH_COUNTY_INIT_ATTRACTIONS,
          payload: data,
        });
    }else{
        dispatch(_fetchAllData());
    }
};
