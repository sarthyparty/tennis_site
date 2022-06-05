import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./Home";
import Updates from "./Updates";
import Contact from "./Contact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/updates" element={<Updates/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
