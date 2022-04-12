import React from "react";
import classes from "./Small.module.css";

const SmallButton = ({ buttonText, onClick, isActive = false }) => {
  return (
    <button
      className={`${classes.smallButton} ${isActive ? classes.active : ""}`}
      onClick={onClick}
    >
      <span>{buttonText}</span>
    </button>
  );
};

export default SmallButton;
