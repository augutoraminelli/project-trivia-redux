// import opentdbAPI from '../../services/opentdbAPI';

export const SET_PLAYER_DATA = 'SET_PLAYER_DATA';
export const SET_SETTINGS_GAME = 'SET_SETTINGS_GAME';

export const setPlayerData = (payload) => ({
  type: SET_PLAYER_DATA,
  payload,
});

export const setSettingsGame = (settings) => ({
  type: SET_SETTINGS_GAME,
  payload: settings,
});
