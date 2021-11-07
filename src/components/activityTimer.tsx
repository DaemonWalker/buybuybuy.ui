import { FC, useEffect, useMemo, useState } from "react";
import { Row, Col, Statistic, Typography } from "antd";
import { Alert } from 'antd';
import { appSelector } from "../store";
import { setActivity } from "../store/utils";

const { Title } = Typography;

const { Countdown } = Statistic;

interface State {
    countDown: string,
    text: string,
    color: "warning" | "error" | "success"
}

export const ActivityTimer: FC = () => {
    const onFinish = () => {
        setActivity({ ...activity, isStart: !activity.isStart });
    }
    const activity = appSelector(s => s.activity);
    const state = useMemo<State>(() => {
        if (activity.isStart) {
            return {
                countDown: activity.end,
                text: "抢购正在进行中",
                color: "success",
            }
        }
        else {
            return {
                countDown: activity.start,
                text: "抢购马上开始",
                color: "success",
            }
        }
    }, [activity])
    return (
        <Row justify="center" align="middle">
            <Col>
                <Alert type={state.color} message={
                    <Countdown title={<Title level={3} type="danger">{state.text}</Title>} value={state.countDown} format="HH:mm:ss:SSS"
                        onFinish={onFinish} />
                } />
            </Col>
        </Row >
    )
}