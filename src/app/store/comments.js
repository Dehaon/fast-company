import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

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
      const comment = {
        ...action.payload,
        _id: nanoid(),
        pageId: userId,
        created_at: Date.now(),
        userId: currentUserId
      };
      const comments = [...state.entities, comment];
      state.entities = comments;
    },
    deletedComment: (state, action) => {
      const comments = state.entities.filter(
        (comment) => comment._id !== action.payload
      );
      state.entities = comments;
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  deletedComment
} = actions;

const removeCommentReqest = createAction("comments/removeCommentReqest");
const removeCommentReqestFailed = createAction(
  "comments/removeCommentReqestFailed"
);

export const loadCommentsList = (pageId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(pageId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment = () => async (dispatch) => {
  const comment = {
    ...data,
    _id: nanoid(),
    pageId: userId,
    created_at: Date.now(),
    userId: currentUserId
  };
  // console.log(comment);

  try {
    const { content } = await commentService.createComment(comment);
    setComments((prevState) => [...prevState, content]);
    dispatch();
    //   console.log(content);
  } catch (error) {
    dispatch(error);
  }
};
export const removeComment = (commentId) => async (dispatch) => {
  dispatch(removeCommentReqest());
  try {
    const { content } = await commentService.removeComment(commentId);
    //   console.log(content);
    if (content === null) {
      dispatch(deletedComment(content));
      dispatch();
    }
  } catch (error) {
    dispatch(removeCommentReqestFailed());
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
