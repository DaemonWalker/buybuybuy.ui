import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Sidebar } from './components/sidebar';
import { useStore } from 'react-redux';
import { appSelector, RootState } from './store';
import { Activity } from './pages/activity'
import { Route, Routes, useNavigate } from "react-router-dom"
import { MyBought } from "./pages/myBought"
import { AllBought } from './pages/allBought';


const { Header, Content, Footer, Sider } = Layout;

function App() {
    const collapsed = appSelector(s => s.sidebarCollapsed);
    const login = appSelector(s => s.logStatus.isLogin);
    const navigate = useNavigate();
    useEffect(() => {
        if (!login) {
            navigate("/login")
        }
    }, [login])
    return (
        <Layout>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: collapsed ? 40 : 200, minHeight: "100vh" }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        <Routes>
                            <Route path="/bought" element={<MyBought />}></Route>
                            <Route path="/allbought" element={<AllBought />} />
                            <Route path="/" element={<Activity />}></Route>
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>买买买 &copy;2018~2021 流通业务二部 技术委员会</Footer>
            </Layout>
        </Layout >
    )
}

export default App
