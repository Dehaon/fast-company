import React from "react";
import PropTypes from "prop-types";

const RadionField = ({ label, options, name, onChange, value }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <p>
        <label className="form-label">{label}</label>
      </p>
      {options.map((option) => (
        <div key={option.value} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option.name + "_" + option.value}
            checked={option.value === value}
            value={option.value}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

RadionField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string
};

export default RadionField;
