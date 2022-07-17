import React, { useEffect } from "react";

const Modal = ({ showModal, setShowModal, modalHeader = "", modalBody, dataSet }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log({ dataSet });
  }, [dataSet]);

  const header = () => {
    if (modalHeader) {
      return <h2>{modalHeader}</h2>;
    }
    return "";
  };

  return (
    <div className={showModal ? "customModal show" : "customModal"}>
      <div className="modalContainer">
        <div className="modalHeader">
          {header()}
          <a
            className="close"
            href="javascript:void(0)"
            onClick={(e) => {
              handleClose();
            }}
          >
            &times;
          </a>
        </div>
        <div className="modalBody">{modalBody}</div>
      </div>
    </div>
  );
};

export default Modal;
