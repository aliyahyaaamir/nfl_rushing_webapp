/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 */

import {
  GET_PLAYERS_REQUEST,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
  FILTER_BY_PLAYER,
  SORT_PLAYERS,
} from './actionTypes';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

export function getPlayersRequest() {
  return {
    type: GET_PLAYERS_REQUEST,
  };
}

export function getPlayersSuccess(players) {
  return {
    type: GET_PLAYERS_SUCCESS,
    players,
  };
}

export function getPlayersFailure(error) {
  return {
    type: GET_PLAYERS_FAILURE,
    error,
  };
}

export function filterByPlayer(e) {
  return {
    type: FILTER_BY_PLAYER,
    payload: e.target.value,
  };
}

export function sortPlayersTable(sortColumnKey) {
  return {
    type: SORT_PLAYERS,
    payload: sortColumnKey,
  };
}
