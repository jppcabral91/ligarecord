import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the calculatePayment function
const calculatePayment = (rank) => {
  if (rank === 1 || rank === 2) return 0;        // 1st and 2nd don't pay
  if (rank === 3) return 1.5;                    // 3rd pays 1.5€
  if (rank >= 4 && rank <= 8) return 2.5;        // 4th to 8th pay 2.5€
  if (rank === 9) return 4;                      // 9th pays 4€
  return 0;  // Default case (shouldn't happen, but safe fallback)
};

const PaymentChart = ({ data }) => {
  const teamPayments = data.reduce((acc, round) => {
    round.teams.forEach((team) => {
      if (!acc[team.equipa]) {
        acc[team.equipa] = 0;
      }
      // Calculate the payment due dynamically
      acc[team.equipa] += calculatePayment(team.roundPosition);
    });
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(teamPayments),  // Team names
    datasets: [
      {
        label: 'Total Payments Due (€)',
        data: Object.values(teamPayments),  // Payment amounts
        backgroundColor: Object.keys(teamPayments).map(() => '#36A2EB'),  // Consistent color
        hoverBackgroundColor: Object.keys(teamPayments).map(() => '#007f63'),  // Hover color
        borderRadius: 10,
        barThickness: 30,  // Adjust bar thickness
      },
    ],
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
          label: (tooltipItem) => `${tooltipItem.raw} € paid`,
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
    animation: {
      duration: 1500,
      easing: 'easeInOutQuad',
    },
  };

  return (
    <div>
      <h2>Pagamentos Por Equipa</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PaymentChart;
