import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { history } from "../history";
import reducers from "../reducers";
import ProtectedRoute from "./common/ProtectedRoute";

import "../dist/css/tailwind.css";
import "../dist/css/font-awesome.min.css";
import "animate.css";

import NotFound from "./NotFound";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PostForm from "./PostForm";
import Settings from "./Settings";
import SinglePost from "./SinglePost";
import Profile from "./Profile";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const App = () => (
  <Router history={history}>
    <Provider store={store}>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/post/new" component={PostForm} />
        <ProtectedRoute exact path="/settings" component={Settings} />
        <ProtectedRoute exact path="/posts/:id" component={SinglePost} />
        <ProtectedRoute exact path="/profile/:id" component={Profile} />
        <Route path="/not-found" component={NotFound} />
        <Redirect exact from="/" to="/login" />
        <Redirect to="/not-found" />
      </Switch>
    </Provider>
  </Router>
);

export default App;
