import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import NameLink from "./nameLink";

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookmark,
  onDelete
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <NameLink name={user.name} id={user._id} />
    },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          mark={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(user._id)}
        >
          Удалить
        </button>
      )
    }
  };
  return <Table {...{ selectedSort, onSort, columns, data: users }} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
