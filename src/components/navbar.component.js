import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Store App</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">List of Goods</Link>
          </li>
          <li className="navbar-item">
          <Link to="/admin" className="nav-link">Admin</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
