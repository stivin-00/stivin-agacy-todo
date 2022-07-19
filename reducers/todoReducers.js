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

export const addTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
      return { adding: true };
    case ADD_TASK_SUCCESS:
      return { adding: false, task: action.payload };
    case ADD_TASK_FAIL:
      return { adding: false, error: action.payload };
    default:
      return state;
  }
};

export const updateTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return { updating: true };
    case UPDATE_TASK_SUCCESS:
      return { updating: false, success: true };
    case UPDATE_TASK_FAIL:
      return { updating: false, error: action.payload };
    default:
      return state;
  }
};

export const listTaskReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true };
    case TASK_LIST_SUCCESS:
      return { loading: false, alltasks: action.payload };
    case TASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const TaskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { deleting: true };
    case TASK_DELETE_SUCCESS:
      return { deleting: false, success: true };
    case TASK_DELETE_FAIL:
      return { deleting: false, error: action.payload };
    default:
      return state;
  }
};
