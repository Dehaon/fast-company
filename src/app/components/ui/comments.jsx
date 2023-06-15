import React from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
  const { comments, createComment, removeComment } = useComments();
  // console.log(comments);

  const handleRemoveComment = (commentId) => {
    removeComment(commentId);
    // api.comments.remove(commentId).then((commentId) => {
    //   setComments(comments.filter((comment) => comment._id !== commentId));
    // });
  };

  const handleAddComment = (data) => {
    createComment(data);
    // api.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setComments([...comments, data]));
  };

  const sortedComments = comments.sort((a, b) => b.created_at - a.created_at);

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
            <CommentsList
              comments={sortedComments}
              onDelete={handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
