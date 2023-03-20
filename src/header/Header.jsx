import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../context/auth-context";

const Header = () => {
  const auth = useContext(AuthContext);
  console.log("header auth", auth);

  return (
    <div className="main-header">
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            Musiques
          </NavLink>
        </li>

        <li>
          <NavLink to="/films" exact>
            Films
          </NavLink>
        </li>

        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}

        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
