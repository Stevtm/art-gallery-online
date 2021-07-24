import React, { useState } from "react";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import MyNavbar from "./components/Navbar/navbar.component";
import ArtCarousel from "./components/carousel/carousel.component";
import ArtGallery from "./pages/gallery/gallery";
import Title from "./components/title/title.component";
import Fade from "react-reveal/Fade";
import Container from "react-bootstrap/Container";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <MyNavbar />
          <div className="container">
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/signup">
              <Signup></Signup>
            </Route>
            {/* <Route exact path="/gallery">
              <ArtGallery></ArtGallery>
            </Route> */}
            <Route exact path="/">
              <div className="App" style={{ position: "relative" }}>
                <ArtCarousel />
                <Title />

                <div>
                  <Container className="container-box rounded">
                    <Fade duration={500}>
                      <hr />
                      <ArtGallery />
                    </Fade>
                  </Container>
                </div>
              </div>
            </Route>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
