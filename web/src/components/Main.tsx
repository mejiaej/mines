import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GAME_PATH, HOME_PATH } from '../config/paths';
import { GameSettings } from './screens/game-settings/GameSettings';
import { NewGame } from './screens/game/NewGame';

export const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={HOME_PATH} component={GameSettings} />
      <Route exact path={GAME_PATH} component={NewGame} />
    </Switch>
  </BrowserRouter>
);
