import SmallButton from "../UI/Button/Small";
import classes from "./ButtonOptions.module.css";
import { useHistory, useParams } from "react-router-dom";

const ButtonOptions = () => {
  const history = useHistory();
  const { county, attraction, nearbyType } = useParams();

  const _changeAttractionType = (newType) => {
    history.replace(`/${county}/${attraction}/nearby/${newType}`);
  };

  return (
    <div className={classes.buttonOptions}>
      <SmallButton
        onClick={() => {
          _changeAttractionType("restaurant");
        }}
        isActive={nearbyType === "restaurant"}
        buttonText="餐飲"
      />
      <SmallButton
        onClick={() => {
          _changeAttractionType("scenicSpot");
        }}
        isActive={nearbyType === "scenicSpot"}
        buttonText="觀光景點"
      />
      <SmallButton
        onClick={() => {
          _changeAttractionType("hotel");
        }}
        isActive={nearbyType === "hotel"}
        buttonText="旅宿"
      />
    </div>
  );
};

export default ButtonOptions;
