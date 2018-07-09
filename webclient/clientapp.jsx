const React = require('react');
const ReactDOM = require('react-dom');
const { browserHistory, hashHistory, Route, Router, Redirect } = require('react-router');
import Home from './components/Home/Home.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
  </Router>, document.getElementById('app')
);
