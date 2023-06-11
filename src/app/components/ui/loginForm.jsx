import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import validation from "../../utils/validation";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const { signIn } = useAuth();
  const history = useHistory();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const { validator, validatorConfig } = validation;
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    // eslint-disable-next-line no-useless-return
    if (!isValid) return;
    // const newData = { email: data.email, password: data.password };

    try {
      await signIn(data);
      history.push("/");
    } catch (error) {
      setErrors(error);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
