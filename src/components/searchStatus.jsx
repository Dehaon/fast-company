import React from "react";

const SearchStatus = ({ numberOfGuests }) => {
  const renderPhrase = (number) => {
    let phrase = `${number} `;
    const one = "человек тусанет с тобой сегодня";
    const two = "человека тусанут с тобой сегодня";

    number === 2 || number === 3 || number === 4
      ? (phrase += two)
      : (phrase += one);

    return number === 0 ? (
      <span className="badge bg-danger">
        <h1>Никто не тусанет с тобой сегодня</h1>
      </span>
    ) : (
      <span className="badge bg-primary">
        <h1>{phrase}</h1>
      </span>
    );
  };
  return renderPhrase(numberOfGuests);
};

export default SearchStatus;
