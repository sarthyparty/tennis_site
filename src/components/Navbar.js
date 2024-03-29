import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import React from 'react';

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <NavLink activeClassName="active" className="brand-name" to="/">Minnetonka Tennis</NavLink>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <NavLink activeClassName="active" to="/" onClick={() => {setIsNavExpanded(false);}}>Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/about" onClick={() => {setIsNavExpanded(false);}}>About</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/updates" onClick={() => {setIsNavExpanded(false);}}>Updates</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/contact" onClick={() => {setIsNavExpanded(false);}}>Contact</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/links" onClick={() => {setIsNavExpanded(false);}}>Links</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/files" onClick={() => {setIsNavExpanded(false);}}>Files</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/login" onClick={() => {setIsNavExpanded(false);}}>Coach Login</NavLink>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}
