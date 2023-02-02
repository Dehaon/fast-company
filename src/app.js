import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api/index";

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

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

  return (
    <>
      {users && (
        <Users
          users={users}
          onDeleteButtonClick={handleDelete}
          onBookmarkIconClick={handleToggleBookmark}
        />
      )}
    </>
  );
}

export default App;
