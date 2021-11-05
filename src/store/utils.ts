import store from "."
import { ActivityModel } from "../models/activity"
import { LoginInfo } from "../models/loginInfo"
const setSidebarCollapsed = (collapsed: boolean) => {
    store.dispatch({
        type: "SIDEBAR_SET",
        payload: collapsed,
    })
}

const opSidebarCollapsed = () => {
    store.dispatch({
        type: "SIDEBAR_OP",
        payload: true,
    })
}

const login = (info: LoginInfo) => {
    store.dispatch({
        type: "LOGIN",
        payload: info
    });
}
const logout = () => {
    store.dispatch({
        type: "LOGOUT",
        payload: new LoginInfo()
    });
}

const setActivity = (act: ActivityModel) => {
    store.dispatch({
        type: "ACTIVITY_SET",
        payload: act
    });
}

export { setSidebarCollapsed, opSidebarCollapsed, logout, login, setActivity };