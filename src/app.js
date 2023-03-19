import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Users from "./components/users";
import MainPage from "./components/mainPage";
import Login from "./components/login";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
      </Switch>
    </>
  );
}

export default App;
