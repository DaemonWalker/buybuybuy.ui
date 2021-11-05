import { FC, useState } from 'react'
import { Card, Button, Row, Typography, Col, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import img from "../img/4.jpg"
import { ItemModel } from "../models/itemModel"
import { itemApi } from "../utils/apiUtil"
import { appSelector } from '../store';
import { BuyModel } from '../models/buy';

const { Meta } = Card;
const { Title, Text } = Typography;

interface Props {
    item: ItemModel;
    activityStarted: boolean,
}

export const ItemSummary: FC<Props> = ({ item, activityStarted }) => {
    const [loading, setLoading] = useState(false);
    const activity = appSelector(s => s.activity);
    const [buying, setBuying] = useState(false);
    const [disable, setDisable] = useState(activityStarted);
    const buyItem = () => {
        setBuying(true);
        const buy: BuyModel = { activityId: activity.id, itemId: item.itemId, quantity: 1, }
        itemApi.buyItem(buy).then(res => {
            setDisable(true);
            setBuying(false);
            if (res === "抢购成功") {
                message.success(`成功抢到${item.name}`);
            }
            else if (res === "您已经买过了") {
                message.error(`您已经买过${item.name}了`)
            }
            else if (res === "运气不好，已经被抢光了") {
                message.error(`运气不好，${item.name}已经被抢光了`)
            }
            else if (res === "购买数量超过个人单品上限，已为您自动抢购了剩余商品") {
                message.warn(`购买${item.name}超过个人单品上限，已为您自动抢购了剩余商品`)
            }
            else if (res === "库存不足，以为您抢到了最大数量") {
                message.warn(`${item.name}库存不足，以为您抢到了最大数量`)
            }
            else {
                message.error("服务器错误")
                setDisable(false);
            }
        })
    }
    return (
        <Card
            hoverable
            cover={<img alt="example" src={item.url} />}
        >
            <Row align="middle">
                <Col>
                    <Title level={3} type="danger">{`￥${item.price}`}</Title>
                </Col>
                <Col flex="auto">
                    <Text style={{ float: "right" }}>{item.name}</Text>
                </Col>
            </Row>
            <Row>
                <Col flex="auto">
                    <Button type="default" style={{ float: "right" }}
                        onClick={() => buyItem()} loading={buying} disabled={disable}>买买买</Button>
                </Col>
            </Row>

        </Card>
    )
}