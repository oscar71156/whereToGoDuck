import React, { useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import FrontPage from "./components/Front/FrontPage";
import CountyAttractions from "./components/CountyAttractions/CountyAttractions";
import CountyAttraction from "./components/CountyAttraction/CountyAttraction";
import NearbySpotModalContext from "./contexts/NearbySpotModalContext";
import NearbyModalContext from "./contexts/NearbyModalContext";

import Footer from "./components/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import county from "./assets/data/county";

const countyRegexStr = county.reduce(
  (acc, { name }, currentIndex, array) =>
    array.length === currentIndex + 1 ? acc + name : acc + name + "|",
  ""
);

const App = () => {
  const [isShowNearby, setIsShowNearby] = useState(false);
  const [isShowNearbySpot, setIsShowNearbySpot] = useState(false);

  return (
    <NearbyModalContext.Provider
      value={{
        isShow: isShowNearby,
        toggle: (isShow) => setIsShowNearby(isShow),
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
            <Route path="/" exact>
              <FrontPage />
            </Route>
            <Route path={`/:county(${countyRegexStr})`} exact>
              <CountyAttractions />
            </Route>
            <Route
              path={[
                "/:county/:attraction",
                "/:county/:attraction/nearby/:nearbyType(scenicSpot|hotel|restaurant)",
                "/:county/:attraction/nearby/:nearbyType(scenicSpot|hotel|restaurant)/:nearbySpot",
              ]}
              exact
            >
              <CountyAttraction />
            </Route>
            <Footer />
          </BrowserRouter>
        </div>
      </NearbySpotModalContext.Provider>
    </NearbyModalContext.Provider>
  );
};

export default App;
