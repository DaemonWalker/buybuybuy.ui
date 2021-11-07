import { FC, useEffect, useRef, useState } from "react";
import { Input, Row, Space, Col } from 'antd';
import { BoughtModel } from "../models/bought";
import { userApi } from "../utils/apiUtil"
import { BoughtList } from "../components/boughtList"
import { ActivitySelector } from "../components/selectors/activitySelector"
const { Search } = Input;

export const MyBought: FC = () => {
    const [actId, setActId] = useState(-1);
    const [searchItemName, setSearchItemName] = useState("");
    const txtSearch = useRef<Input>(null);
    useEffect(() => {
        if (actId === -1) {
            return;
        }
        userApi.getMyBought(actId).then(res => {
            setSearchItemName("");
            txtSearch.current?.setValue("");
        });
    }, [actId])

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
                        <ActivitySelector onChange={e => setActId(parseInt(e?.toString() ?? "-1"))}></ActivitySelector>
                    </Space>
                </Col>
            </Row>
            {
                actId !== -1 &&
                <Row>
                    <Col span={24}>
                        <BoughtList activityId={actId} filterItemName={searchItemName}></BoughtList>
                    </Col>
                </Row>
            }
        </div >
    );
}