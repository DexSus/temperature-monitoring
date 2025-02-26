import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';
import './style.css';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register( LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);


export const DailyTemperatureChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Середня температура (°C)',
        data: data.map(entry => entry.averageTemperature),
        fill: false,
        backgroundColor: '#ffaa00',
        borderColor: '#ffaa00',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Дата',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Температура (°C)',
        },
        suggestedMin: -10,
        suggestedMax: 40,
      },
    },
  };

  return (
    <Card className="chart-card">
      <h2>Температура по днях</h2>
      <div className="daily-chart-container">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};

