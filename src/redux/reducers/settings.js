import { SET_SETTINGS_GAME } from '../actions';

const initialSettingsState = {
  category: 0,
  difficulty: 'Any Difficulty',
  type: 'Any Type',
};

const settings = (state = initialSettingsState, action) => {
  switch (action.type) {
  case SET_SETTINGS_GAME:
    return {
      ...state, ...action.payload,
    };
  default:
    return state;
  }
};

export default settings;
