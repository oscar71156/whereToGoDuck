import classes from "./NearbySpotTemplate.module.css";
import imageNotFoundURL from "../../assets/icons/imageNotFound.svg";
import { Pen, Location, Phone, OpenTime } from "../../assets/icons";
import { useEffect, useState } from "react";

const NearbySpotTemplate = ({
  pictureURL,
  pictureAlt,
  address,
  phone,
  openTime,
  description,
  parkingInformation,
}) => {
  const [isExistingImage, setIsExistingImage] = useState(false);

  useEffect(() => {
    if (pictureURL) {
      setIsExistingImage(true);
    } else {
      setIsExistingImage(false);
    }
  }, [pictureURL]);
  return (
    <div className={classes.nearbySpotTemplate}>
      <div className={classes.image}>
        <img
          className={`${
            isExistingImage ? classes.existingImage : classes.inExistingImage
          }`}
          src={pictureURL ? pictureURL : imageNotFoundURL}
          alt={pictureAlt ? pictureAlt : "no picture"}
          onError={(e) => {
            setIsExistingImage(false);
            e.target.src = imageNotFoundURL;
          }}
        />
      </div>
      <div className={classes.content}>
        {address && (
          <div className={classes.item}>
            <span className={classes.icon}>
              <Location />
            </span>
            <span className={classes.text}>{address}</span>
          </div>
        )}
        {phone && (
          <div className={classes.item}>
            <span className={classes.icon}>
              <Phone />
            </span>
            <span className={classes.text}>{phone}</span>
          </div>
        )}
        {openTime && (
          <div className={classes.item}>
            <span className={classes.icon}>
              <OpenTime />
            </span>
            <span className={classes.text}>{openTime}</span>
          </div>
        )}
        {parkingInformation && (
          <div className={classes.item}>
            <span className={classes.icon}>
              <Pen />
            </span>

            <span className={classes.text}>{parkingInformation}</span>
          </div>
        )}
        {description && <p className={classes.description}>{description}</p>}
      </div>
    </div>
  );
};

export default NearbySpotTemplate;
