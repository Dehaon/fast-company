import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getProfessionsLoadingStatus } from "../../../store/professions";
import { getUserById } from "../../../store/users";
import BackHistoryButton from "../../common/backButton";

const UserPage = ({ id }) => {
  const user = useSelector(getUserById(id));
  const professionLoading = useSelector(getProfessionsLoadingStatus());

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
              <BackHistoryButton
                styles="btn btn-primary px-4 me-md-2 fw-bold"
                title="Вернуться к списку"
                page="/users"
              />
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
