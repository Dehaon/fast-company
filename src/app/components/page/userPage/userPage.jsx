import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { Link, useHistory } from "react-router-dom";
import QualitiesList from "../../ui/qualities/qualitiesList";

const UserPage = ({ id }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  //   console.log(id);

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  const handleToList = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <div className="container my-4">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-0 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1>{user.name}</h1>
            <h2>
              <QualitiesList qualities={user.qualities} />
            </h2>
            <h3>{`Профессия: ${user.profession.name}`}</h3>
            <h4>{`Встреч: ${user.completedMeetings}`}</h4>
            <h5>{`Рейтинг: ${user.rate}`}</h5>
            <div className="d-grid gap-2 d-md-flex justigy-content-md-start mb-4 mb-lg-3">
              <Link
                className="btn btn-primary px-4 me-md-2 fw-bold"
                to={`/users/${id}/edit`}
                role="button"
              >
                Изменить пользователя
              </Link>
              <button
                className="btn btn-primary px-4 me-md-2 fw-bold"
                onClick={() => handleToList()}
              >
                Вернуться к списку
              </button>
            </div>
          </div>
          {/* container for img
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img className="rounded-lg-3" src="#" alt="img" width="720" />
          </div> */}
        </div>
      </div>
    );
  }
  return "loading...";
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
