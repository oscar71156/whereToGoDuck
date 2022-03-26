import Attraction from "../Attraction/Attraction";
import { useSelector } from "react-redux";
import { useHistory,useParams } from "react-router-dom";
import { useContext} from "react";
import nearbyModalContext from "../../contexts/NearbyModalContext";
import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";
const NearbyAttraction=({address,name,phone,openTime,pictureAlt,pictureURL,ticketInfo,spotID})=>{

    const history=useHistory();
    const {county,attraction,nearbyType}=useParams();

    const {toggle:toggleNearbyModal}=useContext(nearbyModalContext);
    const {toggle:toggleNearbySpotModal}=useContext(NearbySpotModalContext);

    const handleImgClick=()=>{
        if(nearbyType==='scenicSpot'){
            history.push(`/${county}/${spotID}`);
            toggleNearbyModal(false);
        }else{
            history.push(`/${county}/${attraction}/nearby/${nearbyType}/${spotID}`);
            toggleNearbySpotModal(true)
        }
    }
    
    return(
        <Attraction
            address={address}
            name={name}
            phone={phone}
            openTime={openTime}
            pictureAlt={pictureAlt}
            pictureURL={pictureURL}
            distance={1}
            ticketInfo={ticketInfo}
            onImgClick={handleImgClick}
          />
    )
}

export default NearbyAttraction;