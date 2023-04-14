import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import MainPage from "./layouts/mainPage";
import Login from "./layouts/login";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId?" component={Users} />
      </Switch>
    </>
  );
}

export default App;
