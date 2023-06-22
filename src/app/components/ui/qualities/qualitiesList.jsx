import React, { useEffect } from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  const isLoading = useSelector(getQualitiesLoadingStatus());

  if (isLoading) return "Loading...";
  const qualitiesList = useSelector(getQualitiesByIds(qualities));
  // console.log(qualitiesList);
  return (
    <>
      {qualitiesList.map((quality) => (
        <Quality key={quality._id} color={quality.color} name={quality.name} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
