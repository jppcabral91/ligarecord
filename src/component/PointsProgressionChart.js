import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PointsProgressionChart = ({ data }) => {
  const teamNames = Array.from(new Set(data.flatMap((round) => round.teams.map((team) => team.equipa))));

  // Custom color array for team lines
  const teamColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED', '#B3E5FC', '#B388FF'
  ];

  const chartData = {
    labels: data.map((round) => round.jornada), // Jornada labels
    datasets: teamNames.map((teamName, index) => {
      const teamData = data.map((round) => {
        const team = round.teams.find((team) => team.equipa === teamName);
        return team ? team.pontosRonda : null;
      });

      return {
        label: teamName,
        data: teamData,
        fill: false,
        borderColor: teamColors[index],  // Assigning consistent colors for each team
        tension: 0.3,  // Smooth lines
        pointRadius: 5,  // Larger points for better visibility
        pointHoverRadius: 8,  // Enlarge points on hover
        pointBackgroundColor: teamColors[index],
        pointBorderColor: '#fff',  // White border around points
        hoverBackgroundColor: teamColors[index],
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw} points`,
        },
        backgroundColor: '#333',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#555',  // Customize tick color
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#555',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Progressão De Pontos</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PointsProgressionChart;
