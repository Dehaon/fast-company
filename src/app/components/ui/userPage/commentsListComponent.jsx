import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import CommentComponent from "./CommentComponent";

const CommentsListComponent = ({ id, children }) => {
  const [comments, setComments] = useState();

  // console.log(children);

  useEffect(() => {
    api.comments.fetchCommentsForUser(id).then((data) => {
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
    console.log(data);
    api.comments.add(data);
    api.comments.fetchCommentsForUser(id).then((data) => {
      const sortedComments = data.sort((a, b) => b.created_at - a.created_at);
      setComments(sortedComments);
    });
  };

  const config = { ...children.props, onSubmit: handleAddComment, pageId: id };
  const clonedChild = React.cloneElement(children, config);

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body">{clonedChild}</div>
      </div>
      {comments && comments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Комментарии:</h2>
            <hr />
            {comments.map((comment) => (
              <CommentComponent
                key={comment._id}
                id={comment._id}
                userId={comment.userId}
                createdTime={comment.created_at}
                commentText={comment.content}
                onDelete={handleRemoveComment}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

CommentsListComponent.propTypes = {
  id: PropTypes.string,
  children: PropTypes.object
};

export default CommentsListComponent;
