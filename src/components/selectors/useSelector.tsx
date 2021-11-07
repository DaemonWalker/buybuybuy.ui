import { FC, useEffect, useState } from "react";
import { Select } from "antd";
import { SelectOptionModel } from "../../models/selectOption"
import { adminApi } from "../../utils/apiUtil"
import { SearchSelect } from "./searchSelect";

interface Props {
    width?: number,
    onChange?: (e?: string) => any;
}

export const UserSelector: FC<Props> = ({ onChange, width }) => {
    const [users, setUsers] = useState<SelectOptionModel[]>([]);

    useEffect(() => {
        adminApi.getAllUser().then(res => setUsers(res));
    })

    return (
        <SearchSelect onChange={onChange} options={users} />
    )
}