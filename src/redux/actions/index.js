export const SET_PLAYER_DATA = 'SET_PLAYER_DATA';
export const SET_PLAYER_RANKING = 'SET_PLAYER_RANKING';
export const GET_RANKING = 'GET_RANKING';

export const setPlayerData = (payload) => ({
  type: SET_PLAYER_DATA,
  payload,
});

export const setPlayerRanking = (payload) => ({
  type: SET_PLAYER_RANKING,
  payload,
});

export const getRanking = (payload) => ({
  type: GET_RANKING,
  payload,
});
