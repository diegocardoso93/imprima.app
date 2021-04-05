import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Body({ children }) {
  return <div className="body">{children}</div>;
}

Body.propTypes = {
  children: PropTypes.any,
};
