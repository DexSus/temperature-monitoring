import './App.css';
import React, { useEffect, useState } from 'react';
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
import { getAllUsers, updateDeviceStatus } from './api/api';

const { Header: AntHeader, Content } = Layout;

const customTheme = {
  token: {
    colorPrimary: '#00A76F',
    colorBgBase: '#FFFFFF',
    colorTextBase: '#000000',
  },
};

// Початковий масив devices
// const initialDevices = [
//   { id: 1, fullName: 'Іван Петров', sensorNumber: 'A123', bodyTemperature: 36.5, isOnline: true },
//   { id: 2, fullName: 'Марія Сидорова', sensorNumber: 'B456', bodyTemperature: 36.9, isOnline: false },
//   { id: 3, fullName: 'Олександра Гречко', sensorNumber: 'C789', bodyTemperature: 37.5, isOnline: true },
//   { id: 4, fullName: 'Володимир Мельник', sensorNumber: 'D012', bodyTemperature: 38.5, isOnline: true },
//   { id: 5, fullName: 'Анна Ковальчук', sensorNumber: 'E345', bodyTemperature: 39.5, isOnline: false },
//   { id: 6, fullName: 'Дмитро Козак', sensorNumber: 'F567', bodyTemperature: 37.2, isOnline: true },
//   { id: 7, fullName: 'Юлія Шевченко', sensorNumber: 'G678', bodyTemperature: 38.1, isOnline: true },
//   { id: 8, fullName: 'Петро Василенко', sensorNumber: 'H789', bodyTemperature: 39.0, isOnline: false },
// ];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers(); 

        const formattedDevices = users.map((user) => ({
          id: user.id, 
          fullName: user.fullName,
          sensorNumber: user.device?.sensorNumber || 'N/A', 
          bodyTemperature: user.currentTemperature,
          isOnline: user.device?.isOnline || false, 
          ipAdress: user.device?.ipAddress || 'N/A',
          deviceId: user.device?.uuid || 'N/A',
          device: user.device || null,
        }));

        setDevices(formattedDevices); 
      } catch (error) {
        console.error('Помилка при отриманні користувачів:', error);
      }
    };

    fetchUsers();
  }, []);

  const updateDevice = async (deviceId, updates) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.deviceId === deviceId ? { ...device, ...updates } : device,
      ),
    );

    if (updates.isOnline !== undefined) {
      try {
        await updateDeviceStatus(deviceId, updates.isOnline);
      } catch (error) {
        console.error('Failed to update device status in DB:', error);
      }
    }
  };

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
              <Content style={{ padding: '24px' }}>
                <Routes>
                  <Route path="/" element={<MainPage devices={devices} updateDevice={updateDevice}/>} />
                  <Route path="/admin" element={<AdminPage devices={devices} setDevices={setDevices} />} />
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