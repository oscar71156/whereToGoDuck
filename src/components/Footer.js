import classes from "./Footer.module.css";
import { useLocation } from "react-router-dom";
const Footer = () => {
  const { pathname } = useLocation();
  return (
    <footer className={classes.footer}>
      {pathname === "/" && (
        <div className={classes.aboutUs}>
          <h4>關於我們</h4>
          <p>立志成為幫忙發現台灣之美的眼睛</p>
          <p className={classes.findNext}>幫你找出下一個旅遊景點</p>
        </div>
      )}
      <p className={classes.copyright}>
        &copy; Copyright 2021 by 要去哪裡鴨. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
