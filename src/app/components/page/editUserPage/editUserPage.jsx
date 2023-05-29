import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import validation from "../../../utils/validation";

const EditUserPage = ({ id }) => {
  const [user, setUser] = useState();
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    api.users.getById(id).then((data) => {
      const { profession, qualities } = data;
      const editedUserData = {
        ...data,
        profession: profession._id,
        qualities: qualities.map((qualityName) => ({
          label: qualityName.name,
          value: qualityName._id,
          color: qualityName.color
        }))
      };
      setUser(editedUserData);
    });
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((qualityName) => ({
        label: data[qualityName].name,
        value: data[qualityName]._id,
        color: data[qualityName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const validate = () => {
    const { validator, validatorConfig } = validation;
    const errors = validator(user, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [user]);

  const handleChange = (target) => {
    setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const { profession, qualities } = user;
    const editedUser = {
      ...user,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    };
    console.log(editedUser);
    api.users.update(id, editedUser);
    history.push(`/users/${id}`);
  };

  function getProfessionById(id) {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  }

  function getQualities(elements) {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality of qualities) {
        if (elem.value === quality.value) {
          qualitiesArray.push({
            _id: quality.value,
            name: quality.label,
            color: quality.color
          });
        }
      }
    }
    return qualitiesArray;
  }

  if (user && professions && qualities) {
    return (
      <div className="container my-4">
        <div></div>
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-0 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={user.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                name="profession"
                value={user.profession}
                onChange={handleChange}
                label="Выберете вашу профессию"
                defaultOption="Выберете..."
                options={professions}
                error={errors.profession}
              />
              <RadioField
                name="sex"
                value={user.sex}
                onChange={handleChange}
                label="Выберете ваш пол:"
                options={[
                  { name: "Мужчина", value: "male" },
                  { name: "Женщина", value: "female" },
                  { name: "Другое", value: "other" }
                ]}
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={user.qualities}
                name="qualities"
                label="Выберете ваши качества"
              />
              <div className="d-grid gap-2 d-md-flex justigy-content-md-start mb-4 mb-lg-3">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
                >
                  Обновить
                </button>
                <button
                  className="btn btn-secondary btn-lg px-4 me-md-2 fw-bold"
                  onClick={() => history.push(`/users/${id}`)}
                >
                  Назад
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return "loading...";
  }
};

EditUserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default EditUserPage;
