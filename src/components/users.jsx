import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({
  users: allUsers,
  onDeleteButtonClick,
  onBookmarkIconClick
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 4;

  useEffect(() => {
    console.log("send request");
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    // console.log(params);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const filtredUsers = selectedProf
    ? allUsers.filter((user) => user.profession === selectedProf)
    : allUsers;

  const count = filtredUsers.length;

  const usersCrop = paginate(filtredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            selectedItem={selectedProf}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus numberOfGuests={count} />
        {count > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {usersCrop.map((user) => {
                return (
                  <User
                    key={user._id}
                    {...user}
                    onDeleteUser={onDeleteButtonClick}
                    onUserBookmarkIconClick={onBookmarkIconClick}
                  />
                );
              })}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onBookmarkIconClick: PropTypes.func.isRequired
};

export default Users;
