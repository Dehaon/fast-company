import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/reformDate";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({
  userId,
  created_at: createdTime,
  content,
  onDelete,
  _id: id
}) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);
  const { currentUser } = useAuth();

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {user.name || " "}{" "}
                    <span className="small">{displayDate(createdTime)}</span>
                  </p>
                  {currentUser._id === userId && (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onDelete(id)}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  userId: PropTypes.string,
  created_at: PropTypes.number,
  content: PropTypes.string,
  _id: PropTypes.string,
  onDelete: PropTypes.func
};

export default Comment;
