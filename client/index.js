import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {browserHistory, IndexRoute, Route, Router} from "react-router";
import {routerReducer, syncHistoryWithStore} from "react-router-redux";

import * as reducers from "./reducers";
import App from "./components/App";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();


const reducer = combineReducers({
  reducers,
  routing: routerReducer
});


const store = createStore(reducer);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);