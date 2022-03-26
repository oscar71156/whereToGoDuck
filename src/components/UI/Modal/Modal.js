import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className={classes.modal}>
        <div className={classes.content}>
            {children}
        </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
