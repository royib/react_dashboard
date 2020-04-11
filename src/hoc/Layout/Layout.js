import React from "react";
import "./Layout.css";

import SideBar from "../../components/Navigation/SideBar/SideBar";

export default props => {
  return (
    <div className="mainContainer">
      <div className="sidebarContainer">
        <SideBar />
      </div>
      <div className="contentContainer">{props.children}</div>
    </div>
  );
};
