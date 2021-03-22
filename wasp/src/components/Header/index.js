import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function Header({ children }) {
  const dispose = () => {
    history.go(-1);
    parent.postMessage({ active: false }, '*');
  };

  return (
    <div className="header">
      {children}
      <div className="close" onClick={dispose}>
        ×
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.any,
};
