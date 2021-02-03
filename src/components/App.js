import React from 'react';

import Login from './auth/Login';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';

import Dashboard from './home/Dashboard';
import UpdateProfile from './home/UpdateProfile';

import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {PrivateRoute} from './PrivateRoute';

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} /> 
              <PrivateRoute exact path="/update-profile" component={UpdateProfile} /> 
              <Route path='/signup' component = {Signup}/>
              <Route path='/login' component = {Login}/>
              <Route path='/forgot-passord' component = {ForgotPassword}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App;
