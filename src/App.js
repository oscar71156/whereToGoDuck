import React, { useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import FrontPage from "./components/Front/FrontPage";
import CountyAttractions from "./components/CountyAttractions/CountyAttractions";
import CountyAttraction from "./components/CountyAttraction/CountyAttraction";
import NearbyModalContext from "./contexts/NearbyModalContext";
import NearbySpotModalContext from "./contexts/NearbySpotModalContext";

import Footer from "./components/Footer";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  const [isShowNearby, setIsShowNearby] = useState(false);
  const [isShowNearbySpot, setIsShowNearbySpot] = useState(false);

  return (
    <NearbyModalContext.Provider
      value={{
        isShow: isShowNearby,
        toggle: (isShow) => {
          setIsShowNearby(isShow);
        },
      }}
    >
      <NearbySpotModalContext.Provider
        value={{
          isShow: isShowNearbySpot,
          toggle: (isShow) => {
            setIsShowNearbySpot(isShow);
          },
        }}
      >
        <div className={styles.App}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header />
            <Route path="/" component={
              FrontPage} exact />
            <Route path="/:county" component={CountyAttractions} exact />
            <Route
              path={[
                "/:county/:attraction",
                "/:county/:attraction/nearby/:nearbyType",
                "/:county/:attraction/nearby/:nearbyType/:nearbySpot",
              ]}
              component={CountyAttraction}
              exact
            />
            <Footer />
          </BrowserRouter>
        </div>
      </NearbySpotModalContext.Provider>
    </NearbyModalContext.Provider>
  );
};

//nearbyType
////scenicSpot,restaurant,hotel

export default App;
