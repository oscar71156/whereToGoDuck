import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./NearbyList.module.css";

import NearbyAttraction from "./NearbyAttraction";
import MoreButton from "../UI/Button/More";
import NotFound from "../NotFound";

import { fetchAttractions as fetchNearbyAttractions } from "../../store/actions/nearbyAttractions";

const NearbyList = () => {
  const dispatch = useDispatch();
  const attractions = useSelector((state) => state.nearbyAttractions.data);
  const isFetchAll = useSelector((state) => state.nearbyAttractions.isFetchAll);
  const fetchingDataError = useSelector(
    (state) => state.nearbyAttractions.error
  );
  const isLoadingData = useSelector(
    (state) => state.nearbyAttractions.isLoading
  );

  const { nearbyType } = useParams();

  const handleMore = () => {
    dispatch(fetchNearbyAttractions(nearbyType));
  };

  const _mapFun = useCallback(
    (attraction) => {
      switch (nearbyType) {
        case "hotel":
          return (
            <NearbyAttraction
              key={attraction.HotelID}
              address={attraction.Address}
              name={attraction.HotelName}
              phone={attraction.Phone}
              pictureAlt={attraction.Picture.PictureDescription1}
              pictureURL={attraction.Picture.PictureUrl1}
              distance={1}
              spotID={attraction.HotelID}
            />
          );
        case "restaurant":
          return (
            <NearbyAttraction
              key={attraction.RestaurantID}
              address={attraction.Address}
              name={attraction.RestaurantName}
              phone={attraction.Phone}
              openTime={attraction.OpenTime}
              pictureAlt={attraction.Picture.PictureDescription1}
              pictureURL={attraction.Picture.PictureUrl1}
              distance={1}
              spotID={attraction.RestaurantID}
            />
          );
        case "scenicSpot":
        default:
          return (
            <NearbyAttraction
              key={attraction.ScenicSpotID}
              name={attraction.ScenicSpotName}
              ticketInfo={attraction.TicketInfo}
              spotID={attraction.ScenicSpotID}
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

  return <div className={classes.nearbyList}>{_renderContent()}</div>;
};

export default NearbyList;
