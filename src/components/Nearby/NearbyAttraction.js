import { useHistory, useParams } from "react-router-dom";
import { useContext, useCallback } from "react";

import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";
import NearbyModalContext from "../../contexts/NearbyModalContext";

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

  const { toggle: toggleNearbySpotModal } = useContext(NearbySpotModalContext);
  const { toggle: toggleNearby } = useContext(NearbyModalContext);

  const handleImgClick = useCallback(() => {
    if (nearbyType === "scenicSpot") {
      history.push(`/${county}/${spotID}`);
      toggleNearby(false);
    } else {
      history.push(`/${county}/${attraction}/nearby/${nearbyType}/${spotID}`);
      toggleNearbySpotModal(true);
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
