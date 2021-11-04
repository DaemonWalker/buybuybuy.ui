import { FC } from "react";
import { useStore } from 'react-redux';
import { appSelector, RootState } from '../store';
import { opSidebarCollapsed } from '../store/utils'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from "antd";

export const CollapaseButton: FC = () => {
    const collapsed = appSelector(s => s.sidebarCollapsed);
    const icon = collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
    return (
        <Button icon={icon} onClick={() => opSidebarCollapsed()} shape="circle" type="ghost" style={{ border: "none" }} />
    )
}