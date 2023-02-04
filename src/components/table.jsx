import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ selectedSort, onSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ selectedSort, onSort, columns }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  children: PropTypes.array
};

export default Table;
