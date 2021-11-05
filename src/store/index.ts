import { combineReducers, createStore, applyMiddleware } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { sidebarCollapsed } from "./reducers/sidebarCollapsed"
import logStatus from './reducers/logStatus'
import activity from './reducers/activity'

export const reducers = combineReducers({ sidebarCollapsed, logStatus, activity });
const store = createStore(reducers);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
