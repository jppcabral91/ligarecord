import React from 'react';
import './Curiosities.css'; // Import CSS for styling

const Curiosities = ({ jornadaData }) => {
  // Initialize counters for first place and last place
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

      // Count last places
      if (team.roundPosition === round.teams.length) {
        teamStats[team.equipa].lastPlaces += 1;
      }

      // Accumulate total payments
      teamStats[team.equipa].totalPayments += team.paymentDue;
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

  return (
    <div className="curiosities-container">
      <h1>Curiosidades</h1>
      <div className="curiosities-item">
        <strong>Equipa com mais primeiros lugares:</strong> {mostFirstPlaces} ({teamStats[mostFirstPlaces].firstPlaces} primeiros lugares)
      </div>
      <div className="curiosities-item">
        <strong>Equipa com mais últimos lugares:</strong> {mostLastPlaces} ({teamStats[mostLastPlaces].lastPlaces} últimos lugares)
      </div>
      <div className="curiosities-item">
        <strong>Equipa com mais pagamentos:</strong> {Object.keys(teamStats).reduce((a, b) =>
          teamStats[a].totalPayments > teamStats[b].totalPayments ? a : b
        )} ({Math.max(...Object.values(teamStats).map((team) => team.totalPayments))} €)
      </div>
    </div>
  );
};

export default Curiosities;
