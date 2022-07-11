import { combineReducers } from 'redux'
import DictsReducer from './dicts/reducer';
import TagsReducer from "./Tags/reducer";

export default combineReducers({
    tags: TagsReducer,
    dicts: DictsReducer
  })