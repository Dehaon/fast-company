import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
  const { userId } = useParams();
  const { edit } = useParams();
  return edit && userId ? (
    <EditUserPage id={userId} />
  ) : userId ? (
    <UserPage id={userId} />
  ) : (
    <UsersListPage />
  );
};

export default Users;
