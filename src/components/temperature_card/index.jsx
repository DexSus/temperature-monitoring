import React from 'react';
import { Card } from 'antd';
import './style.css';

export const CurrentTemperatureCard = ({ temperature }) => {
  return (
    <Card className="temperature-card">
      <div className="temperature-content">
        <h2>Поточна температура</h2>
        <p className="temperature-value">{temperature}°C</p>
      </div>
    </Card>
  );
};

