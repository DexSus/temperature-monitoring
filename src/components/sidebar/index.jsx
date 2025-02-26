import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const users = [
    { name: 'Іван Петров' },
    { name: 'Марія Сидорова' },
    { name: 'Олександра Гречко' },
    // більше користувачів
  ];
  

  return (
    <Sider className='sidebar' trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/" icon={<UserOutlined />}>
          <Link to="/">Головна</Link>
        </Menu.Item>
        <Menu.Item key="/admin" icon={<VideoCameraOutlined />}>
          <Link to="/admin">Адмін</Link>
        </Menu.Item>
        <SubMenu key="profile" icon={<UploadOutlined />} title="Профіль">
          {users.map(user => (
            <Menu.Item key={`/profile?${user.name}`}>
              <Link to={`/profile?${user.name}`}>{user.name}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </Sider>
  );
};
