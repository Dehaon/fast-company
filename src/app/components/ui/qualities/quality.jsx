import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Quality = ({ id }) => {
  const { getQualityById } = useQuality();
  const { color, name } = getQualityById(id);

  return <span className={`badge bg-${color} me-1`}>{name}</span>;
};

Quality.propTypes = {
  id: PropTypes.string
};

export default Quality;
