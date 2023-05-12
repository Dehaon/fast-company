import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  //   console.log(id);
  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  const handleToList = () => {
    const history = useHistory();
    history.push("/users");
  };

  if (user) {
    return (
      <div className="container my-4">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard
              name={user.name}
              profession={user.profession.name}
              rate={user.rate}
              id={id}
            />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard meetings={user.completedMeetings} />
            <div className="d-grid gap-2 d-md-flex justigy-content-md-start mb-4 mb-lg-3">
              <button
                className="btn btn-primary px-4 me-md-2 fw-bold"
                onClick={() => handleToList()}
              >
                Вернуться к списку
              </button>
            </div>
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
      </div>
    );
  } else {
    return "loading...";
  }
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
