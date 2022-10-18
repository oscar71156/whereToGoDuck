import MOTCPTX from "../../apis/MOTCPTX ";
import locations from "../../assets/data/locations";
import { createAsyncThunk } from "@reduxjs/toolkit";

const FETCHAMOUNT = 10;

export const fetchAttractions = createAsyncThunk(
  "countyAttractions/fetchAttractions",
  async (county, thunkAPI) => {
    const { countyAttractions: countyAttractionsState } = thunkAPI.getState();
    const { page: currentPage } = countyAttractionsState;

    /***************************/
    //temp Data
    // const data = locations.slice(
    //   currentPage * FETCHAMOUNT,
    //   (currentPage + 1) * FETCHAMOUNT
    // );

    /***************************/

    /****GET MOTCPTX DATA****/
    const response = await MOTCPTX.get(`/Tourism/ScenicSpot/${county}`, {
      params: {
        $top: FETCHAMOUNT,
        $skip: currentPage * FETCHAMOUNT,
      },
    });

    const { data } = response;

    return data;
  }
);

export const fecthAttractionsByIdAndCounty = createAsyncThunk(
  "countyAttractions/fetchAttractionsByIdAndCounty",
  async (attractionInfor, thunkAPI) => {
    const { attractionId, county } = attractionInfor;
    // let data = locations;

    /**********************/
    /****GET MOTCPTX DATA****/
    const response = await MOTCPTX.get(`/Tourism/ScenicSpot/${county}`);
    let { data } = response;
    /**********************/
    data = data.filter(({ ScenicSpotID }) => ScenicSpotID === attractionId);
    return data;
  }
);
