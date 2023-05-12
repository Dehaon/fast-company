import React, { useState, useEffect } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";
import CommentsList, { AddCommentForm } from "../common/comments";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { userId } = useParams();
  // console.log(comments);

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => {
      const sortedComments = data.sort((a, b) => b.created_at - a.created_at);
      setComments(sortedComments);
    });
  }, []);

  const handleRemoveComment = (commentId) => {
    api.comments.remove(commentId);
    const filtredComments = comments.filter(
      (comment) => comment._id !== commentId
    );
    return setComments(filtredComments);
  };

  const handleAddComment = (data) => {
    // console.log(data);
    api.comments.add({ ...data, pageId: userId }).then((data) => {
      const sortedComments = [...comments, data].sort(
        (a, b) => b.created_at - a.created_at
      );
      setComments(sortedComments);
    });
  };

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
            <CommentsList comments={comments} onDelete={handleRemoveComment} />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
