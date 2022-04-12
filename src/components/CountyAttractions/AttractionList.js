import CountyAttraction from "./CountyAttraction";
import MoreButton from "../UI/Button/More";
import classes from "./AttractionList.module.css";
import NotFound from "../NotFound";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttractions as fetchCountyAttractions } from "../../store/actions/countyAttractions";
import { useParams } from "react-router-dom";
import { useCallback } from "react";

const CountyAttractionList = ({ data }) => {
  const dispatch = useDispatch();
  const isFetchALLAttractions = useSelector(
    (state) => state.countyAttractions.isFetchAll
  );
  const fetchDataError = useSelector((state) => state.countyAttractions.error);
  const isLoadingData = useSelector(
    (state) => state.countyAttractions.isLoading
  );
  const { county } = useParams();

  const _getMoreAttractions = useCallback(() => {
    dispatch(fetchCountyAttractions(county));
  }, [county]);

  const _renderButtonOrLoading = () => {
    if (isLoadingData) {
      return <div className={classes.isLoading}>載入中...</div>;
    } else if (!isFetchALLAttractions) {
      return (
        <div className={classes.button}>
          <MoreButton onClick={_getMoreAttractions} />
        </div>
      );
    }
  };
  const _renderContent = () => {
    if (fetchDataError) {
      return (
        <p className={classes.errorInfor}>
          內部發生錯誤，稍待片刻再重新整理或洽詢管理員。
        </p>
      );
    } else if (data && data?.length === 0 && isFetchALLAttractions) {
      return (
        <div className={classes.notFound}>
          <NotFound />
        </div>
      );
    }
    return (
      <>
        {data.map(
          ({
            ScenicSpotName: name,
            OpenTime: openTime,
            Picture: picture,
            Address: address,
            ScenicSpotID: spotID,
            TicketInfo: ticketInfo,
          }) => (
            <CountyAttraction
              key={spotID}
              name={name}
              spotID={spotID}
              pictureURL={picture.PictureUrl1}
              pictureAlt={picture.PictureDescription1}
              address={address}
              openTime={openTime}
              ticketInfo={ticketInfo}
            />
          )
        )}

        {_renderButtonOrLoading()}
      </>
    );
  };

  return <div className={classes.attractionList}>{_renderContent()}</div>;
};

export default CountyAttractionList;
