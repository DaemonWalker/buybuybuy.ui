import React, { createRef, FC, useEffect, useRef, useState } from "react";
import { Input, Select, Button, Skeleton, Row, Image, Typography, Space, Col, Checkbox } from 'antd';
import { BoughtModel } from "../models/bought";
import { activityApi, adminApi, userApi } from "../utils/apiUtil"
import { BoughtList } from "../components/boughtList"
import { ActivityModel } from "../models/activity";
import { SelectOptionModel } from "../models/selectOption";
import { ActivitySelector } from "../components/selectors/activitySelector";
import { UserSelector } from "../components/selectors/useSelector";

const { Search } = Input;
const { Option } = Select;

export const AllBought: FC = () => {

    const [actId, setActId] = useState(-1);
    const [searchItemName, setSearchItemName] = useState("");
    const [searchUser, setSearchUser] = useState<string>();
    const filter = (bought: BoughtModel): boolean => {
        var result = true;
        if (searchItemName) {
            result = result && bought.item.name.indexOf(searchItemName) >= 0;
        }
        if (result && searchUser) {
            result = result && (searchUser === bought.user.id);
        }
        return result;
    }

    const txtSearch = useRef<Input>(null);



    return (
        <div style={{ width: "100%" }}>
            <Row gutter={[0, 20]} justify="end" align="bottom">
                <Col>
                    <Search placeholder="输入物品名进行搜索" onSearch={e => setSearchItemName(e)}
                        ref={txtSearch} style={{ width: 300 }} />
                </Col>
                <Col flex="auto">
                    <Space size="middle" style={{ float: "right" }}>
                        <span>活动</span>
                        <ActivitySelector onChange={e => setActId(parseInt(e ?? "-1"))} />
                        <span>人员</span>
                        <UserSelector onChange={e => setSearchUser(e)}></UserSelector>
                    </Space>
                </Col>
            </Row>
            {
                actId !== -1 &&
                <Row>
                    <Col span={24}>
                        <BoughtList activityId={actId} showUserInfo filterFunc={filter} />
                    </Col>
                </Row>
            }
        </div >
    );
}