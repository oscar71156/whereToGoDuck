import MOTCPTX from "../../apis/MOTCPTX ";
import { createAsyncThunk } from "@reduxjs/toolkit";
import locations from "../../assets/data/locations";
export const fecthDisplayedAttractionById = createAsyncThunk(
    "displayedAttraction/fecthDisplayedAttractionById",
    async (attractionInfor, thunkAPI) => {
      try {
        const { attractionId, county } = attractionInfor;
  
        const { countyAttractions: countyAttractionsState } = thunkAPI.getState();
        const { data: attractionsInStore } = countyAttractionsState;
  
        let data = attractionsInStore.find(
          ({ ScenicSpotID }) => ScenicSpotID === attractionId
        );
        if (data) {
          return data;
        } else {
          // let data = locations;
  
          /**********************/
          /****GET MOTCPTX DATA****/
          const response = await MOTCPTX.get(`/Tourism/ScenicSpot/${county}`);
          let { data } = response;
          /**********************/
          data = data.find(({ ScenicSpotID }) => ScenicSpotID === attractionId);
          return data;
        }
      } catch (e) {
        console.log("error", e);
        return {};
      }
    }
  );