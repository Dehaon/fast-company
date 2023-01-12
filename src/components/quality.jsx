import React from "react";

const Quality = ({ color, name }) => {
  return <span className={`badge bg-${color}`}>{name}</span>;
};

export default Quality;
