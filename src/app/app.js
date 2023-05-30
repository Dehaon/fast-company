import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import MainPage from "./layouts/mainPage";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";

function App() {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/users/:userId?/:edit?" component={Users} />
        </Switch>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
}

export default App;
