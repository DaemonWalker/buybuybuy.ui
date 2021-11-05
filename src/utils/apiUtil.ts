import { ItemModel } from "../models/itemModel";
import { LoginInfo } from "../models/loginInfo";
import { ActivityModel } from "../models/activity";
import { BoughtModel } from "../models/bought";
import { BuyModel } from "../models/buy";
import { OpenIdCallBack } from "../models/openIdCallBack";
import { logout } from "../store/utils";
import { LoginInfoCache } from "./cacheUtil";


const openIdCallback = (openIdInfo: OpenIdCallBack): Promise<LoginInfo> => {
    let res = post("/api/Oauth2/CallBack", openIdInfo)
        .then(res => res.ok ? res.json() : new LoginInfo()).then((res: LoginInfo) => {
            if (res.token && res.token !== "") {
                res.isLogin = true;
            }
            return res;
        }).catch(err => err.toString());
    return res;
}

const getLoginPage = (callBack: string): Promise<string> => {
    return get(`/api/Oauth2/GotoAuthPage?redirectUrl=${callBack}`).then(res => {
        return res.ok ? res.text() : "";
    }).then(res => res.toString()).catch(err => err);
}

const refreshToken = (refreshToken: string): Promise<string> => {
    return post(`/api/Authentication/RefreshToken`,
        createHeader({ body: JSON.stringify({ refreshToken }) })).then(res => res.text());
}

const getLiveActivity = (): Promise<ActivityModel> => {
    return get('/api/Activity/GetCurrentActivity').then(res => res.json()).then(res => res as ActivityModel);
}

const getActivityItems = (actId: number): Promise<ItemModel[]> => {
    return post('/api/Activity/GetAllItems', actId).then(res => res.json()).then(res => res as ItemModel[]);
}


const buyItem = (buy: BuyModel): Promise<string> => {
    return post('/api/Sell/BuyItem', buy).then(res => res.text());
}

const getMyBought = (actId: number): Promise<BoughtModel[]> => {
    return post("/api/user/GetMyBought", actId).then(res => res.json()).then(res => res as BoughtModel[]);
}

const getAllBought = (actId: number): Promise<BoughtModel[]> => {
    return post("/api/Admin/GetAllBought", actId).then(res => res.json()).then(res => res as BoughtModel[]);
}


const getAllActivities = (): Promise<ActivityModel[]> => {
    return get("/api/activity/GetAllActivities").then(res => res.json()).then(res => res as ActivityModel[]);
}

export const tokenApi = { getLoginPage, openIdCallback, refreshToken };
export const activityApi = { getLiveActivity, getActivityItems, getAllActivities };
export const itemApi = { buyItem };
export const userApi = { getMyBought }
export const adminApi = { getAllBought }


const checkResponseOk = (res: Response): Promise<boolean> => {
    return res.text().then(text => text === "ok");
}

const createHeader = (opt?: RequestInit): RequestInit => {
    opt = opt ?? {};
    opt.headers = {
        "Authorization": `Bearer ${LoginInfoCache.getToken()}`,
        ...opt.headers,
    }

    return opt;
}

const createPostHeader = (data?: any, opt?: RequestInit): RequestInit => {
    let newOpt = {
        "body": JSON.stringify(data),
        ...opt,
        headers: {
            "content-type": "application/json",
            ...opt?.headers
        },
        "method": "POST",
    }
    return createHeader(newOpt);
}

const post = (url: string, data?: any, param?: RequestInit) => {
    return _fetch(url, createPostHeader(data, param));
}

const get = (url: string, param?: RequestInit) => {
    return _fetch(url, createHeader(param));
}

const _fetch = (url: string, param?: RequestInit) => {
    return fetch(url, param).then(res => {
        if (res.status === 401) {
            logout();
        }
        return res;
    });
}