import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import {
  setTokens,
  getAccessToken,
  removeAuthData
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [errors, setErrors] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);

      console.log(rest);

      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 300),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      });

      // console.log(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email существует"
          };
          throw errorObject;
        }
      }
      // throw new Error();
    }
  }

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      // console.log(data);

      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = {
            email: "Нет записи пользователя, соответствующей этому Email"
          };
          throw errorObject;
        } else if (message === "INVALID_PASSWORD") {
          const errorObject = {
            password: "Пароль недействителен"
          };
          throw errorObject;
        }
      }
      // throw new Error();
    }
  }

  function logOut() {
    removeAuthData();
    setCurrentUser(null);
    history.push("/");
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      console.log(content);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function updateUser(data) {
    try {
      const { content } = await userService.updateUser(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setErrors(message);
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (errors !== null) {
      toast(errors);
      setErrors(null);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, logOut, updateUser, currentUser }}
    >
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
