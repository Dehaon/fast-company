import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, children, onChange, error }) => {
  const handleChange = () => {
    onChange({ name, value: !value });
  };

  const getInputClasses = () => {
    return "form-check-label" + (error ? " is-invalid" : "");
  };

  return (
    <div className="form-check mb-4">
      <input
        className="form-check-input"
        type="checkbox"
        checked={value}
        id={name}
        onChange={handleChange}
      />
      <label className={getInputClasses()} htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  error: PropTypes.string
};

export default CheckBoxField;
