import React from "react";
import { useParams } from "react-router-dom";
import User from "./user";
import UsersList from "./usersList";

const Users = () => {
  const { userId } = useParams();
  return userId ? <User id={userId} /> : <UsersList />;
};

export default Users;
