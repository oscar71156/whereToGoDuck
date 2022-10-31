import MOTCPTX from "../../apis/MOTCPTX ";
import { createAsyncThunk } from "@reduxjs/toolkit";
import locations from "../../assets/data/locations";
import { formatDataIdAndName, getDataById } from "../../utilities";
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
        let data = null;
        if (process.env.REACT_APP_IS_GET_ONLINE_DATA === "true") {
          /****GET MOTCPTX DATA****/
          const response = await MOTCPTX.get(`/Tourism/ScenicSpot/${county}`);
          data = response.data;
        } else {
          //Temp data
          data = locations;
        }
        return formatDataIdAndName(
          getDataById(attractionId, " scenicSpot", data)
        );
      }
    } catch (e) {
      console.log("error", e);
      return {};
    }
  }
);
