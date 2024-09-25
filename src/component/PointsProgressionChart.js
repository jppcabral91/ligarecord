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
  // Get all unique team names
  const teamNames = Array.from(new Set(data.flatMap((round) => round.teams.map((team) => team.equipa))));

  // Custom color array for team lines with distinct colors
  const teamColors = [
    '#FF5733', // Bright Red
    '#33FF57', // Bright Green
    '#33FFF3', // Bright Cyan
    '#FF33A8', // Bright Pink
    '#FFC300', // Bright Yellow
    '#3357FF', // Bright Blue
    '#FF914D', // Orange
    '#B833FF', // Purple
    '#8DFF33', // Lime Green
  ];

  // Collect the points earned in each round for each team
  const roundPoints = teamNames.map((teamName) => {
    return data.map((round) => {
      const team = round.teams.find((team) => team.equipa === teamName);
      return team ? team.pontosRonda : null; // Return the points for the current round
    });
  });

  const chartData = {
    labels: data.map((round) => round.jornada), // Jornada labels
    datasets: teamNames.map((teamName, index) => ({
      label: teamName,
      data: roundPoints[index], // Points for each round (not cumulative)
      fill: false,
      borderColor: teamColors[index], // Assigning consistent colors for each team
      tension: 0.3, // Smooth lines
      pointRadius: 5, // Point size
      pointHoverRadius: 8, // Hover point size
      pointBackgroundColor: teamColors[index],
      pointBorderColor: '#fff', // White border around points
      hoverBackgroundColor: teamColors[index],
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to expand vertically if necessary
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: window.innerWidth < 768 ? 10 : 14, // Smaller font size for legend on mobile
            weight: 'bold',
          },
          // Adjust label padding for better fit on small screens
          padding: window.innerWidth < 768 ? 10 : 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw} pontos na jornada`,
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
          color: '#555',
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Smaller font size for x-axis labels on mobile
          },
          maxRotation: 90, // Rotate labels to fit more text
          minRotation: 45,
          autoSkip: false, // Ensure all labels are shown even on small screens
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#555',
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Smaller font size for y-axis labels on mobile
          },
        },
      },
    },
    layout: {
      padding: {
        right: 10, // Add some padding to the right for better display on mobile
      },
    },
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <h2>Pontos por Ronda</h2>
      <div style={{ height: '400px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PointsProgressionChart;
