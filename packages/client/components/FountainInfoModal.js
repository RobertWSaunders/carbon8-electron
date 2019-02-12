import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";

class FountainInfoModal extends Component {
  render() {
    const { modalOpen, handleModalClose } = this.props;

    return (
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleModalClose}
        ariaHideApp={false}
      >
        <button onClick={handleModalClose}>Close Modal</button>
      </Modal>
    );
  }
}

export default FountainInfoModal;
