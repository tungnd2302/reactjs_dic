import { DicAPI } from "../../Utilities/Dictionary/API";
import { FETCH_DICTS, FETCH_DICTS_FAIL, FETCH_DICTS_SUCCESS } from "./types";

export const fetchDictsAPI = () => {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: FETCH_DICTS,
        payload: [],
      });
      const response = await DicAPI.getAll();
      if (response.status === 200) {
        dispatch({
          type: FETCH_DICTS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_DICTS_FAIL,
        payload: [],
      });
    }
  };
};

export const createDictAPI = (data) => {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: FETCH_DICTS,
        payload: [],
      });
      const response = await DicAPI.create(data);
      if (response.status === 200) {
        dispatch({
          type: FETCH_DICTS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_DICTS_FAIL,
        payload: [],
      });
    }
  };
};

export const updateDictAPI = (id, data) => {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: FETCH_DICTS,
        payload: [],
      });
      const response = await DicAPI.update(id, data);
      if (response.status === 200) {
        dispatch({
          type: FETCH_DICTS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_DICTS_FAIL,
        payload: [],
      });
    }
  };
};
