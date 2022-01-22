// import React from 'react';
import './App.css';
import Header from './Components/Header'
import Checkout from './Components/Checkout'
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      
      <Router>
        <Routes>
          <Route path="/"
            element = {<Home />}>
          </Route>

          <Route path="/checkout"
            element ={<Checkout />}>
          </Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
