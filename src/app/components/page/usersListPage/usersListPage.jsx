/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import Search from "../../ui/search";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;
  const [search, setSearch] = useState("");

  const { professions, isLoading: professionsLoading } = useProfession();
  const { users } = useUser();
  const { currentUser } = useAuth();
  // console.log(users);

  // const handleDelete = (userId) => {
  //   // const newUsers = users.filter((user) => user._id !== userId);
  //   // setUsers(newUsers);
  //   console.log(userId);
  // };

  const handleToggleBookmark = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
        return user;
      }
      return user;
    });
    // setUsers(newUsers);
    console.log(newUsers);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearch("");
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearchUsers = ({ target }) => {
    const { value } = target;
    setSearch(value);

    setSelectedProf();
  };

  if (users) {
    // let filtredUsers;
    // if (selectedProf) {
    //   filtredUsers = users.filter((user) =>
    //     _.isEqual(user.profession, selectedProf)
    //   );
    // } else if (search) {
    //   const searchRegExp = new RegExp(search.trim().toLowerCase());
    //   filtredUsers = users.filter((user) =>
    //     searchRegExp.test(user.name.toLowerCase())
    //   );
    // } else {
    //   filtredUsers = users;
    // }

    function filterUsers(data) {
      const filtredUsers = search
        ? data.filter(
            (user) =>
              user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
          )
        : selectedProf
        ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
        : data;
      return filtredUsers.filter((user) => user._id !== currentUser._id);
    }
    const filtredUsers = filterUsers(users);

    const count = filtredUsers.length;

    const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], sortBy.order);

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
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
        <div className="d-flex flex-column mt-3">
          <SearchStatus numberOfGuests={count} />
          <Search handleSearchUsers={handleSearchUsers} enteredText={search} />
          {count > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              // onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
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
  }
  return "loading...";
};

export default UsersListPage;
