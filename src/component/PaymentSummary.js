import React from 'react';
import './PaymentSummary.css'; // Import the CSS file for styling

const PaymentSummary = ({ jornadaData }) => {
  // Helper function to accumulate payments
  const calculateTotalPayments = (data) => {
    const totalPayments = {};

    // Iterating over each jornada to accumulate payments
    data.forEach((round) => {
      round.teams.forEach((team) => {
        if (!totalPayments[team.equipa]) {
          totalPayments[team.equipa] = 0;
        }
        totalPayments[team.equipa] += team.paymentDue;
      });
    });

    return totalPayments;
  };

  // Get the total payments
  const totalPayments = calculateTotalPayments(jornadaData);

  // If no data is available, show a message
  if (Object.keys(totalPayments).length === 0) {
    return <p> Algo.</p>;
  }

  return (
    <div className="payment-summary-container">
      <h1>Resumo de Pagamentos</h1>
      <table className="payment-summary-table">
        <thead>
          <tr>
            <th>Equipa</th>
            <th>Total Pago (€)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(totalPayments).map((teamName, index) => (
            <tr key={index}>
              <td>{teamName}</td>
              <td>{totalPayments[teamName].toLocaleString('pt-PT', { minimumFractionDigits: 2 })} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentSummary;
