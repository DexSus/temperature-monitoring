import React, { useState } from "react";
import { Upload, Button, Input, Form, Tabs, Typography, Space, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./style.css";
import userPhoto from "../../assets/img/user.png";
import { CurrentTemperatureCard } from "../../components/temperature_card/index";
import { TemperatureLineChart } from "../../components/temperature_linechart";
import { DailyTemperatureChart } from "../../components/temperature_daily_linechart";
import { TemperatureDoughnutChart } from "../../components/temperature_doughnut_chart";

export const ProfilePage = () => {
  const [user, setUser] = useState({
    photo: userPhoto,
    fullName: "Ім'я Прізвище",
    additionalInfo: "Додаткова інформація про користувача...",
    sensorNumber: "",
  });

  const handlePhotoChange = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUser({ ...user, photo: e.target.result });
    };
    reader.readAsDataURL(file.originFileObj);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    console.log("Дані збережено:", user);
  };

  const hourlyData = [
    { time: '00:00', temperature: 20 },
    { time: '01:00', temperature: 19.5 },
    { time: '02:00', temperature: 19 },
    { time: '03:00', temperature: 18.5 },
    { time: '04:00', temperature: 18 },
    { time: '05:00', temperature: 17.5 },
    { time: '06:00', temperature: 17 },
    { time: '07:00', temperature: 18 },
    { time: '08:00', temperature: 20 },
    { time: '09:00', temperature: 22 },
    { time: '10:00', temperature: 24 },
    { time: '11:00', temperature: 26 },
    { time: '12:00', temperature: 28 },
    { time: '13:00', temperature: 29 },
    { time: '14:00', temperature: 30 },
    { time: '15:00', temperature: 30.5 },
    { time: '16:00', temperature: 30 },
    { time: '17:00', temperature: 28 },
    { time: '18:00', temperature: 26 },
    { time: '19:00', temperature: 24 },
    { time: '20:00', temperature: 22 },
    { time: '21:00', temperature: 21 },
    { time: '22:00', temperature: 20.5 },
    { time: '23:00', temperature: 20 }
  ];

  const dailyData = [
    { date: '2025-02-01', averageTemperature: 20.5 },
    { date: '2025-02-02', averageTemperature: 21 },
    { date: '2025-02-03', averageTemperature: 22 },
    { date: '2025-02-04', averageTemperature: 23 },
    { date: '2025-02-05', averageTemperature: 24 },
    { date: '2025-02-06', averageTemperature: 23.5 },
    { date: '2025-02-07', averageTemperature: 21.5 },
    { date: '2025-02-08', averageTemperature: 20 },
    { date: '2025-02-09', averageTemperature: 19.5 },
    { date: '2025-02-10', averageTemperature: 20 },
    { date: '2025-02-11', averageTemperature: 21 },
    { date: '2025-02-12', averageTemperature: 22 },
    { date: '2025-02-13', averageTemperature: 23 },
    { date: '2025-02-14', averageTemperature: 24 },
    { date: '2025-02-15', averageTemperature: 23.5 }
  ];

  const data = {
    labels: ['0–10°C', '11–20°C', '21–30°C', '31–40°C'],
    datasets: [
      {
        data: [2, 5, 10, 7],
        backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
        hoverBackgroundColor: ['#ff6666', '#3399ff', '#66ff66', '#ff9966'],
      },
    ],
  };

  const tabItems = [
    {
      key: "1",
      label: "Особиста інформація",
      children: (
        <Card className="profile-card">
          <Space
            className="profile_content"
            direction="vertical"
            size="large"
            align="center"
          >
            <div className="profile-photo-container">
              <img src={user.photo} alt="Профіль" className="profile-photo" />
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handlePhotoChange}
              >
                <Button
                  icon={<UploadOutlined />}
                  className="change-photo-button"
                >
                  Змінити фото
                </Button>
              </Upload>
            </div>
            <Form layout="vertical" className="profile-form">
              <Form.Item label="Повне ім'я">
                <Input
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item label="Номер датчика">
                <Input
                  name="sensorNumber"
                  value={user.sensorNumber}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item label="Додаткова інформація">
                <Input.TextArea
                  name="additionalInfo"
                  value={user.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleSave}>
                  Зберегти
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Card>
      ),
    },
    {
      key: "2",
      label: "Статистика",
      children: (
        <div className="statistics_content">
          <Typography.Title level={4}> Статистика користувача </Typography.Title>
          <div className="charts">
            <div className="charts_block">
              <CurrentTemperatureCard temperature={36.6} />
              <TemperatureDoughnutChart data={data} />
            </div>
            <div className="charts_block">
              <TemperatureLineChart data={hourlyData} />
              <DailyTemperatureChart data={dailyData} />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="profile-container">
      <Tabs defaultActiveKey="1" centered items={tabItems} />
    </div>
  );
};
