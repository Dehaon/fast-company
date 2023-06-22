import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getProfessionById } from "../../store/professions";
import { useSelector } from "react-redux";

const UserCard = ({ name, professionId, rate, id, image }) => {
  // history.push(history.location.pathname + "edit")

  const { currentUser } = useAuth();

  const { name: professionName } = useSelector(getProfessionById(professionId));
  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUser._id === id && (
          <Link to={`/users/${id}/edit`}>
            <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
              <i className="bi bi-gear"></i>
            </button>
          </Link>
        )}
        <div className="d-flex flex-columb align-items-center text-center position-relative">
          <img
            src={image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="65"
            height="65"
          />
          <div className="mt-3">
            <h4>{name}</h4>
            <p className="text-secondary mb-1">{professionName}</p>
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
  professionId: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string
};

export default UserCard;
