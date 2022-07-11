import { initState } from "./state";
import { FETCH_TAGS, FETCH_TAGS_SUCCESS } from "./types";
const TagsReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_TAGS:
      return {
        ...state,
        data: action.payload.tags || [],
        loading: true,
      };
      break;
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        data: action.payload.tags || [],
        loading: false,
      };
      break;
    default:
      return state;
      break;
  }
};

export default TagsReducer;
