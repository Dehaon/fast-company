import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const BackHistoryButton = ({ styles, title, page }) => {
  const history = useHistory();
  // console.log(history);
  return (
    <button
      className={styles}
      onClick={() => (page ? history.push(page) : history.goBack())}
    >
      {`${title}`}
    </button>
  );
};

BackHistoryButton.defaultProps = {
  styles: "btn btn-primary",
  title: "Назад"
};

BackHistoryButton.propTypes = {
  styles: PropTypes.string,
  title: PropTypes.string,
  page: PropTypes.string
};

export default BackHistoryButton;
