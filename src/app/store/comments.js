import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    createdComment: (state, action) => {
      state.entities.push(action.payload);
    },
    removedComment: (state, action) => {
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      );
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  createdComment,
  removedComment
} = actions;

const addCommentRequested = createAction("comments/addCommentRequested");
const removeCommentReqest = createAction("comments/removeCommentReqest");

export const loadCommentsList = (pageId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(pageId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment = (payload) => async (dispatch, getState) => {
  const comment = {
    ...payload,
    _id: nanoid(),
    created_at: Date.now(),
    userId: getCurrentUserId()(getState())
  };
  dispatch(addCommentRequested(payload));
  try {
    const { content } = await commentService.createComment(comment);
    dispatch(createdComment(content));
    // console.log(content);
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const removeComment = (commentId) => async (dispatch) => {
  dispatch(removeCommentReqest());
  try {
    const { content } = await commentService.removeComment(commentId);
    if (content === null) {
      dispatch(removedComment(commentId));
    }
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
