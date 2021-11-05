import { FC } from "react";
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { message, Row, Spin } from "antd";

export const Loading: FC = () => {
    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Spin indicator={(<Loading3QuartersOutlined style={{ fontSize: "10em" }} spin />)} />
        </Row>
    )
}