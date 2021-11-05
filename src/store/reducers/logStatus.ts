import { LoginInfo } from "../../models/loginInfo"
import { LoginInfoCache } from '../../utils/cacheUtil'

export interface LogStatusAction {
    type: "LOGIN" | "LOGOUT",
    payload: LoginInfo
}

export default (state: LoginInfo | undefined, action: LogStatusAction) => {
    state = state ?? LoginInfoCache.getLoginInfo();
    switch (action.type) {
        case "LOGIN":
            LoginInfoCache.setLoginInfo(action.payload)
            return {
                ...state,
                ...action.payload
            };
        case "LOGOUT":
            return {
                ...state,
                isLogin: false,
            }
        default:
            return state;
    }
}