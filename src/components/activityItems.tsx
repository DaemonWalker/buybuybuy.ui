import { FC, useEffect, useState } from "react";
import { List, Card } from 'antd';
import { ItemSummary } from "./itemSummary";
import { appSelector } from "../store";
import { ItemModel } from "../models/itemModel";
import { activityApi } from "../utils/apiUtil"

interface Props {
    actId: number
}

export const ActivityItems: FC<Props> = ({ actId }) => {
    const [data, setData] = useState<ItemModel[]>([]);
    useEffect(() => {
        activityApi.getActivityItems(actId).then(res => setData(res));
    }, [])
    return (
        <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <ItemSummary item={item}></ItemSummary>
                </List.Item>
            )}
        />
    )
}