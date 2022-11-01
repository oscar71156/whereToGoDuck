import classes from "./Nearby.module.css";
import { useHistory, useLocation, useParams } from "react-router-dom";
const NearbyButton = () => {
  const history = useHistory();
  const { pathname: currentPathname } = useLocation();
  const { attraction: attractionId, county: selectedCounty } = useParams();

  const _handleClick = () => {
    history.push(`/${selectedCounty}/${attractionId}/nearby/scenicSpot`, {
      prePathname: currentPathname,
    });
  };

  return (
    <button className={classes.nearbyButton} onClick={_handleClick}>
      顯示附近景點
    </button>
  );
};
export default NearbyButton;
