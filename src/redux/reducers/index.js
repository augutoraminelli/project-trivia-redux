import { combineReducers } from 'redux';
import player from './player';
import ranking from './ranking';
import settings from './settings';

const rootReducer = combineReducers({ player, ranking, settings });

export default rootReducer;
