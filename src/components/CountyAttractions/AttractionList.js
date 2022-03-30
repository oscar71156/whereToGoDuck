import CountyAttraction from "./CountyAttraction";
import MoreButton from "../UI/Button/More";
import classes from "./AttractionList.module.css";
import NotFound from "../CountyAttractions/NotFound";
import { useDispatch,useSelector } from "react-redux";
import {fecthAttractions} from '../../store/actions/countyAttractions'
import { useParams } from "react-router-dom";

const CountyAttractionList = ({data}) => {

  const dispatch=useDispatch();
  const isFetchALLAttractions=useSelector((state)=>state.countyAttractions.isFetchAll);

  const {county}=useParams()
  const _renderContent = () => {

    if(!data){
      return (<div>loading</div>)
    }
    if (data && data?.length > 0) {
      return (
        <>
          {data.map(
            ({
              ScenicSpotName: name,
              OpenTime: openTime,
              Picture: picture,
              Address: address,
              ScenicSpotID: spotID,
              TicketInfo:ticketInfo
            }) => (
              <CountyAttraction
                key={spotID}
                name={name}
                spotID={spotID}
                pictureURL={picture.PictureUrl1}
                pictureAlt={picture.PictureDescription1}
                address={address}
                openTime={openTime}
                ticketInfo={ticketInfo}
              />
            )
          )}
          {!isFetchALLAttractions&&<div className={classes.button}>
            <MoreButton onClick={()=>{dispatch(fecthAttractions(county))}}/>
          </div>}
        </>
      );
    }

    return <NotFound/>;
  };

  return <div className={classes.attractionList}>{_renderContent()}</div>;
};

export default CountyAttractionList;
