import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, options, name, onChange, value }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <p>
        <label className="form-label">{label}</label>
      </p>
      {options.map((option, index) => (
        <div key={option.value} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={index + "_" + option.value}
            checked={option.value === value}
            value={option.value}
            onChange={handleChange}
          />
          <label
            className="form-check-label"
            htmlFor={index + "_" + option.value}
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string
};

export default RadioField;
