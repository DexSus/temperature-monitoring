import React, { useEffect, useState } from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './style.css';
import { getAndSaveCurrentTemperature } from '../../api/api';

export const DeviceCard = ({ device, updateDevice }) => {
  const [currentTemperature, setCurrentTemperature] = useState(device.bodyTemperature);

  const getCardStyle = () => {
    if (currentTemperature <= 36.89) {
      return { boxShadow: '0 9px 15px rgba(0, 255, 0, 0.5)' };
    } else if (currentTemperature >= 36.9 && currentTemperature <= 36.99) {
      return { boxShadow: '0 9px 15px rgba(0, 255, 0, 0.7)', animation: 'blink 2s infinite' };
    } else if (currentTemperature >= 37 && currentTemperature <= 37.99) {
      return { boxShadow: '0 9px 15px rgba(255, 255, 0, 0.5)' };
    } else if (currentTemperature >= 38 && currentTemperature <= 39) {
      return { boxShadow: '0 9px 15px rgba(255, 0, 0, 0.5)' };
    } else if (currentTemperature > 39) {
      return { boxShadow: '0 9px 15px rgba(255, 0, 0, 0.8)', animation: 'blink 1s infinite' };
    }
  };

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await getAndSaveCurrentTemperature(device);
        if (response.statusCode === 200) {
          setCurrentTemperature(response.data);
          updateDevice(device.deviceId, { bodyTemperature: response.data, isOnline: true });
        } else {
          updateDevice(device.deviceId, { isOnline: false });
        }
      } catch (error) {
        console.error('Failed to fetch temperature:', error);
        updateDevice(device.deviceId, { isOnline: false });
      }
    };

    fetchTemperature();
    const intervalId = setInterval(() => {
      fetchTemperature();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [device, updateDevice]);

  useEffect(() => {
    if (currentTemperature > 39) {
      // const audio = new Audio('/alert-sound.mp3');
      // audio.play();
    }
  }, [currentTemperature]);

  return (
    <Card className="device-card" style={getCardStyle()}>
      <div className="card-content">
        <Avatar icon={<UserOutlined />} />
        <div className="card-info">
          <h3>{device.fullName}</h3>
          <p>Номер датчика: {device.sensorNumber}</p>
          <p>Температура тіла: {currentTemperature}°C</p>
        </div>
        <div className={`status ${device.isOnline ? 'online' : 'offline'}`}>
          {device.isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
    </Card>
  );
};