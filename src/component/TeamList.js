import React from 'react';
import './TeamList.css';

// Updated payment calculation logic
const calculatePayment = (rank) => {
  console.log(rank);
  if (rank === 1 || rank === 2) {
    return 0; // 1st and 2nd don't pay
  }
  if (rank === 3) {
    return 1.5; // 3rd pays 1.5€
  }
  if (rank >= 4 && rank <= 8) {
    return 2.5; // 4th to 8th pay 2.5€
  }
  if (rank === 9) {
    return 4; // 9th pays 4€
  }
  return 0; // Default case (safe fallback)
};

const TeamList = ({ jornadaData, globalData }) => {
  return (
    <div className="teamlist-container">
      <h1>Classificação Global e Jornadas</h1>

      {/* Global Ranking Table */}
      <div className="teamlist-table-container">
        <h2>Classificação Global</h2>
        <table className="teamlist-table">
          <thead>
            <tr>
              <th>Posição</th>
              <th>Treinador</th>
              <th>Nome da Equipa</th>
              <th>Total de Pontos</th>
            </tr>
          </thead>
          <tbody>
            {globalData.map((team, index) => (
              <tr key={index}>
                <td>{team.posicao}</td>
                <td>{team.treinador}</td>
                <td>{team.equipa}</td>
                <td>{team.pontosTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Jornada Tables */}
      {jornadaData.map((round, roundIndex) => (
        <div key={roundIndex} className="teamlist-table-container">
          <h2>{round.jornada}</h2>
          <table className="teamlist-table">
            <thead>
              <tr>
                <th>Posição</th>
                <th>Treinador</th>
                <th>Nome da Equipa</th>
                <th>Pontos na Ronda</th>
                <th>Posição na Ronda</th>
                <th>Pagamento Devido</th>
              </tr>
            </thead>
            <tbody>
              {round.teams.map((team, teamIndex) => (
                <tr key={teamIndex}>
                  <td>{team.roundPosition}</td>
                  <td>{team.treinador}</td>
                  <td>{team.equipa}</td>
                  <td>{team.pontosRonda}</td>
                  <td>{team.roundPosition}</td>
                  <td>{calculatePayment(team.roundPosition).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
