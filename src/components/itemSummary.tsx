import { FC, useState } from 'react'
import { Card, Button, Row, Typography, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import img from "../img/4.jpg"
const { Meta } = Card;
const { Title, Text } = Typography;
export const ItemSummary: FC = () => {
    const [loading, setLoading] = useState(false);
    return (
        <Card
            hoverable
            cover={<img alt="example" src={img} />}
        >
            <Row align="middle">
                <Col>
                    <Title level={3} type="danger">￥12.5</Title>
                </Col>
                <Col flex="auto">
                    <Text style={{ float: "right" }}>乐事薯片</Text>
                </Col>
            </Row>
            <Row>
                <Col flex="auto">
                    <Button type="default" style={{ float: "right" }}>买买买</Button>
                </Col>
            </Row>

        </Card>
    )
}