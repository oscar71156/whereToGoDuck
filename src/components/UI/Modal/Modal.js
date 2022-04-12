import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import CloseButton from "../Button/Close";

const Modal = ({
  modalName,
  children,
  majorClasses = null,
  onClose,
  headerName,
}) => {
  const class_majorModal =
    majorClasses && modalName ? majorClasses[modalName] : "";
  const hearderClass_MajorModal = majorClasses?.header
    ? majorClasses.header
    : "";
  return ReactDOM.createPortal(
    <div className={classes.modalOverlay} onClick={onClose}>
      <div
        className={`${classes.modal} ${class_majorModal}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`${classes.header} ${hearderClass_MajorModal}`}>
          <h4>{headerName}</h4>
          <CloseButton onClick={onClose} />
        </div>
        <div className={classes.content}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
