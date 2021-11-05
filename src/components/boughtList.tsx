import { FC, useState } from "react";
import { BoughtModel } from "../models/bought";
import { List, Avatar, Button, Skeleton, Row, Image, Typography, Space, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;

interface Props {
    data: BoughtModel[],
    loading: boolean,
    isAdmin?: boolean,
    filter?: string
}

export const BoughtList: FC<Props> = ({ data, loading, isAdmin, filter }) => {
    const [admin, setAdmin] = useState(isAdmin ? isAdmin : false);
    const displayData = filter ? data.filter(p => p.item.name.indexOf(filter) >= 0) : data;
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
                                {isAdmin ? (<div>124</div>) : (<></>)}
                                <div >{item.time}</div>
                            </div>
                        </Col>
                    </Row>
                </List.Item >
            }
            footer={
                <Row justify="end" align="middle">
                    <Col>
                        <Text>总金额</Text>
                    </Col>
                    <Col>
                        <Title level={5} style={{ margin: 0 }}>
                            {`￥${displayData.map(p => p.item.price * p.quantity).reduce((p, n) => p + n, 0)}`}
                        </Title>
                    </Col>
                </Row>
            }
        />
    );
}