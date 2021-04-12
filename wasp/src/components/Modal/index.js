import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Modal({ children, title, onClose, open, innerWidth }) {
  if (!open) {
    return <></>;
  }

  return (
    <div className="modal">
      <div className="modal-overlay" style={{ width: innerWidth + 80 }}></div>
      <div className="modal-options" style={{ width: innerWidth }}>
        <div className="motitle">
          <span className="motext">{title}</span>
          <span className="moclose" onClick={onClose}>
            ×
          </span>
        </div>
        <div className="modal-container">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  innerWidth: PropTypes.number,
};
