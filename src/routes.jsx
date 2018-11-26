import React, {Component} from "react";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import SignIn from "./components/signIn/index";
import Dashboard from "./components/admin/dashboard";
import PrivateRoute from './components/authRoutes/privateRoute';
import PublicRoute from './components/authRoutes/publicRoute';
import Cars from './components/admin/cars';
import CarInfo from './components/admin/cars/carInfo';
import {connect} from 'react-redux';
import * as action from './store/actions/actions';
import Logout from './components/authRoutes/logout';

class Routes extends Component  {

  componentDidMount(){
      this.props.onTryAutoSignup()
      
  }
  render (){

  console.log(this.props.user)
  return (
    <div>
      <Switch>  
        <PrivateRoute {...this.props} user={this.props.user} path="/dashboard/cars/:id" exact component={CarInfo}/>
        <PrivateRoute {...this.props} user={this.props.user} path="/dashboard/cars" exact component={Cars}/>
        <PrivateRoute {...this.props} user={this.props.user} path="/dashboard" exact component={Dashboard}/>
        <PrivateRoute {...this.props} user={this.props.user} path="/logout" exact component={Logout} />
        <PublicRoute {...this.props} user={this.props.user} path="/sign_in" restricted={true} exact component={SignIn} />
        {  <Route path="/" exact /> ? <Redirect to={this.props.user ? '/dashboard' : '/sign_in'}/> : null }  
        
      </Switch>
    </div>
  );
  }
};


const mapStateToProps = state => {
  return {
    user: state.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup:()=> dispatch(action.authCheckState())
  }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
