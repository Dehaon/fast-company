import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import api from "../../../api";
import validation from "../../../utils/validation";
import TextArea from "../../common/form/textArea";

const AddCommentForm = ({ onSubmit, pageId }) => {
  const [users, setUsers] = useState();
  const initialObject = {
    userId: "",
    pageId,
    content: ""
  };
  const [comment, setComment] = useState(initialObject);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      const usersList = data.map((user) => ({
        label: user.name,
        value: user._id
      }));
      setUsers(usersList);
    });
  }, []);

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
    console.log(comment);
    setComment(initialObject);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Новый комментарий</h2>
      <SelectField
        name="userId"
        value={comment.userId}
        onChange={handleChange}
        defaultOption="Выберете пользователя"
        options={users}
        error={errors.userId}
      />
      <TextArea
        name="content"
        value={comment.content}
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
  onSubmit: PropTypes.func,
  pageId: PropTypes.string
};

export default AddCommentForm;
