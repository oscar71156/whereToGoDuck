import classes from './NearbyButton.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { changeCountyAttractionFrom } from '../../../store/actions/countyAttractions';
import NearbyModalContext from '../../../contexts/NearbyModalContext';

const NearbyButton=({attraction})=>{

    const history=useHistory();
    const { attraction: attractionId, county: selectedCounty,nearbyType } = useParams();

    const dispatch=useDispatch();


    const _handleClick=()=>{
        history.push(`/${selectedCounty}/${attractionId}/nearby/scenicSpot`);
        dispatch(changeCountyAttractionFrom(true));
    }
    return(
        <button className={classes.nearbyButton} onClick={_handleClick}>
            顯示附近景點
        </button>
    )
}
export default NearbyButton;