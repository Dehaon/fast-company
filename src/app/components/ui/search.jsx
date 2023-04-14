import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleSearchUsers, enteredText }) => {
  return (
    <form>
      <input
        name="search"
        type="text"
        placeholder="Поиск..."
        value={enteredText}
        onChange={handleSearchUsers}
        className="form-control mt-2 mb-2"
      />
    </form>
  );
};

Search.propTypes = {
  handleSearchUsers: PropTypes.func.isRequired,
  enteredText: PropTypes.string
};

export default Search;
