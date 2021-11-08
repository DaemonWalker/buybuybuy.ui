import { FC, useEffect, useMemo, useState } from 'react'
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
}

export const ItemSummary: FC<Props> = ({ item }) => {
    const activity = appSelector(s => s.activity);
    const [buying, setBuying] = useState(false);
    const activityStarted = appSelector(s => s.activity.isStart);
    const [disable, setDisable] = useState(!activityStarted);
    const [buttonText, setButtonText] = useState("");
    useEffect(() => {
        if (activityStarted) {
            setButtonText("买买买");
            setDisable(!activityStarted);
        }
        else {
            setButtonText("还未到抢购时间")
            setDisable(!activityStarted);
        }
    }, [activityStarted]);
    const buyItem = () => {
        setBuying(true);
        const buy: BuyModel = { activityId: activity.id, itemId: item.itemId, quantity: 1, }
        itemApi.buyItem(buy).then(res => {
            setDisable(true);
            setBuying(false);

            if (res.result === 0) {
                message.success(res.message);
            }
            else {
                message.error(res.message);
            }
        })
    }
    return (
        <Card hoverable={!disable} cover={<img alt="example" src={item.url} />}>
            <Row align="middle">
                <Col>
                    <Title level={3} type="danger">{`￥${item.price}`}</Title>
                </Col>
                <Col flex="auto">
                    <Text style={{ float: "right" }}>{item.name}</Text>
                </Col>
            </Row>
            <Row justify="center" align="middle">
                <Col>
                    <Text>{`共${item.inventory}件 限购${item.userLimit}件`}</Text>
                </Col>
                <Col flex="auto">
                    <Button type="default" style={{ float: "right" }}
                        onClick={(e) => { buyItem(); e.preventDefault(); }}
                        loading={buying} disabled={disable}>
                        {buttonText}
                    </Button>
                </Col>
            </Row>

        </Card>
    )
}