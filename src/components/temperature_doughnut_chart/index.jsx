import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "./style.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const TemperatureDoughnutChart = ({ data }) => {
  return (
    <Card className="chart-card">
      <h2>Розподіл температури протягом дня</h2>
      <div className="doughnut-chart-container">
        <Doughnut data={data} />
      </div>
    </Card>
  );
};
