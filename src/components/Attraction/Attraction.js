import classes from "./Attraction.module.css";
import {
  Phone as IconPhone,
  OpenTime as IconOpenTime,
  Location as IconLocation,
  Money as IconMoney,
} from "../../assets/icons";


import imageNotFoundURL from "../../assets/icons/imageNotFound.svg";


const Attraction = ({
  name,
  address,
  openTime,
  ticketInfo,
  pictureURL,
  pictureAlt,
  distance,
  phone,
  onImgClick
}) => {


  return (
    <div className={classes.attraction}>
        <img
          src={pictureURL ? pictureURL : imageNotFoundURL}
          alt={pictureAlt ? pictureAlt : "No picture"}
          onError={(e) => {
            console.error("img error", e);
          }}
          onClick={onImgClick}
        />
      <div className={classes.information}>
        <h5>{name}</h5>

        {address && (
          <div className={classes.item}>
            <span className={classes.icon}>
              <IconLocation />
            </span>
            <span className={classes.text}>{address}</span>
          </div>
        )}
        {phone && (
          <div className={classes.item}>
            <span className={classes.icon}>
              <IconPhone />
            </span>
            <span className={`${classes.text} ${classes.short}`}>{phone}</span>
          </div>
        )}

        {openTime && (
          <div className={classes.item}>
            <span className={classes.icon}>
              <IconOpenTime />
            </span>
            <span className={`${classes.text} ${classes.short}`}>
              {openTime}
            </span>
          </div>
        )}
        {ticketInfo && (
          <div className={classes.item}>
            <span className={classes.icon}>
              <IconMoney />
            </span>
            <span className={`${classes.text} ${classes.short}`}>
              {ticketInfo}
            </span>
          </div>
        )}
        {distance && (
          <div className={classes.item}>
            <span>距離{distance}公里</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Attraction;
