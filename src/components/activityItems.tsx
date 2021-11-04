import { FC, useState } from "react";
import { List, Card } from 'antd';
import { ItemSummary } from "./itemSummary";

export const ActivityItems: FC = () => {
    const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return (
        <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <ItemSummary></ItemSummary>
                </List.Item>
            )}
        />
    )
}