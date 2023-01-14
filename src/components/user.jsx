import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDeleteUser,
  onUserBookmarkIconClick
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{`${rate}/5`}</td>
      <td>
        <Bookmark
          id={_id}
          mark={bookmark}
          onToggleBookmark={onUserBookmarkIconClick}
        />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDeleteUser(_id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onUserBookmarkIconClick: PropTypes.func.isRequired
};

export default User;
