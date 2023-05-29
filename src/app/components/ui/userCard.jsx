import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserCard = ({ name, profession, rate, id }) => {
  // history.push(history.location.pathname + "edit")
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link to={`/users/${id}/edit`}>
          <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
            <i className="bi bi-gear"></i>
          </button>
        </Link>
        <div className="d-flex flex-columb align-items-center text-center position-relative">
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
              Math.random() + 1
            )
              .toString(36)
              .substring(7)}.svg`}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="65"
            height="65"
          />
          <div className="mt-3">
            <h4>{name}</h4>
            <p className="text-secondary mb-1">{profession}</p>
            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button" />
              <i className="bi bi-caret-up text-secondary" role="button" />
              <span className="ms-2">{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export default UserCard;
