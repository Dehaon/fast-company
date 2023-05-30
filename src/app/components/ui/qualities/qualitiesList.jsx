import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQuality();
  if (isLoading) return "Loading...";
  return (
    <>
      {qualities.map((quality, index) => (
        <Quality key={index} id={quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
