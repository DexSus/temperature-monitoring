import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Button, ConfigProvider } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { MainPage } from './page/main_page';
import { AdminPage } from './page/admin_page';
import { ProfilePage } from './page/profile_page';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Sidebar } from './components/sidebar';
import { ErrorPage } from './page/error_page';

const { Header: AntHeader, Content } = Layout;

const customTheme = {
  token: {
    colorPrimary: '#00A76F',
    colorBgBase: '#FFFFFF',
    colorTextBase: '#000000',
  },
};

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Router>
        <div className="container">
          <Header />
          <Layout className="main-layout">
            <Sidebar collapsed={collapsed} />
            <Layout className="site-layout">
              <AntHeader className="site-layout-background" style={{ padding: 0, backgroundColor: '#fff' }}>
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={toggleSidebar}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
              </AntHeader>
              <Content style={{padding: '24px'}}>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
          <Footer />
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
