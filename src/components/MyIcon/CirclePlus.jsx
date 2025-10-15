import React from "react";

export function CiclePlus(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="currentColor"
        d="M26.17 17H19V9.83a1 1 0 0 0-2 0V17H9.83a1 1 0 0 0 0 2H17v7.17a1 1 0 0 0 2 0V19h7.17a1 1 0 0 0 0-2"
        className="clr-i-outline clr-i-outline-path-1"
      ></path>
      <path
        fill="currentColor"
        d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m0 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14"
        className="clr-i-outline clr-i-outline-path-2"
      ></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  );
}
