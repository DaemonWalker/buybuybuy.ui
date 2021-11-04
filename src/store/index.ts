import { combineReducers, createStore, applyMiddleware } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { sidebarCollapsed } from "./reducers/sidebarCollapsed"

export const reducers = combineReducers({ sidebarCollapsed });
const store = createStore(reducers);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
