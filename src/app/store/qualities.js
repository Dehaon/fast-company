import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.lastFetch = Date.now();
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFailed } =
  actions;

function isOutdated(date) {
  if (Date.now() - date > 600000) {
    return true;
  } else {
    return false;
  }
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  //   console.log(lastFetch);
  if (isOutdated(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualityService.get();
      dispatch(qualitiesReceved(content));
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
  if (state.qualities.entities) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const qual of state.qualities.entities) {
        if (qualId === qual._id) {
          qualitiesArray.push(qual);
          break;
        }
      }
    }
    return qualitiesArray;
  }
  return [];
};

export default qualitiesReducer;
