import SearchButton from '../UI/Button/Search';
import CountySelect from '../UI/Select/County';
import {useSelector, useDispatch} from 'react-redux';
import { changeInputCounty } from '../../store/actions/selectedCounty';
import { fecthInitAttractions} from '../../store/actions/countyAttractions'
import { useHistory,useParams } from 'react-router-dom';

const SearchInput=({classes})=>{

    const selectedCounty=useSelector((state)=>state.selectedCounty);
    const dispatch=useDispatch();
    const history=useHistory();
    const urlPathname=history.location.pathname;
    const {county:countyParam}=useParams();
    const handleSearch=(e)=>{
        e.preventDefault();
        history.push(countyParam?urlPathname.replace(countyParam,selectedCounty):'/'+selectedCounty);
        dispatch(fecthInitAttractions(selectedCounty));
    }
    return(
        <form onSubmit={handleSearch} className={classes.searchInput}>
            <div className={classes.select}>
                <CountySelect selectedCounty={selectedCounty} onSelected={(value)=>dispatch(changeInputCounty(value))}/>
            </div>
            <div className={classes.button}>
                <SearchButton onClick={handleSearch}/>
            </div>
        </form>
        
    )
}

export default SearchInput;