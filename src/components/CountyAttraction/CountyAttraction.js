import { useEffect, useContext } from "react";
import classes from "./CountyAttraction.module.css";
import NearbyButton from "../UI/Button/NearbyButton";
import Nearby from "../Nearby/Nearby";

import county from "../../assets/county";
import nearbyModalContext from "../../contexts/NearbyModalContext";
import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";

import ScenicSpot from "./ScenicSpot";

import { useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fecthInitAttractions } from "../../store/actions/countyAttractions";


const CountyScenicSpot = () => {
  const { attraction: attractionId, county: selectedCounty, nearbyType:nearbyTypeURL, nearbySpot:nearbySpotURL } = useParams();

  const { isShow: isShowNearby, toggle: toggleNearby }=useContext(nearbyModalContext);

  const {toggle:toggleNearbySpot}=useContext(NearbySpotModalContext);

  const dispatch = useDispatch();

  const attraction = useSelector((state) =>
    state.countyAttractions.data
      ? state.countyAttractions.data.find(
          ({ ScenicSpotID }) => ScenicSpotID === attractionId
        )
      : null
  );

  const isNotFoundAttraction=useSelector((state)=>state.countyAttractions.isFetchAll);

  const countyAttractions = useSelector(
    (state) => state.countyAttractions.data
  );

  useEffect(()=>{
    if(!isShowNearby){
      document.title=`要去哪裡鴨${attraction?'-'+attraction.ScenicSpotName:''}`
    }
  },[attraction,isShowNearby])


  //For input url directly
  useEffect(() => {
    if (!countyAttractions&&!isNotFoundAttraction) {
      dispatch(fecthInitAttractions(selectedCounty,attractionId));
    }
  }, [selectedCounty,isNotFoundAttraction]);
  
  //For input url directly => show nearbyModal or not
  useEffect(()=>{
    if(!nearbyTypeURL){
      toggleNearby(false);
    }else{
      toggleNearby(true);
    }
  },[nearbyTypeURL])


  useEffect(()=>{
    if(!nearbySpotURL){
      toggleNearbySpot(false);
    }else{
      toggleNearbySpot(true);
    }
  },[nearbySpotURL])
  


  return (
    <div className={classes.countyAttraction}>
      <ScenicSpot attraction={attraction} />
      <div className={classes.nearbyButton}>
        <NearbyButton/>
      </div>
      {isShowNearby && <Nearby centeredAttraction={attraction} close={() => toggleNearby(false)} />}
    </div>
  );
};

export default CountyScenicSpot;
