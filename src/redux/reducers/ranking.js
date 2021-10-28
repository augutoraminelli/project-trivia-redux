import { SET_PLAYER_RANKING, GET_RANKING } from '../actions';

import storage from '../../services/storage';

const initialRankingState = [];

const player = (state = initialRankingState, { type, payload }) => {
  switch (type) {
  case SET_PLAYER_RANKING:
    state.push(payload);
    storage.write('ranking', state);
    return state;
  case GET_RANKING:
    return storage.read('ranking');
  default:
    return state;
  }
};

export default player;
