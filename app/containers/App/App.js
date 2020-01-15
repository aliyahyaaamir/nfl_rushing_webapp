/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PlayerStats from 'containers/PlayerStats';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Header />
    <Switch>
      <Route path="/player-stats" component={PlayerStats} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
