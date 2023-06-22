import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import MainPage from "./layouts/mainPage";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/logout" component={LogOut} />
            <Route path="/login/:type?" component={Login} />
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          </Switch>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
