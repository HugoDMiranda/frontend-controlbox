import "../sass/Components-sass/nav.css";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../context/authContext.js";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid con-navbar">
        <div className="dropdown">
          <button class="navbar-brand">
            <FaBars />
          </button>
          <div className="navbar-info">
            <ul className="navbar-menu">
              <li>
                <Link className="navbar-link" to="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="navbar-link" to="/Register">
                  Registrarse
                </Link>
              </li>

              {currentUser ? (
                <>
                  <li>
                    <Link className="navbar-link" to="/" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-link" to="/User">
                      Tu cuenta
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link className="navbar-link" to="/Login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
            <div>
              {currentUser ? (
                <>
                  <span className="user-logo in"></span>
                  <h2>{currentUser?.name}</h2>
                  <h4>#{currentUser?.id}</h4>
                </>
              ) : (
                <span className="user-logo out"></span>
              )}
            </div>
          </div>
        </div>
        <Link className="navbar-link" to="/">
          <img className="logo" src="./img/book-logo.png" alt="logo" />
        </Link>

        {currentUser ? (
          <span className="user-logo in"></span>
        ) : (
          <span className="user-logo out"></span>
        )}
      </div>
    </nav>
  );
}

export default Nav;
