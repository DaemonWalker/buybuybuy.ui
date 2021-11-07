import { FC, useEffect, useState } from "react";
import { Select } from "antd";
import { SelectOptionModel } from "../../models/selectOption"
import { adminApi } from "../../utils/apiUtil"

export interface Props {
    onChange?: (e?: string) => void;
    width?: number,
    options: SelectOptionModel[]
}

export const SearchSelect: FC<Props> = ({ onChange, width, options }) => {

    const filter = (input: string, label: string) =>
        label.toLowerCase().indexOf(input.toLowerCase()) >= 0

    return (
        <Select onChange={e => onChange?.(e?.toString())} options={options}
            style={{ width: width ?? 200 }} showSearch
            filterOption={(val, opt) => filter(val, opt?.label?.toString() ?? "")}
        />
    )
}