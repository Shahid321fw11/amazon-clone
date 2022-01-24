// import React from 'react';
import './App.css';
import Header from './Components/Header'
import Checkout from './Components/Checkout'
import Home from './Components/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Components/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './Components/StateProvider';

function App() {
  const [{},dispatch]=useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser =>{
      console.log("The user is",authUser);
      if(authUser){
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      }
      else{
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    })
  },[])

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
