import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import validation from "../../../utils/validation";
import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setComment((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [comment]);

  const validate = () => {
    const { validator, validatorConfig } = validation;
    const errors = validator(comment, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(comment);
    clearForm();
  };

  function clearForm() {
    setComment({});
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Новый комментарий</h2>
      <TextAreaField
        name="content"
        value={comment.content || ""}
        rows="3"
        label="Сообщение"
        onChange={handleChange}
        error={errors.content}
      />
      <button type="submit" disabled={!isValid} className="btn btn-primary">
        Опубликовать
      </button>
    </form>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddCommentForm;
