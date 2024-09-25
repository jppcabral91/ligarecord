import React from 'react';
import './Curiosities.css'; // Import CSS for styling

// Function to calculate payment based on position
const calculatePayment = (rank) => {
  if (rank === 1 || rank === 2) return 0;        // 1st and 2nd don't pay
  if (rank === 3) return 1.5;                    // 3rd pays 1.5€
  if (rank >= 4 && rank <= 8) return 2.5;        // 4th to 8th pay 2.5€
  if (rank === 9) return 4;                      // 9th pays 4€
  return 0;                                      // Fallback case
};

const Curiosities = ({ jornadaData }) => {
  // Initialize counters for first place, last place, and total payments
  const teamStats = {};

  jornadaData.forEach((round) => {
    round.teams.forEach((team) => {
      if (!teamStats[team.equipa]) {
        teamStats[team.equipa] = {
          firstPlaces: 0,
          lastPlaces: 0,
          totalPayments: 0,
        };
      }

      // Count first places
      if (team.roundPosition === 1) {
        teamStats[team.equipa].firstPlaces += 1;
      }

      // Count last places (if they are the last in the round)
      if (team.roundPosition === round.teams.length) {
        teamStats[team.equipa].lastPlaces += 1;
      }

      // Calculate and accumulate payments based on the position
      teamStats[team.equipa].totalPayments += calculatePayment(team.roundPosition);
    });
  });

  // Find the team with the most first places
  const mostFirstPlaces = Object.keys(teamStats).reduce((a, b) =>
    teamStats[a].firstPlaces > teamStats[b].firstPlaces ? a : b
  );

  // Find the team with the most last places
  const mostLastPlaces = Object.keys(teamStats).reduce((a, b) =>
    teamStats[a].lastPlaces > teamStats[b].lastPlaces ? a : b
  );

  // Find the team with the highest total payments
  const mostPayments = Object.keys(teamStats).reduce((a, b) =>
    teamStats[a].totalPayments > teamStats[b].totalPayments ? a : b
  );

  return (
    <div className="curiosities-container">
      <h1>Curiosidades</h1>

      {/* Check if we have valid data */}
      {Object.keys(teamStats).length > 0 ? (
        <>
          <div className="curiosities-item">
            <strong>Equipa com mais primeiros lugares:</strong> {mostFirstPlaces} ({teamStats[mostFirstPlaces].firstPlaces} primeiros lugares)
          </div>
          <div className="curiosities-item">
            <strong>Equipa com mais últimos lugares:</strong> {mostLastPlaces} ({teamStats[mostLastPlaces].lastPlaces} últimos lugares)
          </div>
          <div className="curiosities-item">
            <strong>Equipa com mais pagamentos:</strong> {mostPayments} ({teamStats[mostPayments].totalPayments.toFixed(2)} €)
          </div>
        </>
      ) : (
        <div>Nenhum dado disponível.</div>
      )}
    </div>
  );
};

export default Curiosities;
