import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./Home";
import Updates from "./Updates";
import Contact from "./Contact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./About";
import React from 'react';
import CreateBlog from "./components/blogs/create";
import Bloglist from "./components/blogs/bloglist";
import BlogView from "./components/blogs/show";
import BlogEdit from "./components/blogs/edit";
import Login from "./Login"
import Dashboard from "./Dashboard"


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <br />
        <br />
        <br />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/updates/:team" element={<Updates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            {/* <Route exact path='/admin' element={<Bloglist />} />
            <Route path='/admin/create' element={<CreateBlog />} />
            <Route path='/admin/:id' element={<BlogView />} />
            <Route path='/admin/edit/:id' element={<BlogEdit />} /> */}
            <Route path="admin" element={<Dashboard />}>
              <Route exact path='' element={<Bloglist />} />
              <Route path=':team' element={<Bloglist />} />
              <Route path='create' element={<CreateBlog />} />
              <Route path=':id' element={<BlogView />} />
              <Route path='edit/:id' element={<BlogEdit />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
