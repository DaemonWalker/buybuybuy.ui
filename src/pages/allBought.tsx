import React, { createRef, FC, useEffect, useRef, useState } from "react";
import { Input, Select, Button, Skeleton, Row, Image, Typography, Space, Col, Checkbox } from 'antd';
import { BoughtModel } from "../models/bought";
import { activityApi, adminApi, userApi } from "../utils/apiUtil"
import { BoughtList } from "../components/boughtList"
import { ActivityModel } from "../models/activity";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

export const AllBought: FC = () => {
    const [data, setData] = useState<BoughtModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [actId, setActId] = useState(-1);
    const [searchText, setSearchText] = useState("");
    const [acts, setActs] = useState<{ label: string, key: string, value: string }[]>([]);
    const txtSearch = useRef<Input>(null);
    useEffect(() => {
        if (actId === -1) {
            return;
        }
        adminApi.getAllBought(actId).then(res => {
            setData(res);
            setLoading(false);
            setSearchText("");
            console.log(txtSearch.current);
            txtSearch.current?.setValue("");
        });
    }, [actId])
    useEffect(() => {
        activityApi.getAllActivities().then(res => {
            const options = res.map(
                item => ({
                    label: `${item.name} ${item.start}~${item.end}`,
                    key: item.id.toString(),
                    value: item.id.toString()
                })
            )
            setActs(options);
        })
    }, []);
    return (
        <div style={{ width: "100%" }}>
            <Row gutter={[0, 20]} justify="end" align="bottom">
                <Col>
                    <Search placeholder="输入物品名进行搜索" onSearch={e => setSearchText(e)}
                        ref={txtSearch} style={{ width: 300 }} />
                </Col>
                <Col flex="auto">
                    <Space size="middle" style={{ float: "right" }}>
                        <span>请选择秒杀活动</span>
                        <Select onChange={e => setActId(parseInt(e?.toString() ?? "-1"))}
                            options={acts} style={{ width: 480, }}></Select>
                    </Space>
                </Col>
            </Row>
            {
                actId !== -1 &&
                <Row>
                    <Col span={24}>
                        <BoughtList data={data} loading={loading} isAdmin={true} filter={searchText}></BoughtList>
                    </Col>
                </Row>
            }
        </div >
    );
}