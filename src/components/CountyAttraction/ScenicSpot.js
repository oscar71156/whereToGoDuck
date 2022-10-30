import classes from "./ScenicSpot.module.css";
import BackButton from "../UI/Button/Back";
import { Pen, Money, OpenTime, Location, Phone } from "../../assets/icons";
import imageNotFoundURL from "../../assets/icons/imageNotFound.svg";

import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const ScenicSpot = ({ attraction }) => {
  const history = useHistory();
  const [isExistingPicture, setIsExistingPicture] = useState(false);

  useEffect(() => {
    if (attraction.Picture && attraction.Picture.PictureUrl1) {
      setIsExistingPicture(true);
    } else {
      setIsExistingPicture(false);
    }
  }, [attraction.Picture]);
  return (
    <div className={classes.scenicSpot}>
      <div className={classes.pictureAndContent}>
        <div className={classes.backButton}>
          <BackButton
            onClick={() => {
              history.goBack();
            }}
          />
        </div>
        <div className={classes.image}>
          <img
            className={`${
              isExistingPicture ? classes.imageExist : classes.imageInexist
            }`}
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
            onError={(e) => {
              e.target.src = imageNotFoundURL;
              setIsExistingPicture(false);
            }}
          />
        </div>

        <div className={classes.content}>
          <h5>{attraction.name}</h5>
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
            <span className={classes.text} dangerouslySetInnerHTML={{__html:attraction.Remarks}}/>
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
