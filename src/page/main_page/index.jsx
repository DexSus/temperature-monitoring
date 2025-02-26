import React from 'react';
import { DeviceCard } from '../../components/device_card/index';
import './style.css';

const devices = [
    {
      id: 1,
      fullName: 'Іван Петров',
      sensorNumber: 'A123',
      bodyTemperature: 36.5,
      isOnline: true,
    },
    {
      id: 2,
      fullName: 'Марія Сидорова',
      sensorNumber: 'B456',
      bodyTemperature: 36.9,
      isOnline: false,
    },
    {
      id: 3,
      fullName: 'Олександра Гречко',
      sensorNumber: 'C789',
      bodyTemperature: 37.5,
      isOnline: true,
    },
    {
      id: 4,
      fullName: 'Володимир Мельник',
      sensorNumber: 'D012',
      bodyTemperature: 38.5,
      isOnline: true,
    },
    {
      id: 5,
      fullName: 'Анна Ковальчук',
      sensorNumber: 'E345',
      bodyTemperature: 39.5,
      isOnline: false,
    },
    {
      id: 6,
      fullName: 'Дмитро Козак',
      sensorNumber: 'F567',
      bodyTemperature: 37.2,
      isOnline: true,
    },
    {
      id: 7,
      fullName: 'Юлія Шевченко',
      sensorNumber: 'G678',
      bodyTemperature: 38.1,
      isOnline: true,
    },
    {
      id: 8,
      fullName: 'Петро Василенко',
      sensorNumber: 'H789',
      bodyTemperature: 39.0,
      isOnline: false,
    },
    {
      id: 9,
      fullName: 'Наталія Іванова',
      sensorNumber: 'I890',
      bodyTemperature: 37.8,
      isOnline: true,
    },
  ];  
export const MainPage = () => {
  return (
    <div className="main_container">
      {devices.map((device) => (
        <DeviceCard key={device.id} {...device} />
      ))}
    </div>
  );
};
