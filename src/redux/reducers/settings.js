import { SET_SETTINGS_GAME } from '../actions';

const initialSettingsState = {
  category: '',
  difficulty: '',
  type: '',
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
