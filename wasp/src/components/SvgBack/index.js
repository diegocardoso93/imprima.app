import React from 'react';

export default function SvgBack() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0 0H16V16H0z" transform="matrix(1 0 0 -1 0 16)"></path>
        <path
          fill="#444"
          fillRule="nonzero"
          d="M7.631 1.333L6.368 0 0 6.667 6.368 13.333 7.631 12.001 3.428 7.6 13.333 7.601 13.333 5.743 3.418 5.742z"
          transform="matrix(1 0 0 -1 0 16) translate(1.333 1.333)"
        ></path>
      </g>
    </svg>
  );
}
