import { initState } from "./state";
import { FETCH_DICTS, FETCH_DICTS_SUCCESS } from "./types";
const DictsReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_DICTS:
      return {
        ...state,
        data: action.payload.dics || [],
        loading: true,
      };
      break;
    case FETCH_DICTS_SUCCESS:
      return {
        ...state,
        data: action.payload.dics || [],
        loading: false,
      };
      break;
    default:
      return state;
      break;
  }
};

export default DictsReducer;
