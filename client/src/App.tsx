import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import { useApolloClient } from "./hooks/useApolloClient";
import Loading from "./components/Loading/Loading";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import HeroPage from "./components/HeroPage/HeroPage";
import ListPage from "./components/ListPage/ListPage";
import AlertComponent from "./components/AlertComponent/AlertComponent";

function App() {
  const client = useApolloClient();

  if (!client) {
    return <Loading />;
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AlertComponent />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/heros" />} />
          <Route exact path="/heros" render={() => <ListPage />} />
          <Route path="/heros/:id?" render={() => <HeroPage />} />
          <Route path="*" render={() => <ErrorPage />} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
