import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  addTaskReducer,
  updateTaskReducer,
  listTaskReducer,
  TaskDeleteReducer,
} from "./reducers/todoReducers";

const reducer = combineReducers({
  addTask: addTaskReducer,
  updateTask: updateTaskReducer,
  listTask: listTaskReducer,
  TaskDelete: TaskDeleteReducer,
});
const composeEnhancer = compose;
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
