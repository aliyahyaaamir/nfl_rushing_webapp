import Immutable from 'immutable';

import { getRequest } from 'lib/ajax';

import { fromResponse as playerFromResponse } from 'model/Player';

export const playerIndex = () => (
  getRequest('http://localhost:4000/api/v1/player')
    .then((players) => (
      Immutable.List(players.map(playerFromResponse))
    ))
);
