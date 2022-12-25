import React, { useState } from "react";
import api from "../api/index";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handlePhrase = (number) => {
    let phrase = `${number} `;
    const one = "человек тусанет с тобой сегодня";
    const two = "человека тусанут с тобой сегодня";

    number === 2 || number === 3 || number === 4
      ? (phrase += two)
      : (phrase += one);

    return phrase;
  };

  if (users.length === 0)
    return (
      <span className="badge bg-danger">
        <h1>Никто не тусанет с тобой сегодня</h1>
      </span>
    );

  return (
    <>
      <span className="badge bg-primary">
        <h1>{handlePhrase(users.length)}</h1>
      </span>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((quality) => (
                    <span
                      key={quality._id}
                      className={`badge bg-${quality.color}`}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>
                  {`${user.rate}/5`}
                  <button
                    className="btn btn-danger btn-sm float-end"
                    onClick={() => handleDelete(user._id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
