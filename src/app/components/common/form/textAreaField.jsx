import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error, rows }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <textarea
        name={name}
        id={name}
        value={value}
        rows={rows}
        label={label}
        onChange={handleChange}
        className={getInputClasses()}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaField.defaultProps = {
  rows: "3"
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  rows: PropTypes.string
};

export default TextAreaField;
