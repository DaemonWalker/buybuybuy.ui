import React, { FC } from "react";
import { AppDispatch, appSelector, RootState } from "../store";
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, UploadOutlined, VideoCameraOutlined, } from '@ant-design/icons';
import { useDispatch, useStore } from "react-redux";
import { opSidebarCollapsed } from '../store/utils'
import { CollapaseButton } from './collapaseButton'

import '../App.css'

const { Header, Content, Footer, Sider } = Layout;

export const Sidebar: FC = () => {
    const collapsed = appSelector(s => s.sidebarCollapsed); //appSelector(s => s.sidebarCollapsed);
    const dispatch = useDispatch<AppDispatch>()
    return (
        <Sider
            collapsed={collapsed}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                background: "#005bac",
            }}
            collapsedWidth={40}
        >
            {/* <div className="logo" style={{ height: collapsed ? 40 : 64 }}>
                <CollapaseButton />
            </div> */}
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{ background: "#005bac" }} selectedKeys={["1"]}>
                <Menu.Item icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => opSidebarCollapsed()} />
            </Menu>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{ background: "#005bac" }}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    购买记录
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    秒杀活动
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    {`${collapsed}`}
                </Menu.Item>
            </Menu>
        </Sider>
    )
}