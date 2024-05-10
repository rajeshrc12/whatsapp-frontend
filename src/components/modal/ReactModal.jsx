import React, { useState } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
};
const ReactModal = ({
  modal = false,
  setModal = () => {},
  content = <></>,
}) => {
  const closeModal = () => {
    setModal(false);
  };

  return (
    <Modal
      isOpen={modal}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      {content}
    </Modal>
  );
};

export default ReactModal;
