import { useHistory, useParams } from "react-router-dom";
import { useCallback } from "react";

import Attraction from "../Attraction/Attraction";

const NearbyAttraction = ({
  address,
  name,
  phone,
  openTime,
  pictureAlt,
  pictureURL,
  ticketInfo,
  spotID,
}) => {
  const history = useHistory();
  const { county, attraction, nearbyType } = useParams();

  const handleImgClick = useCallback(() => {
    if (nearbyType === "scenicSpot") {
      history.push(`/${county}/${spotID}`);
    } else {
      history.push(`/${county}/${attraction}/nearby/${nearbyType}/${spotID}`);
    }
  }, [spotID, county, attraction, nearbyType]);

  return (
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
  );
};

export default NearbyAttraction;
