import { FC, useEffect, useMemo, useState } from "react";
import { BoughtModel } from "../models/bought";
import { List, Avatar, Button, Skeleton, Row, Image, Typography, Space, Col } from 'antd';
import { appSelector } from "../store";
import { adminApi } from "../utils/apiUtil";

const { Title, Paragraph, Text } = Typography;

interface Props {
    showUserInfo?: boolean,
    filterItemName?: string,
    filterFunc?: (e: BoughtModel) => boolean,
    activityId: number,
}

export const BoughtList: FC<Props> = ({ activityId,
    filterItemName, showUserInfo, filterFunc }) => {
    useEffect(() => {
        if (activityId === -1) {
            return;
        }
        adminApi.getAllBought(activityId).then(res => {
            setData(res);
            setLoading(false);
        });
    }, [])
    const [data, setData] = useState<BoughtModel[]>([]);
    const [loading, setLoading] = useState(true);
    const displayData = useMemo(() => {
        if (filterFunc) {
            return data.filter(item => filterFunc(item))
        }
        if (filterItemName) {
            return data.filter(p => p.item.name.indexOf(filterItemName) >= 0)
        }
        return data;
    }, [data, filterItemName, filterFunc])
    return (
        <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={displayData}
            renderItem={item =>
                <List.Item>
                    <Row style={{ width: "100%" }} gutter={[20, 0]} align="middle" justify="center">
                        <Col>
                            <Image preview={false} src={item.item.url} style={{ maxHeight: 100 }}></Image>
                        </Col>
                        <Col>
                            <Title level={5}>{item.item.name}</Title>
                            <div style={{ width: "100%", textAlign: "left" }}>
                                <Text type="secondary">{`价格:${item.item.price}`}</Text>
                            </div>
                            <div style={{ width: "100%", textAlign: "left" }}>
                                <Text type="secondary">{`购买数量:${item.quantity}`}</Text>
                            </div>
                        </Col>
                        <Col flex="auto">
                            <div style={{ float: "right", alignItems: "start", textAlign: "end" }}>
                                {showUserInfo && (<div>{`${item.user.id}-${item.user.name}`}</div>)}
                                <div >{item.time}</div>
                            </div>
                        </Col>
                    </Row>
                </List.Item >
            }
            footer={
                <Row justify="end" align="middle" gutter={[10, 0]}>
                    <Col>
                        <Text>总金额</Text>
                    </Col>
                    <Col>
                        <Title level={4} style={{ margin: 0 }} type="danger">
                            {`￥${displayData.map(p => p.item.price * p.quantity).reduce((p, n) => p + n, 0)}`}
                        </Title>
                    </Col>
                </Row>
            }
        />
    );
}