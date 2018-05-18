import React from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoMatch from "./pages/NoMatch";

const App = () => (
  <Router>
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route component={NoMatch} />
      </Switch>
      <br/>
      <Footer />
    </div>
  </Router>
);


export default App;
