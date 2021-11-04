import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Sidebar } from './components/sidebar';
import { useStore } from 'react-redux';
import { appSelector, RootState } from './store';
import { Activity } from './pages/activity'
import { Route, Routes } from "react-router"


const { Header, Content, Footer, Sider } = Layout;

function App() {
    const collapsed = appSelector(s => s.sidebarCollapsed);
    return (
        <Layout>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: collapsed ? 40 : 200, minHeight: "100vh" }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        <Routes>
                            <Route path="/" element={<Activity />}></Route>
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default App
