import React from 'react';
import {Router, Route, IndexRedirect} from 'react-router';
import Container from 'views/Container';
import Home from 'views/Home/Home';

export default function makeRoutes() {
  return (
    <Route path="/" component={Container}>
      <IndexRedirect to="/home" />

      <Route path="home" component={Home} />
    </Route>
  );
}
