import React from 'react';

import Login from './auth/Login';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';

import Dashboard from './home/Dashboard';
import UpdateProfile from './home/UpdateProfile';

import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {PrivateRoute} from './PrivateRoute';
import AddBook from './book/AddBook';

function App() {
  return (
    <div>
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} /> 
              <PrivateRoute exact path="/edit-profile" component={UpdateProfile} /> 
              <PrivateRoute exact path="/add-book" component={AddBook} /> 
              <Route path='/signup' component = {Signup}/>
              <Route path='/login' component = {Login}/>
              <Route path='/forgot-passord' component = {ForgotPassword}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  )
}

export default App;
