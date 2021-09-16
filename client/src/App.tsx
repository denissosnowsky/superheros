import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import { useApolloClient } from "./hooks/useApolloClient";
import Loading from "./components/Loading/Loading";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import HeroPage from "./components/HeroPage/HeroPage";
import ListPage from "./components/ListPage/ListPage";

function App() {
  const client = useApolloClient();

  if (!client) {
    return <Loading />;
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <ListPage />} />
          <Route path="/hero/:id?" render={() => <HeroPage />} />
          <Route path="*" render={() => <ErrorPage />} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
