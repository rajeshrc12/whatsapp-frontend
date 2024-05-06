import React from "react";
import ExistingChat from "./ExistingChat";
import NewChat from "./NewChat";
import StatusList from "../status/StatusList";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";
const LeftPanel = () => {
  const panel = useSelector((state) => state.panel);
  if (panel.left === "newChat") return <NewChat />;
  else if (panel.left === "statusList") return <StatusList />;
  else if (panel.left === "profile") return <Profile />;
  else return <ExistingChat />;
};

export default LeftPanel;
