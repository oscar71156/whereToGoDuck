import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


import { fetchNearbyAttractions } from "../../store/actions/countyAttractions";
import NearbySpotModalContext from "../../contexts/NearbySpotModalContext";

import NearbyAttraction from "./NearbyAttraction";
import MoreButton from "../UI/Button/More";
import NotFound from "../NotFound";
import NearbySpotModal from "../NearbySpot/NearbySpot";

import classes from "./NearbyList.module.css";



const NearbyList = () => {
  const { isShow: isShowNearbySpot, toggle: toggleNearbySpot } = useContext(
    NearbySpotModalContext
  );
  const dispatch = useDispatch();
  const attractions = useSelector((state) => state.countyAttractions.data);
  const centerAttraction = useSelector(
    (state) => state.displayedAttraction.data
  );
  const isFetchAll = useSelector((state) => state.countyAttractions.isFetchAll);
  const fetchingDataError = useSelector(
    (state) => state.countyAttractions.error
  );
  const isLoadingData = useSelector(
    (state) => state.countyAttractions.isLoading
  );

  const { nearbyType, county, attraction, nearbySpot } = useParams();

  const handleMore = () => {
    dispatch(fetchNearbyAttractions({ nearbyType, isNewNearbyType: false }));
  };

  useEffect(() => {
    if (attractions && nearbyType && county && attraction && nearbySpot) {
      toggleNearbySpot(true);
    } else if (nearbyType && county && attraction && !nearbySpot) {
      toggleNearbySpot(false);
    }
  }, [attractions, nearbyType, county, attraction, nearbySpot]);

  useEffect(() => {
    if (centerAttraction) {
      dispatch(fetchNearbyAttractions({ nearbyType, isNewNearbyType: true }));
    }
  }, [nearbyType, centerAttraction]);

  const _mapFun = useCallback(
    (attraction) => {
      switch (nearbyType) {
        case "hotel":
          return (
            <NearbyAttraction
              key={attraction.id}
              address={attraction.Address}
              name={attraction.name}
              phone={attraction.Phone}
              pictureAlt={attraction.Picture.PictureDescription1}
              pictureURL={attraction.Picture.PictureUrl1}
              distance={1}
              spotID={attraction.id}
            />
          );
        case "restaurant":
          return (
            <NearbyAttraction
              key={attraction.id}
              address={attraction.Address}
              name={attraction.name}
              phone={attraction.Phone}
              openTime={attraction.OpenTime}
              pictureAlt={attraction.Picture.PictureDescription1}
              pictureURL={attraction.Picture.PictureUrl1}
              distance={1}
              spotID={attraction.id}
            />
          );
        case "scenicSpot":
        default:
          return (
            <NearbyAttraction
              key={attraction.id}
              name={attraction.name}
              ticketInfo={attraction.TicketInfo}
              spotID={attraction.id}
              pictureAlt={attraction.Picture.PictureDescription1}
              pictureURL={attraction.Picture.PictureUrl1}
              address={attraction.Address}
              openTime={attraction.OpenTime}
              distance={1}
            />
          );
      }
    },
    [attractions]
  );

  const _renderContent = () => {
    if (fetchingDataError) {
      return (
        <p className={classes.error}>
          內部發生錯誤，稍待片刻再重新整理或洽詢管理員。
        </p>
      );
    } else if (attractions?.length === 0 && isFetchAll) {
      //當載入更多，全部抓完時isFetchAll=>true
      //藉由attractions?.length === 0判斷是否真的完全沒資料
      return <NotFound />;
    }

    return (
      <>
        {attractions.map(_mapFun)}
        {isLoadingData && <p className={classes.loading}>載入中...</p>}
        {!isFetchAll && !isLoadingData && (
          <div className={classes.button}>
            <MoreButton onClick={handleMore} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className={classes.nearbyList}>
      {_renderContent()}
      {isShowNearbySpot && <NearbySpotModal />}
    </div>
  );
};

export default NearbyList;
