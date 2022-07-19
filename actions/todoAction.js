import {
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
} from "../constants/actionTypes";
import Axios from "axios";

const url = "https://stivin-agacy-todo-git-with-redux-stivin-00.vercel.app/api/task";

export const addaTask = (task) => async (dispatch) => {
  dispatch({ type: ADD_TASK_REQUEST, payload: task });
  console.log("dispatching products");
  try {
    const { data } = await Axios.post(url, task);
    dispatch({ type: ADD_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateaTask = (id, task) => async (dispatch) => {
  dispatch({ type: UPDATE_TASK_REQUEST, payload: task });
  try {
    const { data } = await Axios.put(`${url}/${id}`, {
      task: task.task,
    });
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const completeaTask = (id, complete) => async (dispatch) => {
  dispatch({ type: UPDATE_TASK_REQUEST, payload: id, data: completeTask });
  try {
    const { data } = await Axios.put(`${url}/${id}`, {
      completed: complete,
    });
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  dispatch({ type: TASK_DELETE_REQUEST, payload: id });

  try {
    const { data } = await Axios.delete(`${url}/${id}`);
    dispatch({ type: TASK_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASK_DELETE_FAIL, payload: message });
  }
};

export const listTasks = () => async (dispatch) => {
  dispatch({ type: TASK_LIST_REQUEST });
  try {
    const { data } = await Axios.get(url);
    dispatch({ type: TASK_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASK_LIST_FAIL, payload: message });
  }
};
