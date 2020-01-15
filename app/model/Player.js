/**
 * Model definition for Player.
 */

import Immutable from 'immutable';

const Player = new Immutable.Record({
  player: '',
  team: '',
  position: '',
  attempts: 0,
  attemptspergame: 0.0,
  yards: 0.0,
  avg: 0.0,
  yardspergame: 0.0,
  touchdowns: 0,
  longestrush: '',
  firstdown: 0,
  firstdownpercentage: 0.0,
  twentyyards: 0,
  fortyyards: 0,
  fumbles: 0,
});

/**
 * Maps the JSON returned from a remote request onto a new Player record.
 * @param {Object} json
 */
export const fromResponse = (json) => new Player({
  ...json,
  tags: Immutable.fromJS(json.tags),
});

export default Player;
