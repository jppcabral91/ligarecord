import React from 'react';
import './PaymentSummary.css'; // Keep the existing CSS

// Calculate payment based on position
const calculatePayment = (rank) => {
  if (rank === 1 || rank === 2) return 0;        // 1st and 2nd don't pay
  if (rank === 3) return 1.5;                    // 3rd pays 1.5€
  if (rank >= 4 && rank <= 8) return 2.5;        // 4th to 8th pay 2.5€
  if (rank === 9) return 4;                      // 9th pays 4€
  return 0;  // Default case (shouldn't happen, but safe fallback)
};

const PaymentSummary = ({ jornadaData }) => {
  const totalPayments = {};
  const roundPayments = {}; // Store payments per round for each team

  // Iterate through all rounds to calculate the payments
  jornadaData.forEach((round) => {
    round.teams.forEach((team) => {
      if (!totalPayments[team.equipa]) {
        totalPayments[team.equipa] = 0;
        roundPayments[team.equipa] = []; // Initialize array for round payments
      }

      // Add the payment based on their round position using the new logic
      const payment = calculatePayment(team.roundPosition);
      totalPayments[team.equipa] += payment;
      roundPayments[team.equipa].push(payment); // Add payment for each round
    });
  });

  return (
    <div className="payment-summary-container">
      <h1>Resumo de Pagamentos</h1>
      <table className="payment-summary-table">
        <thead>
          <tr>
            <th>Equipa</th>
            {jornadaData.map((round, index) => (
              <th key={index}>Ronda {index + 1} (€)</th> // Dynamic round columns
            ))}
            <th>Total Pago (€)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(totalPayments).map((teamName, index) => (
            <tr key={index}>
              <td>{teamName}</td>
              {roundPayments[teamName].map((payment, idx) => (
                <td key={idx}>{payment.toFixed(2)} €</td>
              ))}
              <td>{totalPayments[teamName].toFixed(2)} €</td> {/* Total payment formatted */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentSummary;
