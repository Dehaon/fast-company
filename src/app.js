import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api/index";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  //   console.log(users);

  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => user._id !== userId);
    setUsers(newUsers);
  };

  const handleToggleBookmark = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
        return user;
      }
      return user;
    });
    setUsers(newUsers);
  };

  if (users.length === 0) return <SearchStatus numberOfGuests={users.length} />;

  return (
    <>
      <SearchStatus numberOfGuests={users.length} />

      <Users
        users={users}
        onDeleteButtonClick={handleDelete}
        onBookmarkIconClick={handleToggleBookmark}
      />
    </>
  );
}

export default App;
