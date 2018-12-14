import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import ProjectList from "./components/projects/ProjectList";
import Navbar from "./components/navbar/Navbar";
import ProjectDetails from "./components/projects/ProjectDetails";
import Signup from "./components/auth/Signup";
import AuthService from "./components/auth/auth-service";
import Login from "./components/auth/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  render() {
    //debugger;
    // if (this.state.loggedInUser) var userId = this.state.loggedInUser._id || "";
    // else var userId = "";
    this.fetchUser();
    if (this.state.loggedInUser) {
      var user = this.state.loggedInUser;
      return (
        <div className="App">
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser}
          />
          <Switch>
            <Route exact path="/projects" component={ProjectList} />
            {/* <Route exact path="/projects/:id" component={ProjectDetails} /> */}
            <Route
              exact
              path="/projects/:id"
              render={props => (
                <ProjectDetails
                  {...props}
                  loggedInUser={user}
                  getUser={this.getTheUser}
                />
              )}
            />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser}
          />
          <Switch>
            <Route
              exact
              path="/signup"
              render={() => <Signup getUser={this.getTheUser} />}
            />
            <Route
              exact
              path="/"
              render={() => <Login getUser={this.getTheUser} />}
            />
            {/* <Route exact path="/projects" component={ProjectList} />
            <Route exact path="/projects/:id" component={ProjectDetails} /> */}
            {/* <Route
              exact
              path="/projects/:id"
              render={props => (
                <ProjectDetails {...props} loggedInUser={false} userId={""} />
              )}
            /> */}
          </Switch>
        </div>
      );
    }
  }
}

export default App;
