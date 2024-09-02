import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/header.css';

export const Header: React.FC = () => {
  // Get the 'user' data from localStorage
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  // Logout function to clear localStorage and navigate to login page
  const logout = (): void => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="d-flex justify-content-between top-header align-items-center">
      <div>
        {auth && (
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Products</Link>
            </li>
          </ul>
        )}
      </div>
      <div>
        <ul className="align-items-center">
          <li>
            {auth ? (
              <button className="primary-btn" onClick={logout}>Logout</button>
            ) : (
              <Link className="primary-btn" to="/signup">Sign Up</Link>
            )}
          </li>
          <li>
            {!auth && (
              <Link className="primary-btn" to="/login">Login</Link>
            )}
          </li>
          {auth && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};