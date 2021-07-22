import React from 'react';

function ModalTab(props) {
  const {showModal, setsShowModal}= props;

  return (
    <>
    {showModal ? <div>Modal</div> : null}
    </>
  );
};

export default ModalTab;