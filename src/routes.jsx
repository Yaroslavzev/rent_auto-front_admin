import React from "react";
import { Switch } from "react-router-dom";
import SignIn from "./components/signIn/index";
import Dashboard from "./components/admin/dashboard";
import PrivateRoute from './components/authRoutes/privateRoute';
import PublicRoute from './components/authRoutes/publicRoute';
import Cars from './components/admin/cars';
import CarInfo from './components/admin/cars/carInfo';

const Routes = (props) => {
  return (
    <div>
      <Switch>
      <PrivateRoute {...props} path="/dashboard/cars/:id" exact component={CarInfo}/>
      <PrivateRoute {...props} path="/dashboard/cars" exact component={Cars}/>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
        <PublicRoute {...props} path="/sign_in" restricted={true} exact component={SignIn} />
      </Switch>
    </div>
  );
};

export default Routes;
