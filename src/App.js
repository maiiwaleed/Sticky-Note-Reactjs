import React, { useState ,useEffect, useContext} from 'react';
import Navbar from './components/NavBar/Navbar';
import { Redirect, Route, Switch, useHistory } from 'react-router'
import Home from './components/Pages/Home/Home';
import Register from './components/Pages/Register/Register';
import Login from './components/Pages/Login/Login';
import ProtectedRoute from './components/Pages/ProtectedRoute/ProtectedRoute';

function App() {


  return (
    <>
      <Navbar />
      
      <div className="container ">
    
          <Switch>
              <Route path='/login' render={(props)=> <Login {...props} />} />
              <Route path='/register'  render={ (props)=> <Register {...props}/>  } />
              <Route path='/home'  render={ (props)=> <Home {...props}/>  } />
              
          </Switch>
      </div>

    </>
  )

}

export default App;
