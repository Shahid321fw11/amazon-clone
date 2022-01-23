// import React from 'react';
import './App.css';
import Header from './Components/Header'
import Checkout from './Components/Checkout'
import Home from './Components/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
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
