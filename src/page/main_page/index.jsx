import React from 'react';
import { DeviceCard } from '../../components/device_card/index';
import './style.css';

export const MainPage = ({ devices, updateDevice }) => {
  return (
    <div className="main_container">
      {devices.length !== 0 ? devices.map((device) => (
        <DeviceCard key={device.id} device={device} updateDevice={updateDevice} />
      )) : <p>Немає пристроїв</p>}
    </div>
  );
};
