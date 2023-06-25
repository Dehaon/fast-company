import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";

const Comments = () => {
  const dispatch = useDispatch();
  const { userId: pageId } = useParams();
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  useEffect(() => {
    dispatch(loadCommentsList(pageId));
  }, [pageId]);
  // console.log(comments);

  const handleRemoveComment = (commentId) => {
    dispatch(removeComment(commentId));
    // api.comments.remove(commentId).then((commentId) => {
    //   setComments(comments.filter((comment) => comment._id !== commentId));
    // });
  };

  const handleAddComment = (data) => {
    dispatch(createComment({ ...data, pageId }));
    // console.log({ ...data, pageId });
    // api.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setComments([...comments, data]));
  };

  // const sortedComments = comments.sort((a, b) => b.created_at - a.created_at);
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body">
          <AddCommentForm onSubmit={handleAddComment} />
        </div>
      </div>
      {comments && comments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Комментарии:</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onDelete={handleRemoveComment}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
