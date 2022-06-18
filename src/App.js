import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./Home";
import Updates from "./Updates";
import Contact from "./Contact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./About";
import React from 'react';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <br/>
      <br/>
      <br/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/updates" element={<Updates/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
