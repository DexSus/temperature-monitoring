import React, { useEffect } from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './style.css';

export const DeviceCard = ({ fullName, sensorNumber, bodyTemperature, isOnline }) => {
  const getCardStyle = () => {
    if (bodyTemperature <= 36.8) {
      return { boxShadow: '0 9px 15px rgba(0, 255, 0, 0.5)' }; 
    } else if (bodyTemperature === 36.9) {
      return { boxShadow: '0 9px 15px rgba(0, 255, 0, 0.7)', animation: 'blink 2s infinite' }; 
    } else if (bodyTemperature >= 37 && bodyTemperature <= 37.9) {
      return { boxShadow: '0 9px 15px rgba(255, 255, 0, 0.5)' }; 
    } else if (bodyTemperature >= 38 && bodyTemperature <= 39) {
      return { boxShadow: '0 9px 15px rgba(255, 0, 0, 0.5)' }; 
    } else if (bodyTemperature > 39) {
      return { boxShadow: '0 9px 15px rgba(255, 0, 0, 0.8)', animation: 'blink 1s infinite' }; 
    }
  };

  useEffect(() => {
    if (bodyTemperature > 39) {
    //   const audio = new Audio('/alert-sound.mp3');
    //   audio.play();
    }
  }, [bodyTemperature]);

  return (
    <Card className="device-card" style={getCardStyle()}>
      <div className="card-content">
        <Avatar icon={<UserOutlined />} />
        <div className="card-info">
          <h3>{fullName}</h3>
          <p>Номер датчика: {sensorNumber}</p>
          <p>Температура тіла: {bodyTemperature}°C</p>
        </div>
        <div className={`status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
    </Card>
  );
};
