import React from 'react';
import './PaymentSummary.css'; // Keep the existing CSS

// Calculate payment based on position
const calculatePayment = (rank) => {
  if (rank === 1 || rank === 2) return 0;        // 1st and 2nd don't pay
  if (rank === 3) return 1.5;                    // 3rd pays 1.5€
  if (rank >= 4 && rank <= 8) return 2.5;        // 4th to 8th pay 2.5€
  if (rank === 9) return 4;                      // 9th pays 4€
  return 0;  // Default case (safe fallback)
};

const PaymentSummary = ({ jornadaData, globalData }) => {
  const totalPayments = {};

  // Iterate through all rounds to calculate the payments
  jornadaData.forEach((round) => {
    round.teams.forEach((team) => {
      if (!totalPayments[team.equipa]) {
        totalPayments[team.equipa] = 0;
      }
      // Add the payment based on their round position using the new logic
      totalPayments[team.equipa] += calculatePayment(team.roundPosition);
    });
  });

  return (
    <div className="payment-summary-container">
      <h1>Resumo de Pagamentos</h1>
      <table className="payment-summary-table">
        <thead>
          <tr>
            <th>Equipa</th>
            <th>Total Pontos</th>
            <th>Total Pago (€)</th>
          </tr>
        </thead>
        <tbody>
          {globalData.map((team, index) => (
            <tr key={index}>
              <td>{team.equipa}</td>
              <td>{team.pontosTotal}</td> {/* Display total points globally */}
              <td>{totalPayments[team.equipa]?.toFixed(2)} €</td> {/* Total payment formatted */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentSummary;
