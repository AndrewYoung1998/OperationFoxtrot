import React from 'react';
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Login from "./Login";
import UpdateProfile from "./UpdateProfile";
import ForgotPassword from "./ForgotPassword";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";

function App() {
  return (
      <div className="container">
          {/*Allows routing between js files*/}
          <Router>
              <AuthProvider>
                <Switch>
                    {/*Private route is to check a user is signed in*/}
                    <PrivateRoute exact path="/" component={Dashboard}/>
                    <PrivateRoute path="/profile" component={Profile}/>
                    <PrivateRoute path="/update-profile" component={UpdateProfile}/>

                    {/*Routes to pages without having to be signed in*/}
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/forgot-password" component={ForgotPassword}/>
                </Switch>
              </AuthProvider>
          </Router>
      </div>
  );
}

export default App;
