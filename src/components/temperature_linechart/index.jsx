import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './style.css';

// Register the necessary components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const TemperatureLineChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.time),
    datasets: [
      {
        label: 'Температура (°C)',
        data: data.map(entry => entry.temperature),
        fill: false,
        backgroundColor: '#00aaff',
        borderColor: '#00aaff',
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
          text: 'Час',
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
      <h2>Температура по годинах</h2>
      <div className="line-chart-container">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};
