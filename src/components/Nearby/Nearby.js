import React, { useEffect, useContext, useState } from "react";
import NearbyList from "./NearbyList";
import Modal from "../UI/Modal/Modal";
import ButtonOptions from "./ButtonOptions";

import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";

import NearbySpot from "../NearbySpot/NearbySpot";

import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import { fetchAttractions as fetchNearbyAttractions, restNearbyFetchingStatus } from "../../store/actions/nearbyAttractions";
import classes from "./Nearby.module.css";

import CloseButton from "../UI/Button/Close";
import NearbyModalContext from "../../contexts/NearbyModalContext";

const Nearby = ({centeredAttraction}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { nearbyType,nearbySpot } = useParams();

  const {isShow:isShowNearbySpot}=useContext(NearbySpotModalContext);
  const {toggle:toggleNearby}=useContext(NearbyModalContext)

  const centerAttractionNearby=useSelector((state)=>state.nearbyAttractions.centerAttraction);
  const { pathname } = useLocation();

  const _handleCloseClick = () => {
    history.push(pathname.replace(`/nearby/${nearbyType}`, ""));
    toggleNearby(false);
  };

  useEffect(()=>{
    if(centerAttractionNearby){
      let nearbyTypeTW='觀光景點';
      switch(nearbyType){
        case 'restaurant':
          nearbyTypeTW='餐飲';
          break;
        case 'hotel':
          nearbyTypeTW='旅宿';
          break;
        case 'scenicSpot':
        default:
          nearbyTypeTW='觀光景點'
          break;
      }
      document.title=`要去哪裡鴨${centeredAttraction?.ScenicSpotName?"-"+centeredAttraction.ScenicSpotName+"的附近"+nearbyTypeTW:""}`
    }

  },[centeredAttraction,centerAttractionNearby,nearbyType])

  useEffect(() => {

    // console.log('nearbyType',nearbyType,'nearbySpot',nearbySpot)
    if(!nearbySpot&&nearbyType){
      dispatch(restNearbyFetchingStatus());
      dispatch(fetchNearbyAttractions(nearbyType));
    }
  }, [nearbyType,nearbySpot]);

  return (
    <>
      <Modal>
        <div className={classes.nearby}>
          <div className={classes.header}>
            <h4>附近景點</h4>
            <CloseButton onClick={_handleCloseClick} />
          </div>
          <ButtonOptions />
          <NearbyList />
        </div>
      </Modal>
      {isShowNearbySpot&&<NearbySpot />}
      </>
  );
};

export default Nearby;
