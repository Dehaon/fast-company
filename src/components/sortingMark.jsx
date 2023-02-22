import React from "react";
import PropTypes from "prop-types";

const SortingMark = ({ selectedSort, columnPath }) => {
  // console.log(columnPath);
  const caretUpFill = "bi bi-caret-up-fill";
  const caretDownFill = "bi bi-caret-down-fill";
  return (
    columnPath &&
    selectedSort.path === columnPath && (
      <i
        className={selectedSort.order === "asc" ? caretUpFill : caretDownFill}
      />
    )
  );
};

SortingMark.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  columnPath: PropTypes.string
};

export default SortingMark;
