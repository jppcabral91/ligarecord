import React from 'react';
import './TeamList.css'; // Import the updated compact CSS file

const TeamList = ({ jornadaData, globalData }) => {
  return (
    <div className="teamlist-container">
      <h1>Classificação Global e Jornadas</h1>

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
                  <td>{team.paymentDue} €</td>
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
