import React from 'react';
import Modal from 'react-modal';

import './style.scss';

const customStyles = {
  content: {
    border: 'none',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const SprintSettings = ({ closeModal, openModal = true }) => {
  return (
    <Modal
      onRequestClose={closeModal}
      isOpen={openModal}
      style={customStyles}
      ariaHideApp={false}
      over
    >
      <div className='sprint-settings'>
        <h3>Complete sprint: Mc Sprint 3</h3>
        <div className='sprint-settings__info'>
          <h6>
            <strong>21</strong> issues were done
          </h6>
          <h6>
            <strong>11</strong> issues were incomplete
          </h6>
        </div>
        <div className='sprint-settings__form'>
          <h6>Select where all the incomplete issues should be moved:</h6>
          <div className='sprint-settings__select-div'>
            <label>Move to</label>
            <select>
              <option value=''>New sprint</option>
            </select>
          </div>
          <span>
            Sub-tasks are not included in the total above, and are always
            included in the same sprint as their parent issue.
          </span>
        </div>
        <div className='sprint-settings__buttons'>
          <button>Complete</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default SprintSettings;
