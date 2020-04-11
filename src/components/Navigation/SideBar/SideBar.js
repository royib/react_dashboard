import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default props => {
  let location = useLocation();
  return (
    <div className="sideBar">
      <ul>
        <li className={location.pathname === "/" ? "selected" : null}>
          <Link to="/">Release Requests</Link>
        </li>
        <li className={location.pathname === "/AllEmails" ? "selected" : null}>
          <Link to="/AllEmails">All Quarantined Emails</Link>
        </li>
      </ul>
    </div>
  );
};
