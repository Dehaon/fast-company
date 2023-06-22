import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById } from "../../store/professions";

const Profession = ({ id }) => {
  const profession = useSelector(getProfessionById(id));

  // if (!isLoading) {
  return <p>{profession.name}</p>;
  // } else return "Loading...";
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
