import { combineReducers, createStore } from "redux";
import AppReducer from "./domains/App/AppReducer";

const rootReducer = combineReducers({
  app: AppReducer,
});

const reducer = (state, action) => {
  const newState = rootReducer(state, action);
  return newState;
};

export const store = createStore(reducer);
