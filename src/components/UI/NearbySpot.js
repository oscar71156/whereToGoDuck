import classes from "./NearbySpot.module.css";
import CloseButton from "./Button/Close";
import imageNotFoundURL from '../../assets/icons/imageNotFound.svg'
import { useParams, useHistory } from "react-router-dom";
import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";
import { useDispatch } from "react-redux";
import { useContext } from "react";

import { Pen,Location,Phone,OpenTime } from "../../assets/icons";

const NearbySpotTemplate = ({ name,pictureURL,pictureAlt,address,phone,openTime,description ,parkingInformation}) => {
  const { toggle: toggleNearbySpotModal } = useContext(NearbySpotModalContext);

  const dispatch = useDispatch();
  const {
    county,
    nearbySpot,
    nearbyType,
    attraction: centerAttractionID,
  } = useParams();
  const history = useHistory();
  const _handleCloseClick = () => {
    toggleNearbySpotModal(false);
    history.push(`/${county}/${centerAttractionID}/nearby/${nearbyType}`);
  };
  return (
    <div className={classes.nearbySpotTemplate}>
      <div className={classes.header}>
        <h4>{name}</h4>
        <CloseButton onClick={_handleCloseClick} />
      </div>
      <div className={classes.image}>
        <img
          src={
            pictureURL
              ?pictureURL
              : imageNotFoundURL
          }
          alt={
            pictureAlt
              ? pictureAlt
              : "no picture"
          }
        />
      </div>
      <div className={classes.content}>
          {address&&<div className={classes.item}>
            <span className={classes.icon}>
              <Location />
            </span>
            <span className={classes.text}>{address}</span>
          </div>}
          {phone&&<div className={classes.item}>
            <span className={classes.icon}>
              <Phone />
            </span>
            <span className={classes.text}>{phone}</span>
          </div>}
            {openTime&&<div className={classes.item}>
            <span className={classes.icon}>
              <OpenTime />
            </span>
            <span className={classes.text}>{openTime}</span>
          </div>}
          {parkingInformation&&<div className={classes.item}>
            <span className={classes.icon}>
              <Pen />
            </span>

            <span className={classes.text}>{parkingInformation}</span>
          </div>}
          {/* <div className={classes.item}>
            <span className={classes.icon}>
              <Pen />
            </span>
            <span className={classes.text}>{attraction.Remarks}</span>
          </div> */}
          {description&&<div className={classes.description}>
            <p>{description}</p>
          </div>  }
        </div>
    </div>
  );
};

export default NearbySpotTemplate;
