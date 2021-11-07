import { FC, ReactComponentElement, useEffect } from "react";
import { ActivityCarousel } from "../components/activityCarousel";
import { ActivityItems } from "../components/activityItems"
import { ActivityTimer } from "../components/activityTimer"
import { activityApi } from "../utils/apiUtil"
import { setActivity } from "../store/utils"
import { appSelector } from "../store";
import { Loading } from "../components/loading"
import { Col, Row, Space } from "antd";

export const Activity: FC = () => {
    let sense: FC;
    const actId = appSelector(s => s.activity.id);
    useEffect(() => {
        activityApi.getLiveActivity().then(res => setActivity(res));
    }, [])

    const dataSense = (
        <Row gutter={[0, 20]} justify="center" align="middle">
            <Col span={24}>
                <ActivityCarousel></ActivityCarousel>
            </Col>
            <Col>
                <ActivityTimer></ActivityTimer>
            </Col>
            <Col>
                <ActivityItems actId={actId}></ActivityItems>
            </Col >
        </Row >
    )

    const loadingSense = (<Loading></Loading>)

    const noDataSense = (<>meiyou</>);

    return (
        actId == -1 ? noDataSense : actId == 0 ? loadingSense : dataSense
    )
}