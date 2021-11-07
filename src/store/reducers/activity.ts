import { ActivityModel } from "../../models/activity";

export interface ActivityAction {
    type: "ACTIVITY_SET"
    payload: ActivityModel
}

export default (state: ActivityModel | undefined, action: ActivityAction): ActivityModel => {
    if (!state) {
        return {
            id: 0,
            name: '',
            start: '',
            end: '',
            isStart: false,
            startDate: new Date(Date.parse("2000-1-1"))
        };
    }

    switch (action.type) {
        case "ACTIVITY_SET":
            return { ...action.payload };
        default:
            return state;
    }
}