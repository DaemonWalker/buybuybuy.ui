import { FC } from "react";
import { ActivityCarousel } from "../components/activityCarousel";
import { ActivityItems } from "../components/activityItems"


export const Activity: FC = () => {
    return (
        <>
            <ActivityCarousel></ActivityCarousel>
            <ActivityItems></ActivityItems>
        </>
    )
}