import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";
import { useProfession } from "../../../hooks/useProfession";

const UserPage = ({ id }) => {
  const { getUserById } = useUser();
  const { isLoading: professionLoading } = useProfession();

  const user = getUserById(id);

  const handleToList = () => {
    const history = useHistory();
    history.push("/users");
  };

  if (user && !professionLoading) {
    return (
      <div className="container my-4">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard
              name={user.name}
              professionId={user.profession}
              rate={user.rate}
              id={id}
              image={user.image}
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
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
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
