import { ActivityModel } from "../../models/activity";

export interface ActivityAction {
    type: "ACTIVITY_SET"
    payload: ActivityModel
}

export default (state: ActivityModel | undefined, action: ActivityAction): ActivityModel => {
    if (!state) {
        return { id: 0, name: '', start: '', end: '', isStart: false };
    }
    switch (action.type) {
        case "ACTIVITY_SET":
            return { ...action.payload };
        default:
            return state;
    }
}