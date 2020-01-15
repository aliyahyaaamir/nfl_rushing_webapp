/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
*/

import SORT_DIRECTION from 'components/sortDirection';

import { fromJS } from 'immutable';

import {
  GET_PLAYERS_REQUEST,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
  FILTER_BY_PLAYER,
  SORT_PLAYERS,
} from './actionTypes';

// The initial state of the App
const initialState = fromJS({
  players: [],
  sortKey: '',
  filteredPlayerName: '',

  // Sorting and loading fields for the Players table
  tableSort: {
    sortDirection: SORT_DIRECTION.DESC,
    sortKey: 'yards',
  },

  isLoading: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAYERS_REQUEST:
      return state
        .set('isLoading', true)
        .set('error', false);

    case GET_PLAYERS_SUCCESS:
      return state
        .setIn(['players'], action.players)
        .set('isLoading', false);

    case GET_PLAYERS_FAILURE:
      return state
        .set('error', action.error)
        .set('isLoading', false);

    case FILTER_BY_PLAYER:
      return state
        .set('filteredPlayerName', action.payload);

    case SORT_PLAYERS:
      // If it's the first click (in a sequence) on the header cell, default to descending order.
      // Otherwise, invert the sort direction.
      return state.update('tableSort', (tableSort) => {
        const newSortDirection =
          action.payload === tableSort.get('sortKey') && tableSort.get('sortDirection') === SORT_DIRECTION.DESC
            ? SORT_DIRECTION.ASC
            : SORT_DIRECTION.DESC;
        return tableSort
          .set('sortDirection', newSortDirection)
          .set('sortKey', action.payload);
      });

    default:
      return state;
  }
}

export default appReducer;
