import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import MainPage from "./layouts/mainPage";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
  return (
    <>
      <AppLoader>
        <AuthProvider>
          <NavBar />
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/logout" component={LogOut} />
            <Route path="/login/:type?" component={Login} />
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          </Switch>
        </AuthProvider>
      </AppLoader>
      <ToastContainer />
    </>
  );
}

export default App;
