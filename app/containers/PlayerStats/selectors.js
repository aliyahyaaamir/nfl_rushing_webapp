/**
 * selectors
 */

import Immutable from 'immutable';
import { createSelector } from 'reselect';

import sortDirection from 'components/sortDirection';

const playersSelector = (state) => state.getIn(['home', 'players'], Immutable.List());
const playersTableSortSelector = (state) => state.getIn(['home', 'tableSort']);
const filteredPlayerNameSelector = (state) => state.getIn(['home', 'filteredPlayerName']);

/**
 * Sorts the populated Players objects by the sort direction in state.
 */
const sortedPlayersSelector = createSelector(
  [playersSelector, playersTableSortSelector],
  (players, tableSort) => {
    // Flips the sign of the sort return value for descending sorts
    const sortNumberSign = tableSort.get('sortDirection') === sortDirection.ASC ? 1 : -1;
    const sortKey = tableSort.get('sortKey');


    // These keys represent string values
    if (sortKey === 'player' || sortKey === 'team' || sortKey === 'position') {
      return players.sort((player1, player2) => (
        String(player1.get(sortKey)).localeCompare(String(player2.get(sortKey))) * sortNumberSign
      ));
    }

    return players.sort((player1, player2) => (
      (parseFloat(player1.get(sortKey)) < parseFloat(player2.get(sortKey)) ? 1 : -1) * sortNumberSign
    ));
  },
);

const sortedAndFilteredPlayersSelector = createSelector(
  [sortedPlayersSelector, filteredPlayerNameSelector],
  (players, filteredPlayerName) => players.filter((player) => player.get('player').toLowerCase().includes(filteredPlayerName.toLowerCase())),
);

export {
  sortedAndFilteredPlayersSelector,
};
