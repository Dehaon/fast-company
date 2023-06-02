import React from "react";
import useMockData from "../utils/mockData";

const MainPage = () => {
  const { errors, initialize, progress, status } = useMockData();

  const handleClick = () => {
    console.log("click");
    initialize();
  };
  return (
    <div className="container mt-5">
      <h1>Главная страница</h1>
      <h3>Инициализация данных в Firebase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {errors && <li>Error: {errors}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        Init
      </button>
    </div>
  );
};

export default MainPage;
