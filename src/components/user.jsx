import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({
  onDeleteUser,
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onUserBookmarkIconClick,
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

export default User;
