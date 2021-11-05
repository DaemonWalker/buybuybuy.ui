import { LoginInfo } from "../models/loginInfo"

const getLoginInfo = (): LoginInfo => {
    let info = new LoginInfo();
    info.refreshToken = localStorage.getItem("refreshToken") ?? "";
    info.role = localStorage.getItem("role") ?? "";
    info.token = localStorage.getItem("token") ?? "";
    if (info.token !== "") {
        info.isLogin = true;
        info.isUnauthorized = localStorage.getItem("isUnauthorized") === "true";
    }
    return info;
}

const setLoginInfo = (info: LoginInfo) => {
    localStorage.setItem("refreshToken", info.refreshToken);
    localStorage.setItem("role", info.role);
    localStorage.setItem("token", info.token);
    localStorage.setItem("isUnauthorized", info.isUnauthorized.toString());
}

const getToken = (): string => localStorage.getItem("token") ?? "";

export const LoginInfoCache = { setLoginInfo, getLoginInfo, getToken }