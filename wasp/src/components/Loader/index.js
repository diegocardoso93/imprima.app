import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Loader({ size }) {
  return (
    <div className={`lds-ring ${size}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.string,
};
