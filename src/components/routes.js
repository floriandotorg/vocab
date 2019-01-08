import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Edit from './pages/edit/index'
import Learn from './pages/learning/index'

export default () => (
  <Switch>
    <Route exact path="/" component={Edit} />
    <Route path="/learn" component={Learn} />
  </Switch>
);
