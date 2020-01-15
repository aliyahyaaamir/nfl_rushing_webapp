/**
 *
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import { getPlayersSuccess, getPlayersFailure } from 'containers/PlayerStats/actions';
import { playerIndex } from 'lib/api/playerEndpoint';
import { GET_PLAYERS_REQUEST } from './actionTypes';

function* getPlayers() {
  try {
    const players = yield call(playerIndex);
    yield put(getPlayersSuccess(players));
  } catch (error) {
    yield put(getPlayersFailure(error));
  }
}

export default function* watchGetPlayersRequest() {
  yield takeLatest(GET_PLAYERS_REQUEST, getPlayers);
}
