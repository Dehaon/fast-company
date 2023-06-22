import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
    // lastFetch: null
  },
  reducers: {
    professionsRequsted: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      //   state.lastFetch = Date.now();
    },
    professionsRequstFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsRequsted, professionsReceived, professionsRequstFailed } =
  actions;

// function isOutdated(date) {
//     if (Date.now() - date > 600000) {
//       return true;
//     } else {
//       return false;
//     }
//   }

export const loadProfessionsList = () => async (dispatch) => {
  dispatch(professionsRequsted());
  try {
    const { content } = await professionService.get();
    dispatch(professionsReceived(content));
  } catch (error) {
    dispatch(professionsRequstFailed(error.message));
  }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading;
export const getProfessionById = (id) => (state) =>
  state.professions.entities.find((prof) => prof._id === id);

export default professionsReducer;
