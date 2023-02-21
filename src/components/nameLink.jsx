import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NameLink = ({ name, id }) => {
  return <Link to={`/users/${id}`}>{name}</Link>;
};

NameLink.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default NameLink;
