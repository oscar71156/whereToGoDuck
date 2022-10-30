import MOTCPTX from "../../apis/MOTCPTX ";
import locations from "../../assets/data/locations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import nearbyAttraction from "../../assets/data/nearbyAttraction";
import nearbyHotel from "../../assets/data/nearbyHotel";
import nearbyRestaurant from "../../assets/data/nearbyRestaurant";
import { formatDataArrayIdAndName,getDataById,formatDataIdAndName, getMOTCPTXURLByType } from "../../utilities";
import { getTempNearbySpotsByType } from "../../assets/data";
const FETCHAMOUNT = 10;


/***將temp Data 用env判斷處理 */
export const fetchAttractions = createAsyncThunk(
  "countyAttractions/fetchAttractions",
  async (fetchingInfor, thunkAPI) => {
    try{
      const { countyAttractions: countyAttractionsState } = thunkAPI.getState();
      const { page } = countyAttractionsState;
      const { county, isNewCounty } = fetchingInfor;
      let currentPage = isNewCounty ? 0 : page;
      /***************************/
      //temp Data
      // let data = locations.slice(
      //   currentPage * FETCHAMOUNT,
      //   (currentPage + 1) * FETCHAMOUNT
      // );
      // /***************************/
      /****GET MOTCPTX DATA****/
      const response = await MOTCPTX.get(`/Tourism/ScenicSpot/${county}`, {
        params: {
          $top: FETCHAMOUNT,
          $skip: currentPage * FETCHAMOUNT,
        },
      });
  
      let { data } = response;
  
      data=formatDataArrayIdAndName(data);
      return { data, isNewCounty };
    }catch(e){
      console.log('error',e);
      return [];
    }

  }
);

export const fetchNearbyAttractions = createAsyncThunk(
  "countyAttractions/fetchNearbyAttractions",
  async (fetchingInfor, thunkAPI) => {
    try {
      const {
        countyAttractions: countyAttractionsState,
        displayedAttraction: displayedAttractionState,
      } = thunkAPI.getState();
      const { page } = countyAttractionsState;
      const { data: centerAttraction } = displayedAttractionState;
      const { Position: centerAttractionPosition } = centerAttraction;
      const { nearbyType, isNewNearbyType } = fetchingInfor;

      let currentPage = isNewNearbyType ? 0 : page;

      ///temp Datas
      // let totalData = getTempNearbySpotsByType(nearbyType);
      // let data = totalData.slice(
      //   FETCHAMOUNT * currentPage,
      //   FETCHAMOUNT * (currentPage + 1)
      // );
      /****************************/

      /**********************/
      /****GET MOTCPTX DATA****/
      let url=getMOTCPTXURLByType(nearbyType);

      const response = await MOTCPTX.get(url, {
        params: {
          $top: FETCHAMOUNT,
          $skip: FETCHAMOUNT * currentPage,
          $spatialFilter: `nearby(${centerAttractionPosition.PositionLat},${centerAttractionPosition.PositionLon},1000)`,
        },
      });
      let { data } = response;
      /**********************/
      data=formatDataArrayIdAndName(data,nearbyType);
      return { isNewNearbyType, data };
    } catch (e) {
      console.log("error", e);
    }
  }
);

export const fecthAttractionsByIdAndNearbyType = createAsyncThunk(
  "countyAttractions/fecthAttractionsByIdAndNearbyType",
  async (fetchInfor, thunkAPI) => {
    const { nearbySpotID: attractionID, nearbyType } = fetchInfor;

    const { countyAttractionsState } = thunkAPI.getState();
    const { data: attractionsInStore } = countyAttractionsState;
    let data = [];
    if (attractionsInStore.length > 0) {
      if (nearbyType === "restaurant") {
        data = attractionsInStore.filter(
          ({ RestaurantID }) => RestaurantID === attractionID
        );
      } else if (nearbyType === "hotel") {
        data = attractionsInStore.filter(
          ({ HotelID }) => HotelID === attractionID
        );
      } else {
        data = attractionsInStore.filter(
          ({ ScenicSpotID }) => ScenicSpotID === attractionID
        );
      }
    }
    if (data) {
      return data;
    } else {
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
      const { nearbyAttractions: nearbyAttractionsState } = thunkAPI.getState();
      const { centerAttraction } = nearbyAttractionsState;

      const { Position: centerAttractionPosition } = centerAttraction;
      let url = getMOTCPTXURLByType(nearbyType);

      const response = await MOTCPTX.get(url, {
        params: {
          $spatialFilter: `nearby(${centerAttractionPosition.PositionLat},${centerAttractionPosition.PositionLon},1000)`,
        },
      });

      let { data } = response;
      /**********************/

      return formatDataIdAndName(getDataById(attractionID,nearbyType,data));
    }
  }
);
