import React, { useEffect, useContext, useState } from "react";
import NearbyList from "./NearbyList";
import Modal from "../UI/Modal/Modal";
import ButtonOptions from "./ButtonOptions";

import NearbyModalContext from "../../contexts/NearbyModalContext";
import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";

import NearbySpot from "../NearbySpot/NearbySpot";

import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import { fetchInitAttractions } from "../../store/actions/nearbyAttractions";
import classes from "./Nearby.module.css";

import CloseButton from "../UI/Button/Close";

const Nearby = ({centeredAttraction}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { nearbyType: nearbyTypeURL, county, attraction,nearbySpot } = useParams();

  const { toggle: toggleNearbyModal, isShow:isShowNearby } = useContext(NearbyModalContext);
  const {isShow:isShowNearbySpot}=useContext(NearbySpotModalContext);

  const attractions=useSelector((state)=>state.nearbyAttractions.data);
  const { pathname } = useLocation();

  const _handleCloseClick = () => {
    history.push(pathname.replace(`/nearby/${nearbyTypeURL}`, ""));
    toggleNearbyModal(false);
  };

  useEffect(()=>{
    if(isShowNearby){
      let nearbyTypeTW='觀光景點';
      switch(nearbyTypeURL){
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

  },[centeredAttraction,isShowNearby,nearbyTypeURL])

  //input url change
  useEffect(() => {
    if(!nearbySpot&&nearbyTypeURL&&!attractions){
      dispatch(fetchInitAttractions(attraction,nearbyTypeURL));
      const NEARBYTYPEPATH=`/${county}/${attraction}/nearby/${nearbyTypeURL}`
      history.push(NEARBYTYPEPATH);
    }
  }, [nearbyTypeURL,nearbySpot,attractions]);

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
