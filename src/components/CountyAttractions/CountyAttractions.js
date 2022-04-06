import classes from './CountyAttractions.module.css';
import searchInputClasses from './SearchInput.module.css';
import SearchInput from '../SearchInput/SearchInput';
import CountyAttractionList from './AttractionList';
import county from '../../assets/county';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAttractions as fetchCountyAttractions } from '../../store/actions/countyAttractions';
import { changeInputCounty } from '../../store/actions/selectedCounty'; 
import { useParams} from 'react-router-dom';
import { RESET_COUNTY } from '../../store/actions/types';

const CountyAttractions=()=>{

    const countyAttractions=useSelector((state)=>state.countyAttractions.data);
    const isFetchALLAttractions=useSelector((state)=>state.countyAttractions.isFetchAll);
    const fetchDataError=useSelector((state)=>state.countyAttractions.error);
    const {county:countyParam}=useParams();



    const dispatch=useDispatch();


    useEffect(()=>{
        const findedCounty=county.find(({name})=>name===countyParam);
        document.title=`要去哪裡鴨${findedCounty?"-"+findedCounty.nameTW:""}`
    },[countyParam]);




    useEffect(()=>{
       dispatch(changeInputCounty(countyParam))
    },[countyParam]);



    useEffect(()=>{
        if(!isFetchALLAttractions){
            dispatch({type:RESET_COUNTY});
            dispatch(fetchCountyAttractions(countyParam));
        }
    },[countyParam,isFetchALLAttractions])


    useEffect(()=>{
        if(isFetchALLAttractions&&!countyAttractions&&!fetchDataError){
            throw new Error('fetch all county attractions')
        }
    },[isFetchALLAttractions,countyAttractions,fetchDataError])

    return(
        <div className={classes.countyAttractions}>
            <div className={classes.countyAttractionsContent}>
                <SearchInput classes={searchInputClasses}/>
                <CountyAttractionList data={countyAttractions}/>
            </div>
        </div>
    )
}

export default CountyAttractions;