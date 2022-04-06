import Attraction from "../Attraction/Attraction";
import { useDispatch } from "react-redux";
import { useHistory,useParams } from "react-router-dom";
import { useContext} from "react";
import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";
import { clearCenterAttraction } from "../../store/actions/nearbyAttractions";
import NearbyModalContext from "../../contexts/NearbyModalContext";
const NearbyAttraction=({address,name,phone,openTime,pictureAlt,pictureURL,ticketInfo,spotID})=>{

    const history=useHistory();
    const dispatch=useDispatch();
    const {county,attraction,nearbyType}=useParams();

    const {toggle:toggleNearbySpotModal}=useContext(NearbySpotModalContext);
    const {toggle:toggleNearby}=useContext(NearbyModalContext);

    const handleImgClick=()=>{
        if(nearbyType==='scenicSpot'){
            history.push(`/${county}/${spotID}`);
            toggleNearby(false);
        }else{
            history.push(`/${county}/${attraction}/nearby/${nearbyType}/${spotID}`);
            toggleNearbySpotModal(true)
        }
        // history.push(`/${county}/${attraction}/nearby/${nearbyType}/${spotID}`);

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