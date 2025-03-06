import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const { Sider } = Layout;

export const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const users = [
    { name: "Іван Петров" },
    { name: "Марія Сидорова" },
    { name: "Олександра Гречко" },
  ];

  const menuItems = [
    {
      key: "/",
      icon: <UserOutlined />,
      label: <Link to="/">Головна</Link>,
    },
    {
      key: "/admin",
      icon: <VideoCameraOutlined />,
      label: <Link to="/admin">Адмін</Link>,
    },
    {
      key: "profile",
      icon: <UploadOutlined />,
      label: "Профіль",
      children: users.map((user) => ({
        key: `/profile?${user.name}`,
        label: <Link to={`/profile?${user.name}`}>{user.name}</Link>,
      })),
    },
  ];

  return (
    <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
    </Sider>
  );
};
