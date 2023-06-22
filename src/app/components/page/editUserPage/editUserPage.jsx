import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import validation from "../../../utils/validation";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
  getQualities,
  getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState();
  const { currentUser, updateUser } = useAuth();
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
    color: q.color
  }));

  useEffect(() => {
    if (!professionsLoading && !qualitiesLoading && currentUser && !user) {
      setUser({
        ...currentUser,
        qualities: findQuality(currentUser.qualities)
      });
    }
  }, [professionsLoading, qualitiesLoading, currentUser, user]);

  useEffect(() => {
    if (user && isLoading) {
      setIsLoading(false);
    }
  }, [user]);

  function findQuality(data) {
    const array = [];
    qualitiesList.forEach((quality) => {
      data.forEach((id) => {
        if (quality.value === id) {
          // console.log(quality);
          array.push(quality);
        }
      });
    });
    return array;
  }

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
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const editedUser = {
      ...user,
      qualities: user.qualities.map((quality) => quality.value)
    };
    updateUser(editedUser);
    history.push(`/users/${userId}`);
  };

  if (!isLoading && !professionsLoading && !qualitiesLoading) {
    return (
      <div className="container my-4">
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
                options={professionsList}
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
                options={qualitiesList}
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
                  onClick={() => history.goBack()}
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

export default EditUserPage;
