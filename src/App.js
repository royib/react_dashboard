import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles.css";

import RealeasRequests from "./containers/RealeasRequests/RealeasRequests";
import AllEmails from "./containers/AllEmails/AllEmails";

import Layout from "./hoc/Layout/Layout";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/RealeasRequests" component={RealeasRequests} />
        <Route path="/AllEmails" component={AllEmails} />
        <Route path="/" exact component={RealeasRequests} />
      </Switch>
    </Layout>
  );
}
