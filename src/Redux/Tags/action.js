import { TagAPI } from "../../Utilities/Tags/API";
import { FETCH_TAGS, FETCH_TAGS_FAIL, FETCH_TAGS_SUCCESS } from "./types";

export const fetchTagsAPI = () => {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: FETCH_TAGS,
        payload: [],
      });
      const response = await TagAPI.getAll();
      if (response.status === 200) {
        dispatch({
          type: FETCH_TAGS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_TAGS_FAIL,
        payload: [],
      });
    }
  };
};

export const createTagAPI = (data) => {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: FETCH_TAGS,
        payload: [],
      });
      const response = await TagAPI.create(data);
      if (response.status === 200) {
        dispatch({
          type: FETCH_TAGS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_TAGS_FAIL,
        payload: [],
      });
    }
  };
};

export const updateTagAPI = (id, data) => {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: FETCH_TAGS,
        payload: [],
      });
      const response = await TagAPI.update(id, data);
      if (response.status === 200) {
        dispatch({
          type: FETCH_TAGS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_TAGS_FAIL,
        payload: [],
      });
    }
  };
};
