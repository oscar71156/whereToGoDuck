import classes from "./ScenicSpot.module.css";
import BackButton from "../UI/Button/Back";
import { Pen, Money, OpenTime, Location, Phone } from "../../assets/icons";
import imageNotFoundURL from "../../assets/icons/imageNotFound.svg";

import { useHistory, useParams } from "react-router-dom";

const ScenicSpot = ({ attraction }) => {
  const history = useHistory();
  const { county } = useParams();

  // if (!attraction) {
  //   return <div>loading</div>;
  // }

  return (
    <div className={`${classes.scenicSpot} ${classes.deviceType}`}>
      <div className={classes.pictureAndContent}>
        <div className={classes.image}>
          <div className={classes.backButton}>
            <BackButton
              onClick={() => {
                history.replace(`/${county}`);
              }}
            />
          </div>
          <img
            src={
              attraction.Picture.PictureUrl1
                ? attraction.Picture.PictureUrl1
                : imageNotFoundURL
            }
            alt={
              attraction.Picture.PictureDescription1
                ? attraction.Picture.PictureDescription1
                : "no picture"
            }
          />
        </div>
        <div className={classes.content}>
          <h5>{attraction.ScenicSpotName}</h5>
          <div className={classes.item}>
            <span className={classes.icon}>
              <Location />
            </span>
            <span className={classes.text}>{attraction.Address}</span>
          </div>
          <div className={classes.item}>
            <span className={classes.icon}>
              <Phone />
            </span>
            <span className={classes.text}>{attraction.Phone}</span>
          </div>
          <div className={classes.item}>
            <span className={classes.icon}>
              <OpenTime />
            </span>
            <span className={classes.text}>{attraction.OpenTime}</span>
          </div>
          <div className={classes.item}>
            <span className={classes.icon}>
              <Money />
            </span>

            <span className={classes.text}>{attraction.TicketInfo}</span>
          </div>
          <div className={classes.item}>
            <span className={classes.icon}>
              <Pen />
            </span>
            <span className={classes.text}>{attraction.Remarks}</span>
          </div>
        </div>
      </div>

      <div className={classes.description}>
        <p>{attraction.Description}</p>
      </div>
    </div>
  );
};

export default ScenicSpot;
