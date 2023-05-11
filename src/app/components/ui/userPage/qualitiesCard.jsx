import React from "react";
import PropTypes from "prop-types";

const QualitiesCard = ({ children }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-centr text-center">
        <h5 className="card-title">
          <span>Качества: </span>{" "}
        </h5>
        <p className="card-text">{children}</p>
      </div>
    </div>
  );
};

QualitiesCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default QualitiesCard;
