import React from 'react';
import PropTypes from 'prop-types';

export default function SvgMore({ size }) {
  return (
    <svg
      width="23"
      height="39"
      viewBox="0 0 23 39"
      style={{
        transform: `scale(${size === 'small' ? '1' : '0.8'})`,
        fill: '#444',
      }}
    >
      <path
        className="slideshow-arrow"
        d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z"
        transform="translate(-855 -230)"
      ></path>
    </svg>
  );
}

SvgMore.propTypes = {
  size: PropTypes.string,
};
