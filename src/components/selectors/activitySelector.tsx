import { FC, useEffect, useState } from "react";
import { Select } from "antd";
import { SearchSelect } from "./searchSelect"
import { SelectOptionModel } from "../../models/selectOption";
import { activityApi } from "../../utils/apiUtil";

interface Props {
    onChange?: (e?: string) => any;
    width?: number,
}

export const ActivitySelector: FC<Props> = ({ onChange, width }) => {
    const [acts, setActs] = useState<SelectOptionModel[]>([]);

    useEffect(() => {
        activityApi.getAllActivities().then(res => {
            const options = res.map(
                item => ({
                    label: `${item.name} ${item.start}~${item.end}`,
                    key: item.id.toString(),
                    value: item.id.toString(),
                })
            )
            setActs(options);
        })
    }, []);

    return (
        <SearchSelect onChange={onChange} options={acts} width={width ?? 420} />
    )
}