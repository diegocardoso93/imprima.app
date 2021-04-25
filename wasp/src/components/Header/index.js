import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function Header({ children, stackclose }) {
  const dispose = () => {
    history.go(stackclose);
    parent.postMessage({ active: false }, '*');
  };

  return (
    <div className="header">
      {children}
      {/* <div className="close" onClick={dispose}>
        ×
      </div> */}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.any,
  stackclose: PropTypes.any,
};
