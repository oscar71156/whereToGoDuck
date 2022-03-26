import classes from './CountyAttractions.module.css';
import searchInputClasses from './SearchInput.module.css';
import SearchInput from '../SearchInput/SearchInput';
import CountyAttractionList from './AttractionList';
import county from '../../assets/county';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fecthInitAttractions } from '../../store/actions/countyAttractions';
import { changeInputCounty } from '../../store/actions/selectedCounty'; 
import { useParams } from 'react-router-dom';

const CountyAttractions=()=>{

    const countyAttractions=useSelector((state)=>state.countyAttractions.data);
    const isFetchALLAttractions=useSelector((state)=>state.countyAttractions.isFetchAll);
    const {county:countyParam}=useParams();


    const dispatch=useDispatch();


    useEffect(()=>{
        const findedCounty=county.find(({name})=>name===countyParam);
        document.title=`要去哪裡鴨${findedCounty?"-"+findedCounty.nameTW:""}`
    },[countyParam])

    //directly input
    useEffect(()=>{
        if(!countyAttractions&&!isFetchALLAttractions){
            dispatch(changeInputCounty(countyParam));
            dispatch(fecthInitAttractions(countyParam));
        }
    },[countyParam,countyAttractions,isFetchALLAttractions])

    return(
        <div className={classes.countyAttractions}>
            <SearchInput classes={searchInputClasses}/>
            <CountyAttractionList data={countyAttractions}/>
        </div>
    )
}

export default CountyAttractions;