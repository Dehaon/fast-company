import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfession = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    getProfessions();
  }, []);

  useEffect(() => {
    if (errors !== null) {
      toast(errors);
      setErrors(null);
    }
  }, [errors]);

  async function getProfessions() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function getProfessionById(id) {
    return professions.find((prof) => prof._id === id);
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setErrors(message);
  }

  return (
    <ProfessionContext.Provider
      value={{ professions, isLoading, getProfessionById }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
