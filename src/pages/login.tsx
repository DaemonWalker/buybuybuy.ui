import { message, Row, Spin } from "antd";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { OpenIdCallBack } from "../models/openIdCallBack";
import { tokenApi } from "../utils/apiUtil";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { login as dispatchLogin } from "../store/utils"
import { useState } from "react";
import { useMemo } from "react";



export const Login: FC = () => {
    let dispath = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    let query = useMemo(() => new URLSearchParams(window.location.search), []);

    let ids4Info: OpenIdCallBack = useMemo(() => ({
        Code: query.get("code") ?? "",
        scope: query.get("scope") ?? "",
        sessionState: query.get("sessionState") ?? "",
        redirectUrl: window.location.href.split('?')[0],
    }), [query]);
    const [login, setLogin] = useState(false);
    const [unauthorized, setUnzuthorized] = useState(false);

    useEffect(() => {
        if (ids4Info.Code === "") {
            (document.getElementById("frm") as any).submit();
        }
        else {
            tokenApi.openIdCallback(ids4Info).then(res => {
                if (res.isLogin) {
                    dispatchLogin({ ...res, isUnauthorized: false });
                    setLogin(true);
                    navigate("/");
                }
            }).catch(res => console.error("login", res));
        }
    }, [ids4Info, dispath])

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Spin indicator={(<Loading3QuartersOutlined style={{ fontSize: "10em" }} spin />)} />
            {!login && <form method="POST" id="frm" action={`/api/Oauth2/GotoAuthPage`}>
                <input type="hidden" value={window.location.href} name="redirectUrl"></input>
            </form>}
        </Row>
    );
}