import Attraction from "../Attraction/Attraction";
import { useHistory,useParams } from "react-router-dom";


const CountyAttraction=({name,spotID,pictureURL,pictureAlt,address,openTime,ticketInfo})=>{

    const history=useHistory();
    const {county}=useParams();

    const handleImgClick=()=>{
        history.push(`/${county}/${spotID}`);
    }
    return(
        <Attraction
                name={name}
                spotID={spotID}
                pictureURL={pictureURL}
                pictureAlt={pictureAlt}
                address={address}
                openTime={openTime}
                ticketInfo={ticketInfo}
                onImgClick={handleImgClick}
              />
    )
}

export default CountyAttraction;