import { FC, ReactComponentElement, useEffect } from "react";
import { ActivityCarousel } from "../components/activityCarousel";
import { ActivityItems } from "../components/activityItems"
import { activityApi } from "../utils/apiUtil"
import { setActivity } from "../store/utils"
import { appSelector } from "../store";
import { Loading } from "../components/loading"

export const Activity: FC = () => {
    let sense: FC;
    const actId = appSelector(s => s.activity.id);
    useEffect(() => {
        activityApi.getLiveActivity().then(res => setActivity(res));
    }, [])
    // useEffect(() => {
    //     if (actId == -1) {
    //         sense = () => (<>meiyouqianggou</>);
    //     }
    // }, [actId])

    const dataSense = (
        <>
            <ActivityCarousel></ActivityCarousel>
            <ActivityItems actId={actId}></ActivityItems>
        </>
    )

    const loadingSense = (<Loading></Loading>)

    const noDataSense = (<>meiyou</>);

    return (
        actId == -1 ? noDataSense : actId == 0 ? loadingSense : dataSense
    )
}