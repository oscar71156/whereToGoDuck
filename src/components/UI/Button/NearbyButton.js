import classes from './NearbyButton.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useContext } from 'react';
import NearbyModalContext from '../../../contexts/NearbyModalContext';
import {
    fetchInitAttractions as fetchInitNearbyAttractions,
  } from "../../../store/actions/nearbyAttractions";

const NearbyButton=()=>{

    const history=useHistory();
    const { attraction: attractionId, county: selectedCounty,nearbyType } = useParams();

    const dispatch=useDispatch();

    const { toggle: toggleNearby }=useContext(NearbyModalContext);

    const _handleClick=()=>{
        dispatch(fetchInitNearbyAttractions(attractionId,nearbyType));
        toggleNearby(true);
        history.push(`/${selectedCounty}/${attractionId}/nearby/scenicSpot`)
    }
    return(
        <button className={classes.nearbyButton} onClick={_handleClick}>
            顯示附近景點
        </button>
    )
}
export default NearbyButton;