import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";

const CommentComponent = ({
  userId,
  createdTime,
  commentText,
  onDelete,
  id
}) => {
  const [userName, setUserName] = useState();
  // console.log(id);
  useEffect(() => {
    api.users.getById(userId).then((data) => setUserName(data.name));
  }, []);

  const reformDate = () => {
    const publishedTime = new Date(+createdTime);
    const atMoment = Date.now();
    const difference = atMoment - publishedTime;
    // console.log(atMoment);

    if (difference < 60000) {
      return "1 минут назад";
    } else if (difference < 300000) {
      return "5 минут назад";
    } else if (difference < 600000) {
      return "10 минут назад";
    } else if (difference < 1800000) {
      return "30 минут назад";
    } else if (
      new Date(atMoment).getFullYear() ===
        new Date(publishedTime).getFullYear() &&
      new Date(atMoment).getMonth() === new Date(publishedTime).getMonth() &&
      new Date(atMoment).getDate() === new Date(publishedTime).getDate() // today
    ) {
      const options = { hour: "numeric", minute: "numeric" };
      return (
        "Сегодня в " + new Date(publishedTime).toLocaleString("ru", options)
      ); // hours.minutes
    } else if (
      new Date(atMoment).getFullYear() === new Date(publishedTime).getFullYear() // this year
    ) {
      const options = { day: "numeric", month: "long" };
      return new Date(publishedTime).toLocaleString("ru", options); // day.month
    } else {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return new Date(publishedTime).toLocaleString("ru", options); // day.moth.year
    }
  };

  const time = reformDate();
  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {userName || " "} <span className="small">{time}</span>
                  </p>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={() => onDelete(id)}
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
                <p className="small mb-0">{commentText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentComponent.propTypes = {
  userId: PropTypes.string,
  createdTime: PropTypes.string,
  commentText: PropTypes.string,
  onDelete: PropTypes.func,
  id: PropTypes.string
};

export default CommentComponent;
