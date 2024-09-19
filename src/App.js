import React, { useState } from 'react';
import './App.css';
import PointsProgressionChart from './component/PointsProgressionChart';
import PaymentChart from './component/PaymentChart';
import TeamList from './component/TeamList';
import PaymentSummary from './component/PaymentSummary';
import Curiosities from './component/Curiosities';
import jornadaData from './data/jornadaRanking.json';
import globalData from './data/globalRanking.json';

function App() {
  // State to manage which chart is displayed (points progression or team payments)
  const [showPointsProgression, setShowPointsProgression] = useState(true);

  // State to manage which view is displayed (payment summary or curiosities)
  const [showPaymentSummary, setShowPaymentSummary] = useState(true);

  // Toggle between Points Progression and Team Payments charts
  const toggleChartView = () => {
    setShowPointsProgression(!showPointsProgression);
  };

  // Toggle between Payment Summary and Curiosities views
  const togglePaymentCuriosityView = () => {
    setShowPaymentSummary(!showPaymentSummary);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Papolas Saltitantes V3.0</h2>
  {/* Toggle Button to switch between Payment Summary and Curiosities */}
  <button onClick={togglePaymentCuriosityView}>
          {showPaymentSummary ? 'Mostrar Curiosidades' : 'Mostrar Resumo de Pagamentos'}
        </button>

        {/* Conditionally render the Payment Summary or Curiosities based on the toggle */}
        {showPaymentSummary ? (
          <PaymentSummary jornadaData={jornadaData} />
        ) : (
          <Curiosities jornadaData={jornadaData} />
        )}

        {/* Toggle Button to switch between charts */}
        <button onClick={toggleChartView}>
          {showPointsProgression ? 'Mostrar Pagamentos Por Equipa' : 'Mostrar Progressão De Pontos'}
        </button>

        {/* Conditionally render the chart based on the toggle */}
        {showPointsProgression ? (
          <PointsProgressionChart data={jornadaData} />
        ) : (
          <PaymentChart data={jornadaData} />
        )}
        {/* Team List is always visible */}
        <TeamList jornadaData={jornadaData} globalData={globalData} />
      </header>
    </div>
  );
}

export default App;
